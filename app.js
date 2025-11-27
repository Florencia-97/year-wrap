const wrapper = document.getElementById('wrapper');
let slides = [];
let current = 0;
let started = false;
let musicPlaying = false;


const steps = [
  {id: 'start', label: 'Start'},
  {id: 'info', label: 'Info'},
  {id: 'shipping', label: 'Shipping'},
  {id: 'friend', label: 'friend'},
  {id: 'ghandi', label: 'ghandi'},
  {id: 'outro', label: 'Outro'},
];

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
    `<h1>¡Hola ${data.name}!</h1><p>Tu wrap de academia 2025</p><button id="startBtn">Comenzar 📚</button>`
  ));


  // 2.
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5,rgb(146, 247, 136))`,
    `<h1>La calidad y tipo de servicios que ofrecemos <span>depende de los conocimientos</span> que tengamos. <br>¡<span>Aprender es vital</span> para el funcionamiento de nuestra cooperativa! <br> Repasemos algunas cositas que se vieron este año.</h1>`
  ));

  // 3.
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5,rgb(146, 247, 136))`,
    `<h1>Sabias que este año hubo <span>${extra.cantidad_de_capacitaciones} instancias de capitación</span> y la más popular fue <span>${extra.capacitacion_mas_popular}</span>?</h1>`
  ));

    // 4.
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg, #9b5de5,rgb(146, 247, 136))`,
      `<h2>Taller IA</h2><br><p class="taller_data">Tuvimos ${extra.cantidad_de_capacitaciones} talleres de IA. Sabías que en el taller de IA empezamos viendo conceptos simples como regresiones lineales y fuimos construyendo hasta entender cómo funcionan modelos más modernos como LLMs y redes convolucionales? También vimos cómo usar herramientas como n8n, keras y pytorch!</p>`
    ));


    // 5.
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg, #9b5de5,rgb(146, 247, 136))`,
      `<h2>Taller ZK</h2><br><p class="taller_data">Tuvimos ${extra.cantidad_de_capacitaciones} talleres de ZK. En el taller de ZK aprendimos cómo funciona una blockchain, distintos proving systems, la matemática que está detrás de los mismos y hasta revisamos papers que salieron este mismo año! Esto nos permitió tomar proyectos que nos posicionaron como una de las principales empresas de ZK en el mundo!</p>`
    ));


    // 6.
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg, #9b5de5,rgb(146, 247, 136))`,
      `<h2>Taller gestión</h2><br><p class="taller_data">Tuvimos ${extra.cantidad_de_capacitaciones} talleres de gestión. El trabajo en equipo es fundamental. En el taller de gestión se habló sobre cómo mejorar la motivación de los equipos, y mejorar los procesos en la gestión de proyectos de precio fijo y con incertidumbre, como las últimas grants o proyectos de IA.</p>`
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

  // 5. Asistencia
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg, #fee440, #f15bb5)`,
      `<h2>Asististe a</h2><p class="number_of_events">${data.asististe_a_X_capacitaciones} capacitaciones, ${assist_message}</p></br>
      <p class=bottom_notation>¡Eso es más que el ${number_of_assists_percentage} de los socies!</p>`,
    ));

  // 6. Mes más concurrido
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #1db954, #00bbf9)`,
    `<h2>Ya viene diciembre y estamos abriendo los regalos. ¿Sabias que el mes en el que más te capacitaste fue en </h2><p class="number_of_events">${data.mes_que_mas_capacitaste} ?</p>`
  ));

  // 7
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2>Parece que la capacitación que más te gustó fue</h2><p class="number_of_events">${data.capacitacion_mas_asististe}</p></br>`,
  ));


  // 8
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #1db954, #f15bb5)`,
    `<h2> Tu categoria más popular fue</h2><p class="number_of_events">"${data.tu_categoria_mas_popular_fue}"</p></br>
    <p class=bottom_notation>El formato que parece que te gusta más es ${data.el_formato_que_mas_asististe}.</p>`,
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
    `<h2>"Vive como si fueras a morir mañana, aprende como si fueras a vivir siempre"</h2>
    <p class=bottom_notation>Ghandi</p>`
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
  nextSlide();
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
  slides[current].classList.add('active');
  moveToNextButton();
  if (!musicPlaying) {
    playMusic();
  }
}

function restart() {
  slides[current].classList.remove('active');
  current = 0;
  slides[current].classList.add('active');
}

function renderDots(){
  dotsContainer.innerHTML = '';
  labelsContainer.innerHTML = '';

  steps.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot-btn';
    btn.type = 'button';
    btn.setAttribute('role','tab');
    btn.setAttribute('aria-selected', String(i===activeIndex));
    btn.setAttribute('aria-current', String(i===activeIndex));
    btn.dataset.index = ''+i;
    btn.title = s.label || ('Step ' + (i+1));

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

function focusDot(i){
  const btns = dotsContainer.querySelectorAll('.dot-btn');
  const btn = btns[i];
  if(btn) btn.focus();
}

function moveToNextButton(){
  const newIndex = activeIndex + 1;
  if(newIndex<0 || newIndex>steps.length-1) return;
  activeIndex = newIndex;
  updateUI();
  // dispatch a custom event so you can hook into the step change
  stepper.dispatchEvent(new CustomEvent('stepchange', {detail:{index:newIndex, step:steps[newIndex]}}));
}

function updateUI(){
  const btns = dotsContainer.querySelectorAll('.dot-btn');
  btns.forEach((b, idx) => {
    const active = idx === activeIndex;
    b.setAttribute('aria-selected', String(active));
    b.setAttribute('aria-current', String(active));
  });


}


// Auto advance
setInterval(() => {
  if (slides.length && current < slides.length - 1 && started){
    nextSlide();
  };
}, 14000);



loadWrapped();
