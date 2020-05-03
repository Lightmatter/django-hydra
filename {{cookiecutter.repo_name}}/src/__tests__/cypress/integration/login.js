describe('Login page', () => {
  it('a user can get to the login page from the home page', () => {
    cy.visit('');
    cy.get('[data-cy=auth-menu-button]')
      .click()
      .get('[data-cy=login]')
      .click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/login');
    });
  });
  it('a user can login with the form', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-email]')
      .click()
      .type('ben@lightmatter.com')
      .get('[data-cy=login-password]')
      .click()
      .type('asdfasdf')
      .get('[data-cy=submit-login]')
      .click();

    cy.get('[data-cy=logged-in-name]').should('contain', 'Hey');
    cy.get('#client-snackbar').should('contain', 'Successfully logged in');
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
  it('a user follows next login with the form', () => {
    cy.visit('/login?next=/account');
    cy.get('[data-cy=login-email]')
      .click()
      .type('ben@lightmatter.com')
      .get('[data-cy=login-password]')
      .click()
      .type('asdfasdf')
      .get('[data-cy=submit-login]')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/account');
    });

    cy.get('#client-snackbar').should('contain', 'Successfully logged in');
  });
  it('a user gets a mesasge when another tab logs in', () => {});
  //   cy.visit('/login?next=/account').then(() => {
  //     window.dispatchEvent(
  //       new StorageEvent('storage', {
  //         key: 'login',
  //         newValue: 'foo',
  //       })
  //     );
  //   });
  //   cy.window().then(win => {
  //     // listen for events bubbling up to the window
  //     win.addEventListener('storage', () => {
  //       cy.get('#client-snackbar').should('contain', 'Successfully logged in');
  //     });
  //   });
  // });
  it('a user follows next when another tab logs in', () => {});
});
