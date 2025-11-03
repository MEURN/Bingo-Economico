const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("popup");
const resultEl = document.getElementById("result");
const descriptionEl = document.getElementById("description");
const factEl = document.getElementById("fact");
const closePopup = document.getElementById("closePopup");
const spinAgain = document.getElementById("spinAgain");
const panel = document.getElementById("optionsPanel");
const resetDefaultsBtn = document.getElementById("resetDefaults");
const spinBtn = document.getElementById("spin");
const addOptionBtn = document.getElementById("addOption");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

const defaultOptions = [
  { text: "Ciclo", desc: "Es la sucesión de fases por las que pasa la economía: expansión, auge, recesión y recuperación.", fact: "Los ciclos económicos no son iguales en duración ni intensidad; algunos pueden durar décadas y otros solo unos pocos años." },
  { text: "Crecimiento", desc: "Es el aumento sostenido de la producción de bienes y servicios de un país durante un período de tiempo.", fact: "El crecimiento económico no siempre mejora la calidad de vida si no se acompaña de distribución equitativa de ingresos." },
  { text: "Divisas", desc: "Son monedas extranjeras que un país utiliza para comercio internacional o reservas.", fact: "El dólar estadounidense representa alrededor del 60% de las reservas internacionales del mundo." },
  { text: "Impuestos", desc: "Son pagos obligatorios que tienen las personas o empresas al Estado para financiar servicios públicos.", fact: "Algunos países usaban impuestos curiosos, como el impuesto a las burbujas de jabón en Inglaterra en el siglo XIX." },
  { text: "Inflación", desc: "Es el aumento generalizado y sostenido de los precios de bienes y servicios en un país.", fact: "En 2008, Zimbabue tuvo una inflación de millones por ciento anual." },
  { text: "Inversión", desc: "Uso de recursos para obtener un beneficio futuro, como comprar maquinaria, acciones o propiedades.", fact: "La inversión también puede ser en educación o investigación, lo que se llama capital humano." },
  { text: "Moneda", desc: "Medio de pago aceptado por una sociedad: billetes, monedas o dinero digital.", fact: "La primera moneda fue creada en Lidia (actual Turquía) alrededor del 600 a.C." },
  { text: "Monopsonio", desc: "Situación de mercado con un solo comprador y muchos vendedores.", fact: "Es menos común que el monopolio, pero existe en mercados laborales de grandes empresas." },
  { text: "Producción", desc: "Proceso de crear bienes o servicios a partir de recursos o insumos.", fact: "La productividad depende de la tecnología, la organización y la motivación de los trabajadores." },
  { text: "Consumidores", desc: "Persona o entidad que adquiere bienes y servicios para su uso o consumo.", fact: "El consumo masivo cayó un 4% interanual en Argentina en septiembre de 2025." },
  { text: "Costos", desc: "Gasto necesario para producir bienes o prestar servicios.", fact: "El costo en Argentina aumentó un 2,1% mensual en 2025." },
  { text: "Deuda", desc: "Obligación de devolver dinero o recursos en un plazo determinado.", fact: "En 2025, la deuda pública en pesos aumentó mientras que la deuda en moneda extranjera bajó." },
  { text: "Crédito", desc: "Operación financiera en la que se presta dinero con obligación de devolverlo con intereses.", fact: "En 2022 el crédito en Argentina se redujo al nivel más bajo de su historia (0,2% del PBI)." },
  { text: "IVA", desc: "Impuesto al Valor Agregado aplicado sobre el consumo de bienes y servicios.", fact: "En Argentina la alícuota general es del 21%, siendo una fuente constante de recaudación." },
  { text: "Mercados", desc: "Conjunto de compradores y vendedores que intercambian bienes y servicios.", fact: "El índice de precios al consumidor (IPC) de CABA mostró una inflación interanual del 35%." },
  { text: "Moneda Digital", desc: "Medio de pago electrónico que tiene el mismo valor que una moneda física.", fact: "Argentina fue el país con mayor uso de criptomonedas en Latinoamérica en 2024." },
  { text: "Tecnología", desc: "Conjunto de conocimientos aplicados para mejorar procesos y producción.", fact: "Argentina lidera en biotecnología en Latinoamérica con un 34% de empresas del sector." },
  { text: "Comercio", desc: "Intercambio de bienes y servicios entre personas, empresas o países.", fact: "Más del 80% del comercio mundial se transporta por vía marítima." },
  { text: "Desempleo", desc: "Situación en la que personas que pueden y quieren trabajar no consiguen empleo.", fact: "Existen distintos tipos de desempleo: estructural, friccional y cíclico." },
  { text: "Elasticidad", desc: "Mide cuánto cambia la demanda u oferta cuando varía el precio u otro factor.", fact: "Los productos básicos tienen baja elasticidad: se siguen comprando aunque suban de precio." },
  { text: "Oferta", desc: "Cantidad de bienes o servicios que los productores están dispuestos a vender.", fact: "Si los costos de producción bajan, la oferta normalmente aumenta." },
  { text: "Oligopolio", desc: "Mercado dominado por pocas empresas que influyen en precios y producción.", fact: "Las telefónicas o aerolíneas suelen operar en mercados oligopólicos." },
  { text: "Precios", desc: "Valor en dinero asignado a un bien o servicio, determinado por oferta y demanda.", fact: "La inflación hace que los precios suban de forma generalizada con el tiempo." },
  { text: "Aranceles", desc: "Impuestos aplicados a mercancías importadas o exportadas.", fact: "A veces se usan como herramienta política para influir en otros países." },
  { text: "Monotributo", desc: "Régimen simplificado que unifica impuestos y aportes previsionales para pequeños contribuyentes.", fact: "Más de 4 millones de personas están inscriptas en el monotributo en Argentina." },
  { text: "Empleo", desc: "Relación laboral entre empleador y trabajador a cambio de salario.", fact: "Islandia redujo la semana laboral a 35 horas sin bajar los sueldos." },
  { text: "Demanda", desc: "Deseo y capacidad de los consumidores para comprar bienes y servicios.", fact: "En Japón, la demanda de pollo KFC se dispara en Navidad." },
  { text: "Auge", desc: "Etapa de máximo crecimiento económico, con alta producción, empleo y consumo.", fact: "Es una de las fases del ciclo económico junto con recesión y recuperación." },
  { text: "Estabilidad", desc: "Cuando los precios y la economía mantienen un ritmo constante sin cambios bruscos.", fact: "La estabilidad económica genera confianza en los inversores y consumidores." },
  { text: "Ganancias", desc: "Dinero que queda después de restar los costos de los ingresos.", fact: "Las empresas del campo y la energía tuvieron grandes ganancias en 2025." },
  { text: "Monopolio", desc: "Situación de mercado donde existe un único oferente de un bien o servicio, lo que le permite controlar precios y cantidades.", fact: "El término se originó en la antigua Grecia, donde se refería al derecho exclusivo de un individuo para comerciar en un mercado específico." },
  { text: "PBI", desc: "(Producto Bruto Interno) Es el valor total de todos los bienes y servicios finales producidos dentro de las fronteras de un país en un período determinado. Mide la actividad económica interna.", fact: "El PBI no incluye el trabajo no remunerado (como el trabajo doméstico o voluntario), por lo que a menudo se critica por no reflejar el bienestar real de la población." },
  { text: "PBN", desc: "(Producto Bruto Nacional) Es el valor de todos los bienes y servicios finales producidos por los residentes de un país, independientemente de dónde se haya producido la producción (dentro o fuera del país).", fact: "La diferencia entre el PBI y el PBN es la balanza de pagos: el PBN es igual al PBI más las rentas netas enviadas/recibidas del exterior." },
  { text: "Recesión", desc: "Una fase del ciclo económico caracterizada por una disminución significativa de la actividad económica general, generalmente definida como dos trimestres consecutivos de caída del PBI real.", fact: "El término recesión se utiliza cuando la caída es leve o moderada; si es muy profunda y prolongada, se denomina depresión." },
  { text: "Riesgo", desc: "La posibilidad de que ocurra un evento que tenga un impacto negativo en el logro de los objetivos de una persona o entidad (financiero, operativo, etc.).", fact: "En finanzas, el riesgo a menudo se mide utilizando la desviación estándar de los rendimientos esperados, conocida como volatilidad." },
  { text: "Deflación", desc: "Es la caída generalizada y sostenida de los precios de bienes y servicios en una economía durante un período.", fact: "La deflación puede ser tan peligrosa para la economía como la inflación alta, ya que incentiva a las personas a posponer compras esperando precios aún más bajos, lo que paraliza el consumo y la inversión." },
  { text: "Política Fiscal", desc: "Conjunto de decisiones y acciones que toma el gobierno sobre el gasto público y los impuestos para influir en la economía.", fact: "Durante las guerras, la política fiscal se vuelve extremadamente expansiva, aumentando drásticamente el gasto público para financiar el esfuerzo bélico." },
  { text: "Política Monetaria", desc: "Acciones tomadas por el Banco Central (generalmente) para controlar la oferta de dinero y las tasas de interés, buscando estabilidad de precios y crecimiento económico.", fact: "La herramienta más común de política monetaria es la manipulación de la tasa de interés de referencia, que afecta el costo del dinero en toda la economía." },
  { text: "Ahorro", desc: "Es la porción del ingreso que no se consume ni se destina al gasto inmediato.", fact: "Históricamente, en algunas culturas antiguas, el ahorro no se medía en dinero, sino en bienes duraderos como ganado o metales preciosos." },
  { text: "Depresión", desc: "Una recesión económica severa y prolongada, caracterizada por una caída significativa del PBI, alto desempleo y baja actividad económica.", fact: "La Gran Depresión de los años 30 en EE. UU. fue tan grave que el desempleo llegó a superar el 25%." },
  { text: "Duopolio", desc: "Una estructura de mercado donde solo existen dos empresas que dominan la oferta de un bien o servicio específico.", fact: "El término se usa a menudo para describir situaciones donde dos grandes empresas tienen un control casi total sobre un sector, aunque técnicamente no sea un duopolio puro." },
  { text: "Empresa", desc: "Unidad económica que combina capital y trabajo para producir bienes o servicios destinados al mercado.", fact: "La empresa más antigua del mundo que sigue en funcionamiento, según el Libro Guinness de los Récords, es el Kongō Gumi, una constructora de templos japoneses fundada en el año 578 d.C. (aunque ahora es una subsidiaria)." },
  { text: "Bolsa", desc: "Lugar donde se compran y venden acciones", fact: "La bolsa Argentina fue una de las más volatiles del mundo" }
];

