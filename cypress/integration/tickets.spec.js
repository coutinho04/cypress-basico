describe("Tickets", () => {
  beforeEach(() =>
    cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html")
  );

  it("should fills all the text input fields", () => {
    cy.get("#first-name").type("John");
    cy.get("#last-name").type("Otto");
    cy.get("#email").type("john.otto@email.com");
    cy.get("#requests").type("Requests description");
    cy.get("#signature").type("John Otto");
  });

  it("should select 2 tickets", () => {
    cy.get("#ticket-quantity").select("2");
  });

  it("should select VIP ticket", () => {
    cy.get("#vip").check();
  });

  it("should select social media checkbox", () => {
    cy.get("#social-media").check();
  });

  it("should select friend and publication, then unselect friend", () => {
    cy.get("#friend").check();
    cy.get("#publication").check();
    cy.get("#friend").uncheck();
  });

  it("should have TICKETBOX title", () => {
    cy.get("header h1").should("contain", "TICKETBOX");
  });

  it("should show error on invalid email", () => {
    cy.get("#email").type("john.otto-email.com");

    cy.get("#email.invalid").should("exist");

    cy.get("#email").clear().type("john.otto@email.com");

    cy.get("#email.invalid").should("not.exist");
  });

  it("should fills all fields then reset the form", () => {
    const firstName = "John";
    const lastName = "Otto";
    const fullName = `${firstName} ${lastName}`;

    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("john.otto@email.com");
    cy.get("#ticket-quantity").select("2");
    cy.get("#vip").check();
    cy.get("#social-media").check();
    cy.get("#requests").type("Requests description");
    cy.get(".agreement p").should(
      "contain",
      `I, ${fullName}, wish to buy 2 VIP tickets. I understand that all ticket sales are final.`
    );
    cy.get("#agree").check();
    cy.get("#signature").type(fullName);

    cy.get('[type="submit"]').should("not.be.disabled");
    cy.get(".reset").click();
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("should fills all mandatory fields then reset the form", () => {
    const user = {
      firstName: "John",
      lastName: "Otto",
      email: "john.otto@email.com",
    };

    cy.fillMandatoryFields(user);

    cy.get('[type="submit"]').should("not.be.disabled");
    cy.get("#agree").uncheck();
    cy.get('[type="submit"]').should("be.disabled");
  });
});
