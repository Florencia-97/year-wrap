const wrapper = document.getElementById('wrapper');
let slides = [];
let current = 0;

async function loadWrapped() {
  try {
    const params = new URLSearchParams(window.location.search);
    const user_to_load = params.get('user');
    console.log(user_to_load);
    const res = await fetch('data.json');
    const data = await res.json();
    buildSlides(data['all'][user_to_load]);
  } catch (e) {
    console.error('Error loading JSON:', e);
  }
}

function buildSlides(data) {
  wrapper.innerHTML = ''; // clear loading screen

  // 1. Intro Slide
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #f15bb5)`,
    `<h1>${data.intro.title}</h1><p>${data.intro.subtitle}</p><button id="startBtn">Start 🎶</button>`
  ));

  // 2. Top Artists
  const artistList = data.top_artists.map((a, i) => `<li>#${i + 1} ${a}</li>`).join('');
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #00bbf9, #9b5de5)`,
    `<h2>Your Top Artists</h2><ul class="list">${artistList}</ul>`
  ));

  // 3. Top Songs
  const songList = data.top_songs.map((s, i) => `<li>${i + 1}. “${s}”</li>`).join('');
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2>Your Top Songs</h2><ul class="list">${songList}</ul>`
  ));

  // 4. Minutes Listened
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #1db954, #00bbf9)`,
    `<h2>You listened for</h2><p class="minutes">${data.minutes_listened.toLocaleString()} minutes</p>`
  ));

  // 5. Outro
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #fee440)`,
    `<h2>${data.outro.message}</h2><p>${data.outro.cta}</p><button id="restartBtn">Replay</button>`
  ));

  slides = document.querySelectorAll('.slide');
  addEventListeners();
}

function createSlide(bg, html) {
  const section = document.createElement('section');
  section.classList.add('slide');
  section.style.background = bg;
  section.innerHTML = `<div class="content">${html}</div>`;
  return section;
}

function addEventListeners() {
  document.getElementById('startBtn').addEventListener('click', nextSlide);
  document.getElementById('restartBtn').addEventListener('click', restart);
  slides[0].classList.add('active');
}

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

function restart() {
  slides[current].classList.remove('active');
  current = 0;
  slides[current].classList.add('active');
}

// Auto advance every 5s
setInterval(() => {
  if (slides.length && current < slides.length - 1) nextSlide();
}, 5000);

loadWrapped();