let options = JSON.parse(localStorage.getItem("ruletaOpciones")) || JSON.parse(JSON.stringify(defaultOptions));
let rotation = 0;
let spinning = false;

// 🔹 FUNCIONES PRINCIPALES - Solución para texto nítido
function resizeCanvas() {
  const container = document.querySelector('.wheel-container');
  const size = container.offsetWidth;
  
  // Configurar el tamaño de visualización del canvas
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  
  // Configurar la resolución interna del canvas para pantallas de alta densidad
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  
  // Escalar el contexto para que coincida con el DPR
  ctx.scale(dpr, dpr);
  
  drawWheel();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 🔹 FUNCIÓN MEJORADA: Calcular tamaño de fuente óptimo para cada texto
function calculateOptimalFontSize(text, availableWidth, availableHeight, size) {
  // Tamaño base según la cantidad de opciones y tamaño de la ruleta
  const num = options.length;
  
  // Fórmula mejorada que considera:
  // 1. Tamaño de la ruleta
  // 2. Cantidad de opciones (más opciones = texto más pequeño)
  // 3. Espacio angular disponible
  let baseFontSize;
  
  if (num <= 8) {
    baseFontSize = size / 20; // Pocas opciones = texto grande
  } else if (num <= 15) {
    baseFontSize = size / 25; // Opciones medias
  } else if (num <= 25) {
    baseFontSize = size / 30; // Muchas opciones
  } else if (num <= 40) {
    baseFontSize = size / 35; // Muchísimas opciones
  } else {
    baseFontSize = size / 40; // Cantidad extrema
  }
  
  // Ajustar según la longitud del texto
  const textLength = text.length;
  let lengthFactor = 1;
  
  if (textLength > 15) {
    lengthFactor = 0.85;
  }
  if (textLength > 20) {
    lengthFactor = 0.7;
  }
  if (textLength > 25) {
    lengthFactor = 0.6;
  }
  
  let fontSize = baseFontSize * lengthFactor;
  
  // Establecer límites absolutos
  const minSize = Math.max(8, size / 60); // Mínimo adaptativo
  const maxSize = Math.min(32, size / 15); // Máximo adaptativo
  
  fontSize = Math.max(minSize, Math.min(fontSize, maxSize));
  
  // Verificar que el texto quepa en el ancho disponible
  ctx.font = `bold ${fontSize}px Montserrat`;
  let textWidth = ctx.measureText(text).width;
  
  // Si el texto es muy ancho, reducir el tamaño hasta que quepa
  while (textWidth > availableWidth && fontSize > minSize) {
    fontSize -= 0.5;
    ctx.font = `bold ${fontSize}px Montserrat`;
    textWidth = ctx.measureText(text).width;
  }
  
  return fontSize;
}

function drawWheel() {
  const num = options.length;
  const size = canvas.width / (window.devicePixelRatio || 1);
  
  ctx.clearRect(0, 0, size, size);
  
  if (num === 0) {
    // Mostrar mensaje cuando no hay opciones
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${size / 15}px Montserrat`;
    ctx.textAlign = "center";
    ctx.fillText("No hay opciones", size / 2, size / 2);
    return;
  }
  
  const angle = 2 * Math.PI / num;
  const radius = size / 2;
  
  for (let i = 0; i < num; i++) {
    // Dibujar segmento de color
    ctx.beginPath();
    ctx.moveTo(size / 2, size / 2);
    ctx.arc(size / 2, size / 2, radius, i * angle, (i + 1) * angle);
    ctx.fillStyle = i % 2 === 0 ? "#751a42" : "#7c3959";
    ctx.fill();

    // Dibujar texto con tamaño adaptativo
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(i * angle + angle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    
    // Calcular espacio disponible para el texto
    const availableWidth = radius * 0.75; // 75% del radio
    const availableHeight = radius * angle * 0.8; // Altura basada en el ángulo
    
    // Obtener tamaño de fuente óptimo para este texto específico
    const text = options[i].text;
    const fontSize = calculateOptimalFontSize(text, availableWidth, availableHeight, size);
    
    ctx.font = `bold ${fontSize}px Montserrat`;
    
    // Activar suavizado de texto para mejor calidad
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Agregar sombra al texto para mejor legibilidad
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
    // Posicionar el texto
    const textX = radius - radius * 0.15;
    const textY = fontSize / 60;
    
    // Verificar si el texto necesita ser truncado
    ctx.textBaseline = 'middle';
    let displayText = text;
    let textWidth = ctx.measureText(text).width;
    
    if (textWidth > availableWidth) {
      // Truncar con puntos suspensivos
      while (textWidth > availableWidth && displayText.length > 0) {
        displayText = displayText.slice(0, -1);
        textWidth = ctx.measureText(displayText + '...').width;
      }
      displayText += '...';
    }
    
    ctx.fillText(displayText, textX, textY);
    
    // Resetear sombra
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    ctx.restore();
  }
  
  // Dibujar círculo central decorativo
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 15, 0, 2 * Math.PI);
  ctx.fillStyle = "#c44fe0";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = size / 100;
  ctx.stroke();
}

spinBtn.addEventListener("click", () => {
  if (spinning || options.length === 0) return;
  
  spinning = true;
  spinBtn.disabled = true;
  
  spinSound.currentTime = 0;
  spinSound.play().catch(() => {}); // Ignorar errores de audio

  const spins = Math.floor(Math.random() * 5) + 5;
  const spinAngle = spins * 2 * Math.PI + Math.random() * 2 * Math.PI;
  let start = null;

  function animate(ts) {
    if (!start) start = ts;
    const progress = ts - start;
    const duration = 4000;
    const easeOut = 1 - Math.pow(1 - progress / duration, 3);
    rotation = spinAngle * easeOut;
    canvas.style.transform = `rotate(${rotation}rad)`;
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      finishSpin(rotation);
    }
  }
  
  requestAnimationFrame(animate);
});

function finishSpin(finalRotation) {
  winSound.currentTime = 0;
  winSound.play().catch(() => {}); // Ignorar errores de audio

  const num = options.length;
  const anglePer = 2 * Math.PI / num;
  const index = Math.floor((num - ((finalRotation + Math.PI / 2) % (2 * Math.PI)) / anglePer)) % num;
  const selected = options[index];
  
  if (!selected) {
    spinning = false;
    spinBtn.disabled = false;
    return;
  }

  resultEl.textContent = selected.text;
  descriptionEl.textContent = selected.desc;
  factEl.textContent = selected.fact;
  popup.classList.add("show");

  // Confetti con mejor configuración
 

  options.splice(index, 1);
  localStorage.setItem("ruletaOpciones", JSON.stringify(options));
  
  spinning = false;
  spinBtn.disabled = false;
  
  drawWheel();
}

closePopup.addEventListener("click", () => {
  popup.classList.remove("show");
});

spinAgain.addEventListener("click", () => {
  popup.classList.remove("show");
  if (options.length > 0) {
    spinBtn.click();
  }
});

document.querySelector(".accordion").addEventListener("click", function () {
  this.classList.toggle("active");
  panel.classList.toggle("open");
  if (panel.classList.contains("open")) {
    renderEditor();
  }
});

function renderEditor() {
  panel.innerHTML = "";
  
  if (options.length === 0) {
    panel.innerHTML = '<p style="text-align: center; padding: 20px; color: rgba(255,255,255,0.7);">No hay opciones. Agrega una nueva opción.</p>';
    return;
  }
  
  options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.className = "option-input";
    div.innerHTML = `
      <input type="text" value="${opt.text}" placeholder="Título" data-index="${index}" data-field="text">
      <textarea rows="2" placeholder="Definición" data-index="${index}" data-field="desc">${opt.desc}</textarea>
      <textarea rows="2" placeholder="Dato curioso" data-index="${index}" data-field="fact">${opt.fact}</textarea>
      <button onclick="deleteOption(${index})" style="background-color: #c44444; padding: 8px;">🗑️ Eliminar</button>
    `;
    
    div.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", (e) => {
        const idx = parseInt(e.target.dataset.index);
        const field = e.target.dataset.field;
        options[idx][field] = e.target.value;
        localStorage.setItem("ruletaOpciones", JSON.stringify(options));
        drawWheel();
      });
    });
    
    panel.appendChild(div);
  });
}

// Función global para eliminar opciones
window.deleteOption = function(index) {
  if (confirm('¿Estás seguro de que quieres eliminar esta opción?')) {
    options.splice(index, 1);
    localStorage.setItem("ruletaOpciones", JSON.stringify(options));
    renderEditor();
    drawWheel();
  }
};

addOptionBtn.addEventListener("click", () => {
  options.push({ 
    text: "Nueva opción", 
    desc: "Agrega aquí la definición...", 
    fact: "Agrega aquí un dato curioso..." 
  });
  localStorage.setItem("ruletaOpciones", JSON.stringify(options));
  
  // Abrir el panel si está cerrado
  if (!panel.classList.contains("open")) {
    document.querySelector(".accordion").click();
  } else {
    renderEditor();
  }
  
  drawWheel();
});

resetDefaultsBtn.addEventListener("click", () => {
  if (confirm('¿Estás seguro de que quieres restablecer todas las opciones a los valores predeterminados? Se perderán todos los cambios.')) {
    options = JSON.parse(JSON.stringify(defaultOptions));
    localStorage.setItem("ruletaOpciones", JSON.stringify(options));
    
    setTimeout(() => {
      resizeCanvas();
      if (panel.classList.contains("open")) {
        renderEditor();
      }
      drawWheel();
    }, 100);
  }
});

// Inicializar
drawWheel();
if (panel.classList.contains("open")) {
  renderEditor();
}

// Prevenir zoom en dispositivos móviles al hacer doble tap
document.addEventListener('dblclick', (e) => {
  e.preventDefault();
}, { passive: false });