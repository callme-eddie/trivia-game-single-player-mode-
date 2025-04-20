// public/app.js

// Helper to decode HTML entities
function decodeHtml(html) {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
  }
  
  const socket        = io();
  const questionSlide = document.getElementById('questionSlide');
  const answerSlide   = document.getElementById('answerSlide');
  const qEl           = document.getElementById('question');
  const optsContainer = document.getElementById('options');
  const answerTextEl  = document.getElementById('answerText');
  const scoreEl       = document.getElementById('score');
  
  let score          = 0;
  let currentOptions = []; // holds decoded options for answer slide
  
  // New question arrives…
  socket.on('question', q => {
    // Show the question slide
    questionSlide.style.display = 'block';
    answerSlide.style.display   = 'none';
  
    // Re-enable clicking
    optsContainer.style.pointerEvents = '';
  
    // Render question
    qEl.textContent = decodeHtml(q.text);
  
    // Decode & keep options array
    currentOptions = q.options.map(decodeHtml);
  
    // Render 4 boxes
    optsContainer.innerHTML = currentOptions
      .map((opt,i) => `<div class="option" data-idx="${i}">${opt}</div>`)
      .join('');
  });
  
  // When an option is clicked…
  optsContainer.addEventListener('click', e => {
    const idx = e.target.dataset.idx;
    if (idx == null) return;
    socket.emit('answer', Number(idx));
  });
  
  // When feedback comes back…
  socket.on('feedback', ({ correct, correctIndex }) => {
    // Hide the question slide
    questionSlide.style.display = 'none';
  
    // Show the answer slide with the correct answer
    answerTextEl.textContent = currentOptions[correctIndex];
    answerSlide.style.display  = 'block';
  
    // **Here’s the fix: use the `correct` boolean to update the score**
    if (correct) score++;
    scoreEl.textContent = `Score: ${score}`;
  });
  
  // When the quiz ends…
  socket.on('end', ({ message }) => {
    questionSlide.style.display = 'none';
    answerSlide.style.display   = 'block';
    answerTextEl.textContent    = message;
  });
  