const wrapper = document.getElementById('wrapper');
let slides = [];
let current = 0;

async function loadWrapped() {
  try {
    const params = new URLSearchParams(window.location.search);
    const user_to_load = params.get('user');
    const res = await fetch('data.json');
    const data = await res.json();
    buildSlides(data['all'][user_to_load]);
  } catch (e) {
    console.error('Error loading JSON:', e);
  }
}

function buildSlides(data) {
  wrapper.innerHTML = ''; // clear loading screen

  console.log(data)
  // 1. Intro Slide
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #f15bb5)`,
    `<h1>Hola ${data.name} !</h1><p>Bienvenido a tu wrap de academia 2025</p><button id="startBtn">Start 🎶</button>`
  ));

  // 2. Top Events
  const artistList = data.top_events.map((a, i) => `<li>#${i + 1} ${a}</li>`).join('');
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #00bbf9, #9b5de5)`,
    `<h2>Tu top de talleres</h2><ul class="list">${artistList}</ul>`
  ));

  // 3. English classes
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2>Fuiste a</h2><p class="number_of_events">${data.number_of_english_classes} clases de ingles</p></br><p>Sehr gut!</p>`,
  ));

  // 4. Minutes Listened
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #1db954, #00bbf9)`,
    `<h2>Fuiste a</h2><p class="number_of_events">${data.number_of_attended_events} talleres</p>`
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
