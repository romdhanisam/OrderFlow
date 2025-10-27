describe('Tests', () => {

  it('Visits the initial page: ok', () => {
    cy.visit('/');
    cy.contains('Order Flow');
    cy.screenshot('1_home_page');
  });

  it('Visits order page: ok', () => {
    cy.visit('/');
    cy.get('button#nav-button').click();
    cy.wait(1000);
    cy.get('a#order').click();
    cy.wait(500);
    cy.contains('Order Flow');
    cy.screenshot('1_1_order_page');
  });

  it("Open Nav", () => {
    cy.visit('/');
    cy.get('button#nav-button').click();
    cy.wait(1000);
    cy.screenshot('2_nav');
  });

  it("Open About", () => {
    cy.visit('/');
    cy.get('button#nav-button').click();
    cy.wait(1000);
    cy.get('a#about').click();
    cy.wait(500);
    cy.screenshot('3_about');
  });

  it("Open Settings", () => {
    cy.visit('/');
    cy.get('button#nav-button').click();
    cy.wait(1000);
    cy.get('a#settings').click();
    cy.wait(500);
    cy.screenshot('4_settings');
  });

})
