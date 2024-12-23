import './commands'

// Prevent TypeScript from reporting an error when we use cy.mount in component tests
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
