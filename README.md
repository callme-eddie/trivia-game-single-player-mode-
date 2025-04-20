# Single‑Player Trivia Game

A lightweight, browser‑based trivia quiz built with Node.js, Express, and Socket.io.  
Designed as the first step toward a full Jackbox‑style multiplayer experience, this project demonstrates:

- Real‑time question delivery via WebSockets
- Clean, responsive UI with HTML/CSS grid layout
- Dynamic score tracking and end‑of‑quiz flow
- Fetching live questions from the Open Trivia DB API
- Proper handling of HTML entities for question text

---

## 📋 Table of Contents

1. [Demo](#-demo)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Getting Started](#-getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running the App](#running-the-app)  
5. [Project Structure](#-project-structure)  
6. [Roadmap](#-roadmap)  
7. [License & Contact](#-license--contact)  

---

## 🖥️ Demo

![Screenshot of question slide and answer slide](./assets/screenshot.png)

Live on your local machine:

```bash
git clone https://github.com/callme-eddie/trivia-game-single-player-mode-.git
cd single-trivia
npm install
node server.js


Then point your browser at http://localhost:3000.




✨ Features
Real‑Time Quiz Flow
Questions are pushed from the server to the client over Socket.io.

Dynamic UI Slides
Toggle between question and “Correct Answer” slides with smooth transitions.

Score Tracking
Increment your score for each correct answer; view total in the header.

API‑Backed Questions
Live fetch from Open Trivia DB for endless, randomized quizzes.

HTML Entity Decoding
Ensures special characters render correctly (e.g. apostrophes, accented letters).

🚀 Tech Stack
Node.js & Express for the HTTP & WebSocket server

Socket.io for bi‑directional, real‑time communication

Axios to fetch and normalize trivia from an external API

Vanilla HTML/CSS/JS for a fast, framework‑free front end

🛠️ Getting Started
Prerequisites
Node.js ≥ 14.x

npm (bundled with Node)

Installation
bash
Copy
Edit
# Clone the repo
git clone https://github.com/callme-eddie/trivia-game-single-player-mode-.git

# Move into the project folder
cd single-trivia

# Install dependencies
npm install
Running the App
bash
Copy
Edit
# Starts Express + Socket.io server on port 3000
node server.js
Open your browser to http://localhost:3000 to begin playing.

📁 Project Structure
plaintext
Copy
Edit
single-trivia/
├── server.js                 # Express & Socket.io entry point
├── services/
│   └── questionService.js    # Fetches & normalizes API questions
├── public/                   # Static assets served to browser
│   ├── index.html            # Two‑slide UI (question/answer)
│   └── app.js                # Client‑side Socket.io logic
├── .gitignore                # Ignores node_modules, logs, env files
├── package.json              # Project metadata & npm scripts
└── package-lock.json         
🛣️ Roadmap
Multiplayer Rooms & Teams

Room Codes & QR‑Code Join Flow

Buzz‑In & Wager Rounds

Image‑Guess & Word‑Puzzle Rounds

Deployment to Heroku / Vercel

Contributions and ideas are welcome! Feel free to open an issue or pull request.

📄 License & Contact
This project is released under the MIT License.
Created by Eduardo (“callme‑eddie”).
⁠Have questions or feedback? Reach me at oros.custom@gmail.com.

