# Globetrotter

Globetrotter is a full-stack web application where users receive cryptic clues about famous places worldwide and must guess the destination. Upon guessing correctly, they unlock fun facts, trivia, and engaging surprises about the destination.

## Features
- 🔍 Clue-based destination guessing.
- 🌎 Fun facts and trivia unlocked upon correct guesses.
- 🔐 Secure authentication using JWT.
- 📊 Data management via MongoDB.
- 🚀 Scalable backend using Node.js and Express.

## Technologies Used
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Frontend:** To be integrated (Use the `FRONTEND_URL` environment variable)

## Installation
### Backend Setup
1. Clone the repository:
```bash
  git clone <repository-url>
```
2. Navigate to the backend directory:
```bash
  cd backend
```
3. Install dependencies:
```bash
  npm install
```
4. Run the development server:
```bash
  npm run dev
```

## Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=YOUR_PORT
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
FRONTEND_URL=YOUR_FRONTEND_URL
```

## Usage
After setting up the backend server, you can test the API using tools like Postman or integrate it with your frontend application.

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any improvements or feature additions.


