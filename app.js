const wrapper = document.getElementById('wrapper');
let slides = [];
let current = 0;

async function loadWrapped() {
  try {
    const params = new URLSearchParams(window.location.search);
    const user_to_load = params.get('user');
    const res = await fetch('data.json');
    const data = await res.json();
    console.log(user_to_load)
    buildSlides(data['socies'][user_to_load], data['extra']);
  } catch (e) {
    console.error('Error loading JSON:', e);
  }
}

function buildSlides(data, extra) {
  wrapper.innerHTML = ''; // clear loading screen

  // 1. Intro Slide
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #f15bb5)`,
    `<h1>Hola ${data.name} !</h1><p>Bienvenido a tu wrap de academia 2025</p><button id="startBtn">Start 🎶</button>`
  ));

  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #f15bb5)`,
    `<h1>Sabias que este año hubo ${extra.cantidad_de_capacitaciones} capitaciones y la más popular fue ${extra.capacitacion_mas_popular}?</h1>`
  ));

  const number_of_assists_percentage = data.mas_capacitaciones_que_X;
  
  let assist_message = "";
  if (data.asististe_a_X_capacitaciones >= 60) {
    assist_message = "Sos un capo"
  } else if (data.asististe_a_X_capacitaciones >= 30) {
    assist_message = "Sólido"
  } else {
    assist_message = "Nos gustaria verte más seguido!"
  }

  // 1. Asistencia
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2>Asististe a</h2><p class="number_of_events">${data.asististe_a_X_capacitaciones} capacitaciones. ${assist_message}</p></br>
    <p>Eso es más que el ${number_of_assists_percentage} de los socies</p>`,
  ));

  // 4. Mes más concurrido
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #1db954, #00bbf9)`,
    `<h2>Ya viene diciembre y estamos abriendo los regalos, sabias que el mes en el que más te capacitaste fue en </h2><p class="number_of_events">${data.mes_que_mas_capacitaste} ?</p>`
  ));


  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2>Parece que la capacitación que más te gustó fue</h2><p class="number_of_events">${data.capacitacion_mas_asististe}</p></br>`,
  ));


  // 1. Categoria y formato
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #fee440, #f15bb5)`,
    `<h2> Tu categoria más popular fue</h2><p class="number_of_events">${data.tu_categoria_mas_popular_fue}</p></br>
    <p>El formato que parece que te gusta más es ${data.el_formato_que_mas_asististe}.</p>`,
  ));

  // 1. Amigo
    wrapper.appendChild(createSlide(
      `linear-gradient(135deg, #fee440, #f15bb5)`,
      `<h2>Capacitarse solo es aburrido! Tu media naranja de academia es</h2><p class="number_of_events">${data.amiguito_con_que_mas_asististe} 🫂</p></br>
      <p>Se vieron ${data.amiguito_con_que_mas_asististe_cantidad} veces!</p>`,
  ));


  // 5. Ghandi
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #fee440)`,
    `<h2>"Vive como si fueras a morir mañana, aprende como si fueras a vivir siempre"</h2><p>Ghandi</p>`
  ));

  // 5. Outro
  wrapper.appendChild(createSlide(
    `linear-gradient(135deg, #9b5de5, #fee440)`,
    `<h2>Nos vemos el próximo año! Gracias por todo 💚</h2><button id="restartBtn">Replay</button>`
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
}, 8000);

loadWrapped();
