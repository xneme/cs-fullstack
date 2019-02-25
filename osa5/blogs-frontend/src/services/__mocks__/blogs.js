const blogs = [
  {
    title: 'From 1,000,000 to Graham\'s Number',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2014/11/1000000-grahams-number.html',
    likes: 8,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5c69e550d1ee0854f4bde6a4'
    },
    id: '5c6aac404f0fd17d15ccdf49'
  },
  {
    title: 'Neuralink and the Brain’s Magical Future',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2017/04/neuralink.html',
    likes: 16,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5c69e550d1ee0854f4bde6a4'
    },
    id: '5c6aac7e4f0fd17d15ccdf4a'
  },
  {
    title: 'How to Pick a Career (That Actually Fits You)',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2018/04/picking-career.html',
    likes: 10,
    user: {
      username: 'testaaja',
      name: 'Testikäyttäjä',
      id: '5c6aa66270e9397a38cdcc8f'
    },
    id: '5c6ae427cbb530343c6faef1'
  },
  {
    title: 'Things I Don’t Know as of 2018',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
    likes: 17,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5c69e550d1ee0854f4bde6a4'
    },
    id: '5c706b5908cdfe3f9f02359a'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

export default { getAll, setToken }
