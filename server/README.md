# MyChessStudy Server

Backend server for MyChessStudy application, built with Express, TypeScript, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update the environment variables in `.env` with your configuration.

## Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Testing

The project includes both unit tests and integration tests. Here's how to run them:

### Unit Tests

Unit tests use MongoDB Memory Server and don't require a real MongoDB instance. They're fast and isolated.

```bash
# Run unit tests only
npm run test:unit

# Run unit tests in watch mode
npm run test:watch
```

### Integration Tests

Integration tests require a running MongoDB instance. They test real database operations and system integration.

```bash
# Run integration tests only
npm run test:integration
```

Note: Integration tests will automatically skip if MongoDB is not available.

### All Tests

To run both unit and integration tests:
```bash
npm test
```

### Test Files Structure

- Unit tests are located in `src/tests/` with `.test.ts` suffix
- Integration tests are in `src/tests/integration/` with `.integration.test.ts` suffix

### Test Types

1. **Unit Tests**:
   - Located in `src/tests/`
   - Use MongoDB Memory Server
   - Run in isolation
   - Don't require external services
   - Fast execution
   - Naming pattern: `*.test.ts`

2. **Integration Tests**:
   - Located in `src/tests/integration/`
   - Require running MongoDB instance
   - Test real database operations
   - Test system integration
   - Slower execution
   - Naming pattern: `*.integration.test.ts`

## Code Style

Format code:
```bash
npm run format
```

Lint code:
```bash
npm run lint
```

## Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic
├── tests/          # Test files
│   └── integration/ # Integration tests
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```
