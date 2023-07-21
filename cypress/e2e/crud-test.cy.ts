
describe('CRUD Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000').wait(1000);
  });

  it('should disable button when name is not entered', () => {
    cy.get('button[type="button"]').should('be.disabled');
  });
});