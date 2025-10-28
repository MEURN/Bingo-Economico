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
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

// 60 opciones completas (completa hasta 60 siguiendo el mismo formato)
const defaultOptions = [
  { text: "Ciclo", desc: "Es la sucesión de fases por las que pasa la economía: expansión, auge, recesión y recuperación.", fact: "Los ciclos económicos no son iguales en duración ni intensidad; algunos pueden durar décadas y otros solo unos pocos años." },
  { text: "Crecimiento", desc: "Es el aumento sostenido de la producción de bienes y servicios de un país durante un período de tiempo.", fact: "El crecimiento económico no siempre mejora la calidad de vida si no se acompaña de distribución equitativa de ingresos." },
  { text: "Divisas", desc: "Son monedas extranjeras que un país utiliza para comercio internacional o reservas.", fact: "El dólar estadounidense representa alrededor del 60% de las reservas internacionales del mundo." },
  { text: "Impuestos", desc: "Son pagos obligatorios que tienen las personas o empresas al Estado para financiar servicios públicos.", fact: "Algunos países usan impuestos muy curiosos, como un impuesto a las burbujas de jabón en Inglaterra en el siglo XIX." },
  { text: "Inflación", desc: "Es el aumento generalizado y sostenido de los precios de bienes y servicios en un país.", fact: "La inflación puede ser tan alta que llega a niveles astronómicos; por ejemplo, en Zimbabue en 2008 alcanzó millones por ciento anual." },
  { text: "Inversión", desc: "Es el uso de recursos para obtener un beneficio futuro, como comprar maquinaria, acciones o propiedades.", fact: "La inversión puede ser en educación o investigación, lo que se llama capital humano." },
  { text: "Moneda", desc: "Es cualquier medio de pago aceptado por una sociedad, como billetes, monedas o dinero digital.", fact: "La primera moneda de la historia fue creada en Lidia alrededor del 600 a.C." },
  { text: "Monopsonio", desc: "Es una situación de mercado en la que hay un solo comprador para muchos vendedores.", fact: "El monopsonio es menos común que el monopolio, pero se ve en sectores como el mercado laboral de ciertas empresas grandes." },
  { text: "Producción", desc: "Es el proceso de crear bienes o servicios a partir de recursos o insumos.", fact: "La productividad depende de la tecnología, organización y motivación de los trabajadores." },
  { text: "Consumidores", desc: "El consumidor es una persona física o jurídica que adquiere o utiliza bienes y servicios.", fact: "El consumo masivo cayó un 4% interanual en septiembre del 2025." },
  { text: "Costos", desc: "Es la cantidad de dinero que se debe invertir o desembolsar para producir un bien o prestar un servicio.", fact: "El costo en Argentina en 2025 aumentó mensual 2,1%." },
  { text: "Deuda", desc: "Es la obligación de pagar o devolverle un recurso a una persona o empresa con un plazo y a menudo con intereses.", fact: "La deuda pública en pesos aumentó a finales del 2024 y disminuyó en moneda extranjera en agosto de 2025." },
  { text: "Credito", desc: "Es una operación financiera donde se presta dinero que debe devolverse con intereses.", fact: "En 2022 el crédito se redujo un 0,2% del PBI, siendo el registro más bajo de la historia." },
  { text: "IVA", desc: "Es un impuesto indirecto sobre el consumo derivado de la compra de bienes o servicios.", fact: "La alícuota general en Argentina es del 21%, fuente constante de ingreso estatal." },
  { text: "Mercado", desc: "Conjunto de compradores y vendedores que intercambian bienes y servicios.", fact: "El índice de precios al consumidor (IPC) CABA muestra una inflación interanual de un 35%." },
  { text: "Moneda Digital", desc: "Medio de pago digital con características de moneda física.", fact: "En 2024 Argentina tuvo mayor uso de criptoactivos en Latinoamérica con casi 100.000 millones de dólares." },
  { text: "Tecnología", desc: "Conjunto de conocimientos aplicados a la producción de bienes y servicios.", fact: "Argentina lidera en Biotécnica en Latinoamérica con un 34% de empresas en ese sector." },
  { text:"Auge", desc:"Etapa de máximo crecimiento económico.", fact:"Sigue a la fase de expansión y precede a la recesión." },
{ text:"Elasticidad", desc:"Cambio en la demanda ante variación de precios.", fact:"Algunos productos básicos tienen baja elasticidad." },
{ text:"Estabilidad", desc:"Situación económica con precios y crecimiento constantes.", fact:"Busca reducir la inflación y mantener empleo." },
{ text:"Ganancias", desc:"Dinero que queda tras deducir costos de producción.", fact:"Empresas del sector energético y tecnológico reportaron grandes ganancias este año" },
{ text:"Oferta", desc:"Cantidad de bienes o servicios disponibles para venta.", fact:"La oferta puede variar según estacionalidad o producción." },
{ text:"Oligopolio", desc:"Pocas empresas dominan un mercado.", fact:"Ejemplos: telecomunicaciones y aerolíneas." },
{ text:"Bolsa", desc:"Mercado donde se compran y venden acciones.", fact:"NYSE y Nasdaq son las principales bolsas de EE.UU." },
{ text:"Comercio", desc:"Intercambio de bienes o servicios entre personas o países.", fact:"El comercio internacional representa una gran parte del PIB mundial." },
{ text:"Desempleo", desc:"Porcentaje de personas en edad laboral sin trabajo.", fact:"Existen distintos tipos: estructural, friccional y cíclico." },
{ text:"Precios", desc:"Valor monetario asignado a un bien o servicio.", fact:"La inflación influye directamente en la variación de precios." },
{ text:"Aranceles", desc:"Impuesto aplicado a productos importados.", fact:"Se usan como barrera proteccionista o para presionar negociaciones comerciales." },
{ text:"Monotributo", desc:"Régimen simplificado de impuestos para pequeños contribuyentes.", fact:"Más de 4 millones de argentinos están inscriptos." },
{ text:"Empleo", desc:"Relación laboral entre trabajador y empleador a cambio de salario.", fact:"Las políticas de empleo buscan reducir el desempleo y mejorar condiciones laborales." },
{ text:"Demanda", desc:"Deseo y capacidad de adquirir bienes o servicios.", fact:"Puede aumentar en épocas festivas o por tendencias de consumo." },
];

