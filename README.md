# MyChessStudy

A modern chess game analysis and study platform that brings all your chess games from various sources into one place. Analyze, review, and improve your chess game with advanced analysis tools and unlimited storage.

## Features

- 🔐 **Secure Authentication**: Login and user authentication system to keep your games private
- 📥 **Game Import**: Upload and manage PGN files from chess.com, lichess.org, and over-the-board games
- 🔍 **Advanced Analysis**: Analyze your games with Stockfish engine integration
- 🎯 **Smart Search**: Search and filter games by tags, moves, positions, and more
- ♟️ **Interactive Board**: Review games with a powerful interactive chessboard
- 📝 **Game Database**: Add tags, notes, and annotations to your games
- 📱 **Responsive Design**: Modern, minimalistic UI that works on all devices
- 📚 **Opening Repertoire**: Compare your games against your prepared opening lines

## Tech Stack

### Frontend
- React - A JavaScript library for building user interfaces
- [Chessground](https://github.com/lichess-org/chessground) - Chess board UI
- [Chess.js](https://github.com/jhlywa/chess.js) - Chess logic and move validation
- TailwindCSS - Utility-first CSS framework

### Backend
- Node.js - JavaScript runtime
- Express - Web application framework
- Stockfish - Chess engine for analysis
- MongoDB - Database for game storage

### Testing & Quality
- Jest - Unit testing framework
- Cypress - End-to-end testing framework
- JWT - Authentication system

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ChessBoard/
│   │   │   └── ChessBoard.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── common/
│   │   │   ├── FormInput.tsx
│   │   │   └── Button.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── NavbarUI.tsx
│   │   └── profile/
│   │       ├── EditProfile.tsx
│   │       └── EditProfileUI.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useChessGame.ts
│   ├── utils/
│   │   └── chess.ts
│   ├── types/
│   │   └── chess.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── chessService.ts
│   ├── tests/
│   │   ├── mocks/
│   │   │   ├── handlers.ts
│   │   │   └── server.ts
│   │   ├── unit/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   ├── AuthContext.test.tsx
│   │   │   │   └── ProtectedRoute.test.tsx
│   │   │   └── components/
│   │   ├── integration/
│   │   │   └── auth/
│   │   ├── e2e/
│   │   │   └── auth.spec.ts
│   │   └── test-utils.tsx
│   └── assets/
│       └── styles/
│           └── template.css
server/
├── src/
│   ├── config/
│   │   ├── db.ts
│   │   └── logger.ts
│   ├── controllers/
│   │   └── auth.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   └── User.ts
│   ├── routes/
│   │   └── auth.ts
│   └── utils/
│       └── validation.ts
├── tests/
│   ├── unit/
│   │   └── auth.test.ts
│   └── integration/
│       └── auth.test.ts
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mychessstudy.git
cd mychessstudy
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables
```bash
# Create .env file in server directory
cp .env.example .env
```

4. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server in a new terminal
cd client
npm start
```

## Development Guidelines

- Follow consistent naming conventions and indentation
- Write unit tests for new functions
- Use environment variables for configuration
- Document code with clear docstrings
- Maintain compatibility with existing tests
- Follow the lichess.org theme and style guidelines

## Running Tests

### Terminal Commands

```bash
# Run all tests
cd client
npm test

# Run tests in watch mode (recommended during development)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- ChessBoard.test.tsx

# Run tests matching specific pattern
npm test -- -t "ChessBoard"

# Run tests in specific directory
npm test -- tests/components
```

### IDE Integration

#### VS Code
1. Install the "Jest Runner" extension
2. Click the "Run Test" or "Debug Test" CodeLens above each test
3. Use Command Palette (Cmd + Shift + P):
   - "Jest: Start Runner" - Start Jest in watch mode
   - "Jest: Run All Tests" - Run all tests once
   - "Jest: Toggle Coverage" - Toggle coverage overlay

#### WebStorm/IntelliJ IDEA
1. Right-click on the `tests` folder
2. Select "Run 'tests'" or "Debug 'tests'"
3. Use keyboard shortcuts:
   - Ctrl + Shift + R (⌃⇧R) - Run tests
   - Ctrl + Shift + D (⌃⇧D) - Debug tests

### Test Scripts

The following npm scripts are available:

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run all tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

Add these scripts to your package.json:

```json
{
  "scripts": {
    "test:unit": "react-scripts test --testPathPattern=src/tests/(?!integration)",
    "test:integration": "react-scripts test --testPathPattern=src/tests/integration",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "test:watch": "react-scripts test --watch"
  }
}
```

### Coverage Reports

Coverage reports are generated in the `coverage` directory. Open `coverage/lcov-report/index.html` in your browser to view the detailed report.

### Debugging Tests

1. Add `debugger;` statement in your test or source code
2. Run tests in debug mode:
   ```bash
   npm run test:debug
   ```
3. Open Chrome DevTools at chrome://inspect
4. Click on the Node.js process to start debugging

## End-to-End Testing with Cypress

### Running Cypress Tests

```bash
# Open Cypress Test Runner (interactive mode)
npm run cypress:open

# Run Cypress tests in headless mode
npm run cypress:run

# Run Cypress tests in Chrome
npm run cypress:run:chrome

# Run Cypress component tests
npm run cypress:run:component

# Run E2E tests with app server
npm run test:e2e
```

### Writing Cypress Tests

Tests are located in `client/cypress/e2e/` directory. Example test structure:

```typescript
describe('Feature', () => {
  beforeEach(() => {
    cy.visit('/')  // Visit the page before each test
  })

  it('should do something', () => {
    cy.get('[data-testid="element"]').should('exist')
    cy.contains('Expected Text').click()
    cy.url().should('include', '/expected-path')
  })
})
```

### Custom Commands

Custom Cypress commands are available in `cypress/support/commands.ts`:

```typescript
// Example usage of custom command
cy.login('user@example.com', 'password')
```

### Visual Testing

Cypress automatically captures screenshots and videos of test runs in:
- `cypress/screenshots/` - For test failure screenshots
- `cypress/videos/` - For test run recordings

### IDE Integration

#### VS Code
1. Install "Cypress Snippets" extension
2. Use command palette to run tests:
   - "Cypress: Open"
   - "Cypress: Run All Tests"

#### WebStorm/IntelliJ IDEA
1. Right-click on cypress/e2e folder
2. Select "Run 'cypress/e2e'"
3. Use the Cypress tool window to manage tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [lichess.org](https://lichess.org) for inspiration and open-source components
- [Chessground](https://github.com/lichess-org/chessground) for the chess board UI
- [Chess.js](https://github.com/jhlywa/chess.js) for chess logic
