describe('Singup page', () => {
  it('a user can get to the signup page from the home page', () => {
    cy.visit('');
    cy.get('[data-cy=auth-menu-button]')
      .click()
      .get('[data-cy=signup]')
      .click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/signup');
    });
  });
  it('a user can signup with the form', () => {
    cy.visit('/signup');
    cy.get('[data-cy=first-name]')
      .click()
      .type('Johnny');
    cy.get('[data-cy=last-name]')
      .click()
      .type('Rico');

    cy.get('[data-cy=email]')
      .click()
      .type('Johnny@fed.net');

    cy.get('[data-cy=password]')
      .click()
      .type('asdfasdf');
    cy.get('[data-cy=re-password]')
      .click()
      .type('asdfasdf');
    cy.get('[data-cy=tos]').click();
    cy.get('[data-cy=submit-signup]').click();

    cy.get('[data-cy=logged-in-name]').should('contain', 'Hey');
    cy.get('#client-snackbar').should('contain', 'Successfully logged in');
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
  it('a user gets a real error message when using a duplicate email', () => {
    cy.visit('/signup');
    cy.get('[data-cy=first-name]')
      .click()
      .type('Johnny');
    cy.get('[data-cy=last-name]')
      .click()
      .type('Rico');

    cy.get('[data-cy=email]')
      .click()
      .type('Johnny@fed.net');

    cy.get('[data-cy=password]')
      .click()
      .type('a bad password');
    cy.get('[data-cy=re-password]')
      .click()
      .type('a bad password');
    cy.get('[data-cy=tos]').click();
    cy.get('[data-cy=submit-signup]').click();

    cy.get('.Mui-error').should('contain', 'A user is already registered with that email');
  });

  it("a user can't signup without the tos checked", () => {});
  it('a user can signup with the form and follow the next link tab', () => {});
  it('a user follows next when another tab logs in', () => {});
});
