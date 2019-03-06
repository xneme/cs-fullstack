const addBlog = function() {
  cy.contains('new blog').click()
  cy.get('#titleInput').type('A blog about testing')
  cy.get('#authorInput').type('Someone Famous')
  cy.get('#urlInput').type('http://google.com')
  cy.get('#blogSubmitButton').click()
}

describe('Blogs app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teppo Testihenkilö',
      username: 'ttesti',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#usernameInput').type('ttesti')
      cy.get('#passwordInput').type('salasana')
      cy.get('#loginButton').click()
    })

    it('name of the user is shown', function() {
      cy.contains('Teppo Testihenkilö logged in')
    })

    it('user stays logged in after page reload', function() {
      cy.contains('Teppo Testihenkilö logged in')
      cy.visit('http://localhost:3000')
      cy.contains('Teppo Testihenkilö logged in')
    })

    it('a new blog can be added', function() {
      addBlog()
      cy.contains('A blog about testing')
      cy.contains('Someone Famous')
    })

    it('added blog can be liked', function() {
      addBlog()
      cy.contains('A blog about testing Someone Famous').click()
      cy.get('#likeButton').contains('0')
      cy.get('#likeButton').click()
      cy.get('#likeButton').contains('1')
    })

    it('added blog can be commented', function() {
      addBlog()
      cy.contains('A blog about testing Someone Famous').click()
      cy.get('#commentInput').type('Rant about testing')
      cy.get('#commentSubmitButton').click()
      cy.contains('Rant about testing')
    })

    it('added blog can be deleted', function() {
      addBlog()
      cy.contains('A blog about testing Someone Famous').click()
      cy.get('#deleteButton').click()
      cy.get('#blogList')
        .contains('A blog about testing Someone Famous')
        .should('not.exist')
    })

    it('user can log out to front page', function() {
      cy.get('#logoutButton').click()
      cy.contains('Log in to application')
    })

    it('logged out user stays logged out after page reload', function() {
      cy.get('#logoutButton').click()
      cy.contains('Log in to application')
      cy.visit('http://localhost:3000')
      cy.contains('Log in to application')
    })
  })
})
