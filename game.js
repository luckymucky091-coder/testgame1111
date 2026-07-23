// Minimal game skeleton for Quiz Land P6
// This file is a scaffold. Expand with asset loading, tilemap, and better physics.

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('question-modal');
const qText = document.getElementById('question-text');
const choicesEl = document.getElementById('choices');
const heartsEl = document.getElementById('hearts');
const scoreEl = document.getElementById('score');
const muteBtn = document.getElementById('mute-btn');

let state = {
  width: canvas.width,
  height: canvas.height,
  player: { x: 100, y: 500, vx:0, vy:0, w:32, h:48, onGround:false },
  gravity: 0.9,
  coins: [],
  hearts: 4,
  score: 0,
  questions: [],
  roundQuestions: [],
  muted: false,
  awaitingAnswer: false
};

function loadQuestions() {
  return fetch('data/questions.json').then(r => r.json()).then(q => {
    state.questions = q;
  });
}

function startRound() {
  // pick random 10 questions
  const all = [...state.questions];
  const picked = [];
  while (picked.length < 10 && all.length) {
    const i = Math.floor(Math.random()*all.length);
    picked.push(all.splice(i,1)[0]);
  }
  state.roundQuestions = picked;
  // spawn sample coins for each question (positions should be generated on map)
  state.coins = picked.map((q, i) => ({ id:i, x:200 + i*100, y:400 - (i%3)*50, collected:false, question:q }));
  state.score = 0;
  state.hearts = 4;
  updateUI();
}

function updateUI() {
  heartsEl.textContent = '❤'.repeat(state.hearts) || '💀';
  scoreEl.textContent = `Score: ${state.score}`;
  muteBtn.textContent = state.muted ? '🔇' : '🔊';
}

function showQuestion(coin) {
  state.awaitingAnswer = true;
  modal.classList.remove('hidden');
  qText.textContent = coin.question.q;
  choicesEl.innerHTML = '';
  coin.question.choices.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c;
    btn.onclick = () => {
      const correct = (idx === coin.question.answerIndex);
      modal.classList.add('hidden');
      state.awaitingAnswer = false;
      if (correct) {
        state.score += 10;
        coin.collected = true;
      } else {
        state.hearts = Math.max(0, state.hearts - 1);
      }
      updateUI();
      // check game over or round complete
    };
    choicesEl.appendChild(btn);
  });
}

function gameLoop() {
  // simple physics & rendering
  ctx.clearRect(0,0,state.width,state.height);
  // player (placeholder)
  const p = state.player;
  p.vy += state.gravity;
  p.y += p.vy;
  if (p.y > 600) { p.y = 600; p.vy = 0; p.onGround = true; }
  // draw player
  ctx.fillStyle = '#ffccff';
  ctx.fillRect(p.x, p.y - p.h, p.w, p.h);

  // draw coins
  state.coins.forEach(c => {
    if (!c.collected) {
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(c.x, c.y, 12, 0, Math.PI*2);
      ctx.fill();
      // simple collision
      if (Math.hypot((p.x+p.w/2)-c.x, (p.y-p.h/2)-c.y) < 32 && !state.awaitingAnswer) {
        showQuestion(c);
      }
    }
  });

  requestAnimationFrame(gameLoop);
}

// basic input
window.addEventListener('keydown', e => {
  if (e.code === 'ArrowUp' || e.code === 'Space') {
    if (state.player.onGround && !state.awaitingAnswer) {
      state.player.vy = -18;
      state.player.onGround = false;
    }
  }
  if (e.code === 'ArrowLeft') state.player.x -= 8;
  if (e.code === 'ArrowRight') state.player.x += 8;
});

muteBtn.addEventListener('click', () => { state.muted = !state.muted; updateUI(); });

loadQuestions().then(() => {
  startRound();
  requestAnimationFrame(gameLoop);
});
