describe('template spec', () => {
  // Add global exception handler
  Cypress.on('uncaught:exception', (err, runnable) => {
    console.log('Caught an exception:', err.message)
    return false
  })

  //Before each test
  beforeEach ('Visit homepage',() => {
    cy.visit('https://msq.market/')

    // Ensure the navbar is present and visible
    cy.get('#navbarSupportedContent', { timeout: 10000 }).should('be.visible')
    
    // Ensure 'Contact Us' link is present and click it
    cy.get('#navbarSupportedContent').contains('Contact Us', { timeout: 10000 }).should('be.visible').click()
  })

  it('Send a message using correct data format', () => {
        cy.get('.fs-contact').contains('Contact Us')
        cy.get('#name').type('Gabriel')
        cy.get('#name').should('have.value', 'Gabriel')

        cy.get('#email').type('chege@gmail.com')
        cy.get('#email').should('have.value', 'chege@gmail.com')

        cy.get('#subject').type('Test email')
        cy.get('#subject').should('have.value', 'Test email')

        cy.get('#message').type('This is a test message')
        cy.get('#message').should('have.value', 'This is a test message')
        cy.get('.btn').click()
  })

   //Send a message with incorrect name format
   it('Fail to send a message with incorrect name format', ()=>{
        cy.get('.fs-contact').contains('Contact Us')
        cy.get('#name').type('#znn!12')
        cy.get('#name').should('have.value', '#znn!12')

        cy.get('#email').type('chege@gmail.com')
        cy.get('#email').should('have.value', 'chege@gmail.com')

        cy.get('#subject').type('Test email')
        cy.get('#subject').should('have.value', 'Test email')

        cy.get('#message').type('This is a test message')
        cy.get('#message').should('have.value', 'This is a test message')
        cy.get('.btn').click()
        // Wait for the form submission request to complete and check its response
        cy.wait().its('response.statusCode').should('eq', 400)
  })


    //Send a message with incorrect email format
    it('Fail to send a message with incorrect email format', ()=>{
      cy.get('.fs-contact').contains('Contact Us')
      cy.get('#name').type('#znn!12')
      cy.get('#name').should('have.value', '#znn!12')

      cy.get('#email').type('chegegmail.com')
      cy.get('#email').should('have.value', 'chegegmail.com')

      cy.get('#subject').type('Test email')
      cy.get('#subject').should('have.value', 'Test email')

      cy.get('#message').type('This is a test message')
      cy.get('#message').should('have.value', 'This is a test message')
      cy.get('.btn').click()
      // Wait for the form submission request to complete and check its response
      cy.wait('@formSubmit').its('response.statusCode').should('eq', 400)
  })

  //Send a message with incorrect Subject format
  it('Fail to send a message with incorrect Subject format', ()=>{
      cy.get('.fs-contact').contains('Contact Us')
      cy.get('#name').type('Gabriel')
      cy.get('#name').should('have.value', 'Gabriel')

      cy.get('#email').type('chege@gmail.com')
      cy.get('#email').should('have.value', 'chege@gmail.com')

      cy.get('#subject').type('123###!')
      cy.get('#subject').should('have.value', '123###!')

      cy.get('#message').type('This is a test message')
      cy.get('#message').should('have.value', 'This is a test message')
      cy.get('.btn').click()
      // Wait for the form submission request to complete and check its response
      cy.wait('@formSubmit').its('response.statusCode').should('eq', 400)
  })

  //Send a message with incorrect Message format
  it('Fail to send a message with incorrect Message format', ()=>{
      cy.get('.fs-contact').contains('Contact Us')
      cy.get('#name').type('Gabriel')
      cy.get('#name').should('have.value', 'Gabriel')

      cy.get('#email').type('chege@gmail.com')
      cy.get('#email').should('have.value', 'chege@gmail.com')

      cy.get('#subject').type('Test email')
      cy.get('#subject').should('have.value', 'Test email')

      cy.get('#message').type('#####@@@@@')
      cy.get('#message').should('have.value', '#####@@@@@')
      cy.get('.btn').click()
      // Wait for the form submission request to complete and check its response
      cy.wait('@formSubmit').its('response.statusCode').should('eq', 400)
  })

  //Send a message with incorrect Message format
  it('Fail to send a message without any data', ()=>{
      cy.get('.fs-contact').contains('Contact Us')
      cy.get('#name').type(' ')
      cy.get('#name').should('have.value', ' ')

      cy.get('#email').type(' ')
      cy.get('#email').should('have.value', '  ')

      cy.get('#subject').type(' ')
      cy.get('#subject').should('have.value', ' ')

      cy.get('#message').type(' ')
      cy.get('#message').should('have.value', ' ')
      cy.get('.btn').click()
      // Wait for the form submission request to complete and check its response
      cy.wait('#contactForm').its('response.statusCode').should('eq', 400)
  })

  
})
