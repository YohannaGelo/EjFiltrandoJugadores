//   -->   CLASES   <--   //
//clase para objetos de jugador
class Jugador {

    constructor(nombreJugador, nivelJugador) {
        this.nombreJugador = nombreJugador;
        this.nivelJugador = nivelJugador;
        this.habilidadesJugador = [];
    }

}



//clase para objetos de habilidad
class Habilidad {

    constructor(nombreHabilidad, nivelHabilidad) {
        this.nombreHabilidad = nombreHabilidad;
        this.nivelHabilidad = nivelHabilidad;
    }

}

//clase para objetos de juegos
class Juego {

    constructor() {
        this.listaJugadores = [];
    }

    //   --->   Métodos de clase juego
    //creo jugadores con habilidades diferentes y los agrego a el array listaJugadores
    crearJugadores() {

        //lista de habilidades a usar
        const habilidadesDisponibles = ["Fuerza", "Resistencia", "Magia", "Velocidad", "Sigilo", "Potencia"];

        //hago un for para ir creando 10 jugadores
        for (let i = 1; i <= 10; i++) {
            let nombreJugador = "";
            let nivelJugador = 0;

            //asigno valores a cada uno
            switch (i) {
                case 1:
                    nombreJugador = "Yuurey";
                    nivelJugador = 13;
                    break;
                case 2:
                    nombreJugador = "Lunara";
                    nivelJugador = 7;
                    break;
                case 3:
                    nombreJugador = "Kaelthas";
                    nivelJugador = 9;
                    break;
                case 4:
                    nombreJugador = "Tresh";
                    nivelJugador = 11;
                    break;
                case 5:
                    nombreJugador = "Aloy";
                    nivelJugador = 6;
                    break;
                case 6:
                    nombreJugador = "Jinx";
                    nivelJugador = 8;
                    break;
                case 7:
                    nombreJugador = "Riven";
                    nivelJugador = 10;
                    break;
                case 8:
                    nombreJugador = "Kratos";
                    nivelJugador = 12;
                    break;
                case 9:
                    nombreJugador = "Sombra";
                    nivelJugador = 5;
                    break;
                case 10:
                    nombreJugador = "Ezio";
                    nivelJugador = 11;
                    break;
                default:
                    break;
            }

            //se crea un nuevo jugador
            let jugador = new Jugador(nombreJugador, nivelJugador);

            //voy dando cada habilidad a cada jugador y le genero un numero aleatorio para el nivel (0 - 20)
            habilidadesDisponibles.forEach(hab => {
                let num = Math.floor(Math.random() * 21);
                jugador.habilidadesJugador.push(new Habilidad(hab, num));
            });

            // Agrega el jugador a la lista de jugadores
            this.listaJugadores.push(jugador);
        }

    }

    //metodo para rellenar los selectores
    /* 
    originalmente no todos los jugadores tenian todas las habilidades por lo que cree esta clase
    mirando las habilidades existentes, así como el min y max valor de las mismas para poner 
    unicamente un rango de valor válido en los selectores.
    Finalmente he modificado el diseño, y todos tienen todas las habilidades, pero de este método
    solo he modificado que muestre todos los valores de los niveles.
    Por eso verás código comentado.
    */
    actualizarSelectores() {
        const selectorHabilidad = document.getElementById("selectorHabilidad"); // Obtiene el elemento 
        const selectorNivelMinimo = document.getElementById("selectorNivelMinimo"); // Obtiene el elemento 

        selectorHabilidad.innerHTML = "<option value=''>Seleccione una habilidad</option>"; // Reinicia el contenido del selector.
        selectorNivelMinimo.innerHTML = "<option value=''>Seleccione un nivel mínimo</option>"; // Reinicia el contenido del selector.

        //let nivelMin = 100;
        //let nivelMax = 0;
        const habilidadesSet = new Set();   //para guardar las habilidades que voy tomando

        //recorre cada jugador y añade la habilidad y valor
        this.listaJugadores.forEach(jug => {
            jug.habilidadesJugador.forEach(hab => {

                //se añade la habilidad al conjunto solo si no está presente
                /* en la nueva versión, nos ahorramos esta revisión, pero igual funciona así */
                if (!habilidadesSet.has(hab.nombreHabilidad)) {
                    habilidadesSet.add(hab.nombreHabilidad);

                    // //averiguao el nivel min y max de las habilidades actuales
                    // if (nivelMin > hab.nivelHabilidad) {
                    //     nivelMin = hab.nivelHabilidad;
                    // }

                    // if (nivelMax < hab.nivelHabilidad) {
                    //     nivelMax = hab.nivelHabilidad;
                    // }

                    const opcionH = document.createElement("option"); // Crea un nuevo elemento option para el select.

                    opcionH.value = hab.nombreHabilidad.toLowerCase(); // Establece el valor de la opción al nombre del estudiante.

                    opcionH.textContent = hab.nombreHabilidad; // Establece el texto visible de la opción al nombre del estudiante.
                    selectorHabilidad.appendChild(opcionH); // Añade la opción al selector.
                }
            });
        });

        //añado los valores de los niveles
        for (let i = 0; i <= 20; i++) {
            const opcionN = document.createElement("option");
            opcionN.value = i;
            opcionN.textContent = i;
            selectorNivelMinimo.appendChild(opcionN); // Añade la opción al selector.
        }

        //acutalizo el selector de nivel minimo comprobando que niveles hay
        // for (let i = nivelMin; i <= nivelMax; i++) {
        //     const opcionN = document.createElement("option");
        //     opcionN.value = i;
        //     opcionN.textContent = i;
        //     selectorNivelMinimo.appendChild(opcionN); // Añade la opción al selector.
        // }

    }

}


