// server.js
const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const { loadQuestions } = require('./services/questionService');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

app.use(express.static('public'));

let questions = [];
let idx       = 0;

// Initial fetch from the API
loadQuestions().then(qs => questions = qs);

io.on('connection', socket => {
  // If questions aren’t loaded yet, show a loading message
  if (!questions.length) {
    socket.emit('question', { text: 'Loading…', options: [] });
    const waiter = setInterval(() => {
      if (questions.length) {
        clearInterval(waiter);
        socket.emit('question', questions[idx]);
      }
    }, 300);
  } else {
    // Otherwise, immediately send the first question
    socket.emit('question', questions[idx]);
  }

  socket.on('answer', i => {
    // Determine correctness and include indexes
    const correctIndex = questions[idx].correct;
    const isCorrect    = (correctIndex === i);

    // Send detailed feedback
    socket.emit('feedback', {
      correct:      isCorrect,
      correctIndex,
      selected:     i
    });

    // Pause for 2 seconds so clients can read the feedback…
    setTimeout(() => {
      idx++;

      // If we've exhausted the array, end the quiz
      if (idx >= questions.length) {
        return socket.emit('end', { message: '🛑 Quiz over! Thanks for playing.' });
      }

      // If we're near the end, pre‑load more questions
      if (idx >= questions.length - 2) {
        loadQuestions().then(qs => questions = qs);
      }

      // Send the next question
      socket.emit('question', questions[idx]);
    }, 2000);
  });
}); // ← closes io.on('connection')

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
