const wrapper = document.getElementById('wrapper');
let slides = [];
let current = 0;
let started = false;
let musicPlaying = false;

// you can change `steps` array above to add/remove steps
const dotsContainer = document.getElementById('dots');
const labelsContainer = document.getElementById('labels');
const currentEl = document.getElementById('current');
const stepper = document.getElementById('stepper');

let activeIndex = 0;

async function loadWrapped() {
  try {
    const params = new URLSearchParams(window.location.search);
    const user_to_load = params.get('user');
    const res = await fetch('data.json');
    const data = await res.json();
    buildSlides(data['socies'][user_to_load], data['extra']);
    renderDots();
  } catch (e) {
    console.error('Error loading JSON:', e);
  }
}

function buildSlides(data, extra) {
  wrapper.innerHTML = ''; // clear loading screen

  // 1. Intro Slide
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #f15bb5)`,
    `<h1 class=title_name>¡Hola ${data.name}!</h1><p>Tu wrap de academia 2025</p><button id="startBtn">Comenzar 📚</button>`
  ));

  // 2.
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5,rgb(146, 247, 136))`,
    `<h1><span>¡Aprender es vital para nuestra coope!</span><br> Repasemos algunas cositas que se vieron este año.</h1>`
  ));

  // 3.
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg,rgb(240, 184, 80),rgb(146, 247, 136))`,
    `<h1>Sabias que este año hubo <span>${extra.cantidad_de_capacitaciones} instancias de capitación</span> y la más popular fue <span>${extra.capacitacion_mas_popular}</span>?</h1>`
  ));

    // 4.
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg,rgb(146, 247, 136),rgb(93, 103, 182))`,
      `<h2>Taller IA</h2><b>Tuvimos ${extra.cantidad_de_taller_ia} talleres de IA.</b><p class="taller_data"> Vimos desde regresiones lineales hasta LLMs. También n8n, pytorch y mucho más 🤖</p>`
    ));


    // 5.
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg, #9b5de5,rgb(146, 247, 136))`,
      `<h2>Taller ZK</h2><b>Tuvimos ${extra.cantidad_de_taller_zk} talleres de ZK. </b><p class="taller_data">Hubo para todos los gustos: protocolos como zkBridge, charlas sobre arquitectura y lenguajes como aiken! 💻</p>`
    ));


    // 6.
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg,rgb(235, 98, 176),rgb(146, 247, 136))`,
      `<h2>Taller gestión</h2><b>Tuvimos ${extra.cantidad_de_taller_gestion} talleres de gestión.</b><p class="taller_data"> Se charló sobre cómo mejorar la motivación de los equipos y gestión de proyectos 🧑‍🤝‍🧑</p>`
    ));


  const number_of_assists_percentage = data.mas_capacitaciones_que_X;
  
  let assist_message = "";
  if (data.asististe_a_X_capacitaciones >= 60) {
    assist_message = "sos un capo"
  } else if (data.asististe_a_X_capacitaciones >= 30) {
    assist_message = "muy sólido"
  } else {
    assist_message = "¡nos gustaria verte más seguido!"
  }

  // 4. Asistencia
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2>Asististe a</h2><p class="number_of_events">${data.asististe_a_X_capacitaciones} capacitaciones, ${assist_message}</p></br>
    <p class=bottom_notation>¡Eso es más que el ${number_of_assists_percentage} de los socies!</p>`,
  ));

  // 6. Mes más concurrido
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #1db954, #00bbf9)`,
    `<h2>Ya viene diciembre y estamos abriendo los regalos... <br><span>¿Sabias que el mes en el que más te capacitaste fue en ${data.mes_que_mas_capacitaste}?</span>`
  ));

  // 7
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2>Parece que la capacitación que más te gustó fue...</h2><p class="number_of_events">${data.capacitacion_mas_asististe}</p></br>`,
  ));


  // 8
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #1db954, #f15bb5)`,
    `<h2> Tu categoria más popular fue...</h2><p class="number_of_events">"${data.tu_categoria_mas_popular_fue}"</p></br>
    <p class=bottom_notation>Y el formato que parece que te gusta más es ${data.el_formato_que_mas_asististe}.</p>`,
  ));

  // 9. Amigo
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg, #fee440, #f15bb5)`,
      `<h2>Capacitarse solo es aburrido! Tu media naranja de academia es</h2><p class="number_of_events">${data.amiguito_con_que_mas_asististe} 🫂</p></br>
      <p class=bottom_notation>¡Se vieron ${data.amiguito_con_que_mas_asististe_cantidad} veces!</p>`,
  ));


  // 10. Ghandi
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #fee440)`,
    `<h2 class=quote_ghandi>"Vive como si fueras a morir mañana, aprende como si fueras a vivir siempre"</h2>
    <p class=bottom_notation>Ghandi 🧘</p>`
  ));

  // 11. Outro
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #f15bb5)`,
    `<h2>¡Nos vemos el próximo año! Gracias por todo 💚</h2><button id="restartBtn">Replay</button>`
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
  document.getElementById('startBtn').addEventListener('click', start);
  document.getElementById('restartBtn').addEventListener('click', restart);
  document.addEventListener("click", nextSlide);
  slides[0].classList.add('active');
}

function start() {
  started = true;
  playMusic();
}

function playMusic() {
  const bgm = document.getElementById("bgm");
  bgm.volume = 1.0;
  bgm.play();
  musicPlaying=true;
}

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  activeIndex = current - 1;
  slides[current].classList.add('active');
  moveToNextButton();
  if (!musicPlaying) {
    playMusic();
  }
}

function restart() {
  slides[current].classList.remove('active');
  current = 0;
  activeIndex = 0;
  slides[current].classList.add('active');
}

function renderDots(){
  dotsContainer.innerHTML = '';

  slides.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot-btn';
    btn.type = 'div';
    btn.setAttribute('role','tab');
    btn.setAttribute('aria-selected', String(i===activeIndex));
    btn.setAttribute('aria-current', String(i===activeIndex));
    btn.dataset.index = ''+i;

    // small inner circle (visual only)
    const inner = document.createElement('span');
    inner.style.width = '8px';
    inner.style.height = '8px';
    inner.style.borderRadius = '50%';
    inner.style.background = 'transparent';
    btn.appendChild(inner);

    dotsContainer.appendChild(btn);

  });

  updateUI();
}


function moveToNextButton(){
  const newIndex = activeIndex + 1;
  if(newIndex<0 || newIndex>slides.length-1) return;
  activeIndex = newIndex;
  updateUI();
  // dispatch a custom event so you can hook into the step change
  stepper.dispatchEvent(new CustomEvent('stepchange', {detail:{index:newIndex, step:slides[newIndex]}}));
}

function updateUI(){
  const btns = dotsContainer.querySelectorAll('.dot-btn');
  btns.forEach((b, idx) => {
    const active = idx === activeIndex;
    b.setAttribute('aria-selected', String(active));
    b.setAttribute('aria-current', String(active));
  });
}



loadWrapped();