//   -->   MÉTODOS   <--   //
//filtra los jugadores del array según la elección del usuario
function filtrarJugadores(arrayJugadores) {

    //tomo los valores seleccionados por el usuario
    const habilidadSelec = document.getElementById("selectorHabilidad").value;
    const nivelMinSelec = parseInt(document.getElementById("selectorNivelMinimo").value);

    //creo una variable que almacenará el resultado del filtro y lo mostrará en el div con ese id
    const mostrarFiltro = document.getElementById("jugadoresFiltrados");
    mostrarFiltro.innerHTML = "";

    //creo un div que contendrá todos los jugadores filtrados
    const contenedorJug = document.createElement("div"); //crea un nuevo elemento de encabezado para el título.
    contenedorJug.classList.add('estiloFiltro');

    //recorro cada jugador y sus habilidades
    arrayJugadores.forEach(jug => {
        jug.habilidadesJugador.forEach(hab => {

            //si la habilidad es la elegida y el valor es igual o superior a la seleccionada...
            if (hab.nombreHabilidad.toLowerCase() === habilidadSelec && hab.nivelHabilidad >= nivelMinSelec) {
                //creo un nuevo div
                const item = document.createElement("div");

                //con este formato
                item.innerHTML = `<img src="img/${jug.nombreJugador.toLowerCase()}.jpg" class="imgFiltro">
                <div class="nivelFiltro">· Nivel: ${hab.nivelHabilidad} ·</div>`;
                //y lo añado al div que contiene los jugadores
                contenedorJug.appendChild(item);
            }
        });
    });

    //compruebo si hay algún filtro seleccionado para mostrar el título
    if (habilidadSelec !== "" || !isNaN(nivelMinSelec)) {
        //creo un titulo para el filtrado
        const titulo = document.createElement("div"); //crea un nuevo elemento de div para el título.
        titulo.classList.add('subTitulo-bg');
        titulo.innerHTML = `<h2>Jugadores con la habilidad <font>${habilidadSelec.toUpperCase()}</font> a un nivel igual o superior a <font>${nivelMinSelec}</font></h2>`;
        mostrarFiltro.appendChild(titulo);
    }

    //cierro el div que contiene los jugadores y lo añado al div que creé en html
    mostrarFiltro.appendChild(contenedorJug);

    //Al final decidí no devolver un array porque me quedaba el codigo más largo y con más variables, por lo que he ido mostrando la info a la vez que filtraba
    //return jugadoresFiltrados;

}

//con esta variable almaceno la posición original del div contenedor, para una implementación de mostrar la info de los jugadores que he hecho
let contenedorOriginalPosition = null;

