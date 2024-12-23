/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'

// Add custom commands here
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('[data-testid="email-input"]').type(email)
  cy.get('[data-testid="password-input"]').type(password)
  cy.get('[data-testid="login-button"]').click()
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}
