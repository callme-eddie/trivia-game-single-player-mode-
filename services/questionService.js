// services/questionService.js
const axios = require('axios');

async function loadQuestions() {
  const res = await axios.get('https://opentdb.com/api.php', {
    params: { amount: 10, type: 'multiple' }
  });
  return res.data.results.map(q => {
    const options = [...q.incorrect_answers, q.correct_answer]
      .sort(() => Math.random() - 0.5);
    return {
      text: q.question,
      options,
      correct: options.indexOf(q.correct_answer)
    };
  });
}

module.exports = { loadQuestions };
