
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
});