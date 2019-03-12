require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  PubSub
} = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const DataLoader = require('dataloader')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to ', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filters = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filters = { ...filters, author: author._id }
      }
      if (args.genre) {
        filters = { ...filters, genres: args.genre }
      }
      return Book.find(filters).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: ({ id }, args, { countLoader }) => countLoader.load(id)
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = await newAuthor.save()
      }
      const newBook = new Book({ ...args, author: author._id })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      const populatedBook = Book.findById(newBook._id).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
      return populatedBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salakala') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const currentUserExtractor = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring('bearer '.length),
      JWT_SECRET
    )
    const currentUser = await User.findById(decodedToken.id)
    return currentUser
  }
}

const countLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({})
  return authorIds.map(
    (id) => books.filter((book) => book.author.toString() === id).length
  )
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    currentUserExtractor,
    countLoader
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