let options = JSON.parse(localStorage.getItem("ruletaOpciones")) || JSON.parse(JSON.stringify(defaultOptions));
let lastSelectedIndex = null;

function resizeCanvas() {
    const size = Math.min(window.innerWidth*0.95, window.innerHeight*0.8);
    canvas.width = size;
    canvas.height = size;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawWheel() {
    const numOptions = options.length;
    const angle = 2 * Math.PI / numOptions;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<numOptions;i++){
        ctx.beginPath();
        ctx.moveTo(canvas.width/2,canvas.height/2);
        ctx.arc(canvas.width/2,canvas.height/2,canvas.width/2,i*angle,(i+1)*angle);
        ctx.fillStyle = i%2==0?"#51032c":"#7c3959";
        ctx.fill();
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(i*angle + angle/2);
        ctx.textAlign="right";
        ctx.fillStyle="#ffffff";
        let fontSize = Math.floor(canvas.width / (numOptions*1.8));
        fontSize = Math.max(Math.min(fontSize, 28), 12);
        ctx.font = `bold ${fontSize}px Montserrat`;
        ctx.fillText(options[i].text, canvas.width/2 - 20, 5);
        ctx.restore();
    }
}
drawWheel();

let rotation = 0;

spinBtn.addEventListener("click",()=>{
    const spins = Math.floor(Math.random()*10)+10;
    const spinAngle = spins*2*Math.PI + Math.random()*2*Math.PI;
    let start = null;
    spinSound.play();

    function animate(timestamp){
        if(!start) start=timestamp;
        const progress = timestamp - start;
        const duration = 4000;
        const t = Math.min(progress/duration,1);
        const ease = 1 - Math.pow(1-t,3);
        canvas.style.transform = `rotate(${rotation + spinAngle*ease}rad)`;
        if(progress<duration) requestAnimationFrame(animate);
        else finishSpin(rotation + spinAngle);
    }
    requestAnimationFrame(animate);
});

function finishSpin(finalRotation){
    winSound.play();
    const numOptions = options.length;
    const anglePerOption = 2*Math.PI/numOptions;
    lastSelectedIndex = Math.floor((numOptions - ((finalRotation + Math.PI/2) % (2*Math.PI))/anglePerOption)) % numOptions;
    const selected = options[lastSelectedIndex];

    resultEl.textContent = selected.text;
    descriptionEl.textContent = selected.desc;
    factEl.textContent = selected.fact;
    popup.classList.add("show");
    confetti({particleCount:150,spread:120,origin:{y:0.6}});
}

// Al cerrar el popup se elimina la opción seleccionada
closePopup.addEventListener("click", ()=>{
    popup.classList.remove("show");
    if(lastSelectedIndex !== null){
        options.splice(lastSelectedIndex,1);
        lastSelectedIndex = null;
        drawWheel();
    }
});
spinAgain.addEventListener("click",()=>{
    popup.classList.remove("show");
    if(lastSelectedIndex !== null){
        options.splice(lastSelectedIndex,1);
        lastSelectedIndex = null;
        drawWheel();
    }
    spinBtn.click();
});

document.querySelector(".accordion").addEventListener("click",function(){
    this.classList.toggle("active");
    panel.classList.toggle("open");
    panel.innerHTML="";
    options.forEach((opt,i)=>{
        const div=document.createElement("div");
        div.classList.add("option-input");
        div.innerHTML=`
            <input value="${opt.text}" placeholder="Título">
            <textarea placeholder="Descripción">${opt.desc}</textarea>
            <textarea placeholder="Dato curioso">${opt.fact}</textarea>
        `;
        panel.appendChild(div);
    });
});
resetDefaultsBtn.addEventListener("click",()=>{
    options = JSON.parse(JSON.stringify(defaultOptions));
    localStorage.setItem("ruletaOpciones",JSON.stringify(options));
    drawWheel();
});








