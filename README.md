# Crypto Portfolio Tracker

A full-stack web application that allows cryptocurrency investors to track their holdings in one place. Users can create an account, add their cryptocurrencies, and view real-time portfolio value, asset allocation, and profit/loss — all powered by live market data from the CoinGecko API.

## Live Demo

- **Frontend:** https://crypto-portfolio-tracker-beige.vercel.app
- **Backend:** https://crypto-portfolio-tracker-ivh7.onrender.com

## Technologies Used

**Frontend:**

- React (Vite)
- React Router
- CSS (custom dark theme)
- Vitest + React Testing Library

**Backend:**

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JSON Web Tokens (JWT)
- bcrypt
- Jest + Supertest

**External API:**

- CoinGecko API (live cryptocurrency prices)

## Features

- User registration and login with secure JWT authentication
- Add, update, and delete cryptocurrency holdings
- Real-time portfolio value calculated from live CoinGecko prices
- Profit/loss calculation per holding
- Protected routes — dashboard and holdings require authentication
- Dark theme UI inspired by Robinhood and Coinbase

## Local Development Setup

### Prerequisites

- Node.js installed
- Git

### Clone the repository

```bash
git clone https://github.com/jessek26/crypto-portfolio-tracker.git
cd crypto-portfolio-tracker
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```
JWT_SECRET=your_secret_key_here
COINGECKO_API_KEY=your_coingecko_api_key
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## API Endpoints

### Authentication

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/auth/register` | Register a new user           |
| POST   | `/api/auth/login`    | Login and receive a JWT token |

### Holdings

All holdings endpoints require an `Authorization: Bearer <token>` header.

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/api/holdings`     | Get all holdings for logged in user |
| POST   | `/api/holdings`     | Add a new holding                   |
| PUT    | `/api/holdings/:id` | Update a holding                    |
| DELETE | `/api/holdings/:id` | Delete a holding                    |

### Prices

| Method | Endpoint      | Description                         |
| ------ | ------------- | ----------------------------------- |
| GET    | `/api/prices` | Get live prices for user's holdings |

## Running Tests

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

## Project Structure

```
crypto-portfolio-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── tests/          # Frontend tests
└── server/                 # Node.js backend
    ├── middleware/          # Auth middleware
    ├── models/              # Sequelize models
    ├── routes/              # Express routes
    └── tests/              # Backend tests
```
