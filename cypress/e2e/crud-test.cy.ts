
describe('CRUD Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000').wait(1000);
  });

  it('should disable button when name is not entered', () => {
    cy.get('button[type="button"]').should('be.disabled');
  });

  it('should enable button when name is entered and clicked', () => {
    cy.get('#name').type('User Test');
    cy.get('button[type="button"]').should('be.enabled').click();
    cy.url().should('include', '/feed');
    cy.contains('Welcome back, User Test :)');
  });

  it('should create a post', () => {
    cy.get('#name').type('User Test');
    cy.get('button[type="button"]').should('be.enabled').click();
    cy.url().should('include', '/feed');
    cy.contains('Welcome back, User Test :)');
    cy.get('#title').type('Post Test');
    cy.get('#content').type('Content Test');
    cy.contains('create').click().wait(2000);
    cy.contains('Post Test');
    cy.contains('Content Test');
  });

  it('should edit a post and cancel the edition', () => {
    cy.get('#name').type('User Test');
    cy.get('button[type="button"]').should('be.enabled').click();
    cy.url().should('include', '/feed');
    cy.contains('Welcome back, User Test :)');
    cy.contains('Post Test');
    cy.contains('Content Test');
    cy.get('#edit').click().wait(1000);
    cy.get('.modal-body  #title').clear().type('Editing Title Test');
    cy.get('.modal-body  #cancel').click().wait(1000);
    cy.contains('Post Test');
    cy.contains('Content Test');
  });

  it('should edit a post and save the edition', () => {
    cy.get('#name').type('User Test');
    cy.get('button[type="button"]').should('be.enabled').click();
    cy.url().should('include', '/feed');
    cy.contains('Welcome back, User Test :)');
    cy.contains('Post Test');
    cy.contains('Content Test');
    cy.get('#edit').click().wait(1000);
    cy.get('.modal-body  #title').clear().type('Editing Title Test');
    cy.get('.modal-body  #content').clear().type('Editing Content Test');
    cy.get('.modal-body  #save').click().wait(1000);
    cy.contains('Editing Title Test');
    cy.contains('Editing Content Test');
  });
});