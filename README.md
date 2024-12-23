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