//con este método abro una ventana emergente con la información de los jugadores. Es más compleja ya que mueve elementos de posición.
function mostrarInfo(nombreJugadorSelecc) {

    //selecciono el contenedor principal y el div para mostrar la información
    const contenedor = document.querySelector('.contenedor');
    const infoJugadores = document.getElementById('infoJugadores');

    //guardo la posición original del div
    if (!contenedorOriginalPosition) {
        contenedorOriginalPosition = contenedor.getBoundingClientRect();
    }

    //limpio el contenido del div de información
    infoJugadores.innerHTML = "";

    //creo el título de la información del jugador
    const tituloInfoJugador = document.createElement("h3");
    tituloInfoJugador.textContent = `${nombreJugadorSelecc}`;
    infoJugadores.appendChild(tituloInfoJugador);

    //aquí creo un boton para cerrar la ventana
    const botonCerrar = document.createElement("span");
    botonCerrar.textContent = "X";
    botonCerrar.className = "cerrar";
    botonCerrar.addEventListener("click", function () {
        //oculto la ventana emergente al hacer clic en el botón de cierre
        infoJugadores.style.display = "none";
        //para restaurar la posición original del contenedor
        contenedor.style.marginLeft = contenedorOriginalPosition.left + "px";
    });
    infoJugadores.appendChild(botonCerrar); //añado el boton para cerrar

    //creo una variable que almacenará el resultado del filtro y lo mostrará en el div con ese id
    const mostrarInfo = document.getElementById("infoJugadores");

    //se recorre el array de jugadores para ir mostrando la información del que se haya seleccionado
    miJuego.listaJugadores.forEach(jug => {
        if (jug.nombreJugador === nombreJugadorSelecc) {
            jug.habilidadesJugador.forEach(hab => {
                //creo un nuevo div
                const item = document.createElement("div");
                //con este formato, lo hago con input de rango, me gustó la idea el otro día
                item.innerHTML = `
                    <h4>· ${hab.nombreHabilidad}: </h4>
                    <input type="range" name="rango" min="0" max="20" value="${hab.nivelHabilidad}">
                    <span>${hab.nivelHabilidad}</span>`;

                ////PARA ACTUALIZAR LA INFO EN TIEMPO REAL EN EL INPUT Y JUGADOR
                //esto selecciona el control deslizante
                const inputRange = item.querySelector("input[type='range']");
                //aqui tomamos el valor del span
                const spanValue = item.querySelector("span");

                //agregamos un listener por si el usuario cambia el valor
                inputRange.addEventListener("input", function () {
                    //si se cambia se actualiza el valor mostrado del span
                    spanValue.textContent = inputRange.value;

                    //y actualizamos el nivel del jugador
                    hab.nivelHabilidad = parseInt(inputRange.value);
                });

                //y lo añado al div que contiene los jugadores
                mostrarInfo.appendChild(item);

                //para desplazar el contenedor principal hacia la izquierda y dejar sitio a las habilidades
                contenedor.style.marginLeft = '23em';
            });


        }

    });

    //para mostrar la ventana de información con retraso de 350 milisegundos
    setTimeout(() => {
        infoJugadores.style.display = "block";
    }, 350); // 1000 milisegundos = 1 segundo

}

//metodo para cerra la ventana emergente y devolver el contenedor principal a su sitio de origen
function cerrarInfo() {
    //devuelvo a la posición original el div contenedor
    const contenedor = document.querySelector('.contenedor');
    if (contenedorOriginalPosition) {
        //const marginLeft = contenedorOriginalPosition.left + 'px';
        contenedor.style.marginLeft = '0';
    }

    //se limpia el contenido del div de información
    const infoJugadores = document.getElementById('infoJugadores');
    infoJugadores.innerHTML = '';

    //restablece la posición original a null para futuros usos
    contenedorOriginalPosition = null;
}


//   -->   MAIN   <--   //
//instancio el juego
const miJuego = new Juego();

//creo los jugadores y habilidades
miJuego.crearJugadores();

//actualizo los selectores
miJuego.actualizarSelectores();

//LISTENER --> cuando hacemos click en el boton aplicar filtro, llamamos a la función y le pasamos el array de jugadores
document.getElementById("aplicarFiltro").addEventListener("click", () => {
    filtrarJugadores(miJuego.listaJugadores); // Llama al método para listar todos los estudiantes y sus cursos.

});

//CÓDIGO QUE ME PERMITE USAR LOS JUGADORES COMO BOTONES CON EVENTOS
//cojo todos los div de la clase caracter y los guardo en un array
const botonesMostrarInfo = document.getElementsByClassName("jugador");

//recorro el array de botones (jugadores)
for (let boton of botonesMostrarInfo) {

    //LISTENER --> cuando hacemos click sobre un personaje vemos sus datos
    boton.addEventListener("click", () => {

        //cojo el nombre del jugador del 'botón' en el que estoy
        const nombreJugadorSelecc = boton.querySelector(".name").textContent;

        //llamo al metodo para mostrar la información
        mostrarInfo(nombreJugadorSelecc);
    });
}


