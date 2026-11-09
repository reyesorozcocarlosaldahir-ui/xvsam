/* =====================================================
   GALA CHARRA IMPERIAL
   XV AÑOS DE MARIA SAMYRETH JARAMILLO OROZCO

   JAVASCRIPT COMPLETO
   CELEBRACIÓN DE DÍA
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     01. CONFIGURACIÓN GENERAL
  =================================================== */

  // Cuando configuremos Google Sheets,
  // colocaremos aquí la URL de Google Apps Script.
  //
  // Por ahora, el formulario utilizará WhatsApp.

  
const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbxmsx_YgYKe6jBpCVep7iQoqrG8bV1-GEYjG4I1dwQhHmV3N-yhT1zBSZAhHMhrkuLzOA/exec";


  const TELEFONO_WHATSAPP = "525545637772";

  const FECHA_EVENTO =
    "2026-11-28T13:00:00-06:00";

  const $ = (id) => document.getElementById(id);

  const movimientoReducido =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  /* ===================================================
     02. ELEMENTOS PRINCIPALES
  =================================================== */

  const bienvenida = $("bienvenida");

  const abrirSobre = $("abrirSobre");

  const invitacion = $("invitacion");

  const portada = document.querySelector(".portada");

  const musica = $("musica");

  const botonMusica = $("botonMusica");

  const imagenQuinceanera = $("imagenQuinceanera");

  const ilustracionFallback = $("ilustracionFallback");

  let invitacionAbierta = false;

  /* ===================================================
     03. ABRIR SOBRE
  =================================================== */

  function mostrarInvitacion() {

    // Mostrar toda la invitación.
    invitacion.hidden = false;

    // Permitir desplazarse por la página.
    document.body.classList.remove("bloqueado");

    // Comenzar en la portada.
    window.scrollTo(0, 0);

    // Desvanecer el sobre de bienvenida.
    bienvenida.classList.add("desaparecer");

    // Mostrar el botón de música.
    botonMusica.hidden = false;

    // Activar la presentación de la silueta.
    window.requestAnimationFrame(() => {

      window.requestAnimationFrame(() => {

        portada.classList.add("revelada");

      });

    });

    // Retirar el sobre al terminar la transición.
    window.setTimeout(() => {

      bienvenida.hidden = true;

    }, movimientoReducido ? 30 : 1100);

  }

  abrirSobre.addEventListener("click", () => {

    // Evitar que la invitación se abra varias veces.
    if (invitacionAbierta) return;

    invitacionAbierta = true;

    // Impedir varios clics sobre el sobre.
    abrirSobre.disabled = true;

    // Iniciar efecto de apertura.
    abrirSobre.classList.add("abierto");

   
    // Reproducir música desde el toque del usuario.
    musica.muted = false;
    musica.volume = 0.35;

    const intentoMusica = musica.play();

    if (intentoMusica) {
      intentoMusica.catch((error) => {
        console.warn("Safari bloqueó la música:", error);
        botonMusica.hidden = false;
        botonMusica.textContent = "▶";
        botonMusica.title = "Toca para escuchar música";
      });
    }


    // Esperar la animación del sobre.
    const tiempoApertura =
      movimientoReducido ? 100 : 1700;

    window.setTimeout(
      mostrarInvitacion,
      tiempoApertura
    );

  });

  /* ===================================================
     04. MÚSICA DE FONDO
  =================================================== */

  function actualizarBotonMusica() {

    if (musica.paused) {

      botonMusica.textContent = "♪";

      botonMusica.title = "Reproducir música";

      botonMusica.setAttribute(
        "aria-label",
        "Reproducir música"
      );

    } else {

      botonMusica.textContent = "♫";

      botonMusica.title = "Pausar música";

      botonMusica.setAttribute(
        "aria-label",
        "Pausar música"
      );

    }

  }

  function iniciarMusica() {

    // Volumen al 35 %.
    musica.volume = 0.35;

    try {

      const reproduccion = musica.play();

      // La invitación continuará aunque el
      // navegador no permita reproducir el audio.
      if (
        reproduccion &&
        typeof reproduccion.catch === "function"
      ) {

        reproduccion.catch((error) => {

          console.info(
            "La invitación continuará sin música.",
            error
          );

          actualizarBotonMusica();

        });

      }

    } catch (error) {

      console.info(
        "No se pudo iniciar la música.",
        error
      );

    }

  }

  botonMusica.addEventListener("click", () => {

    if (musica.paused) {

      iniciarMusica();

    } else {

      musica.pause();

    }

    actualizarBotonMusica();

  });

  musica.addEventListener(
    "play",
    actualizarBotonMusica
  );

  musica.addEventListener(
    "pause",
    actualizarBotonMusica
  );

  musica.addEventListener(
    "ended",
    actualizarBotonMusica
  );

  actualizarBotonMusica();

  /* ===================================================
     05. SILUETA DE LA QUINCEAÑERA
  =================================================== */

  function mostrarIlustracionAlternativa() {

    // Si no se encuentra el archivo SVG,
    // se mostrará el monograma XV.

    if (imagenQuinceanera) {

      imagenQuinceanera.hidden = true;

    }

    if (ilustracionFallback) {

      ilustracionFallback.hidden = false;

    }

  }

  if (imagenQuinceanera) {

    imagenQuinceanera.addEventListener(
      "error",
      mostrarIlustracionAlternativa
    );

    // Comprobar si la imagen ya falló al cargar.
    if (
      imagenQuinceanera.complete &&
      imagenQuinceanera.naturalWidth === 0
    ) {

      mostrarIlustracionAlternativa();

    }

  }

  /* ===================================================
     06. CUENTA REGRESIVA
  =================================================== */

  const fechaEvento =
    new Date(FECHA_EVENTO).getTime();

  const elementoDias = $("dias");

  const elementoHoras = $("horas");

  const elementoMinutos = $("minutos");

  const elementoSegundos = $("segundos");

  function formatoNumero(numero) {

    return String(numero).padStart(2, "0");

  }

  function actualizarCuentaRegresiva() {

    // Calcular el tiempo restante.
    const diferencia = Math.max(
      0,
      fechaEvento - Date.now()
    );

    const dias = Math.floor(
      diferencia / 86400000
    );

    const horas = Math.floor(
      (diferencia / 3600000) % 24
    );

    const minutos = Math.floor(
      (diferencia / 60000) % 60
    );

    const segundos = Math.floor(
      (diferencia / 1000) % 60
    );

    // Mostrar valores en pantalla.
    if (elementoDias) {

      elementoDias.textContent =
        formatoNumero(dias);

    }

    if (elementoHoras) {

      elementoHoras.textContent =
        formatoNumero(horas);

    }

    if (elementoMinutos) {

      elementoMinutos.textContent =
        formatoNumero(minutos);

    }

    if (elementoSegundos) {

      elementoSegundos.textContent =
        formatoNumero(segundos);

    }

  }

  // Calcular inmediatamente.
  actualizarCuentaRegresiva();

  // Actualizar cada segundo.
  window.setInterval(
    actualizarCuentaRegresiva,
    1000
  );

  /* ===================================================
     07. ANIMACIONES AL DESPLAZARSE
  =================================================== */

  const elementosParaRevelar =
    document.querySelectorAll(".revelar");

  function revelarTodos() {

    elementosParaRevelar.forEach((elemento) => {

      elemento.classList.add("visible");

    });

  }

  if (
    movimientoReducido ||
    !("IntersectionObserver" in window)
  ) {

    revelarTodos();

  } else {

    const observador = new IntersectionObserver(

      (entradas, instancia) => {

        entradas.forEach((entrada) => {

          if (entrada.isIntersecting) {

            entrada.target.classList.add(
              "visible"
            );

            instancia.unobserve(
              entrada.target
            );

          }

        });

      },

      {
        root: null,
        rootMargin: "0px 0px 50px 0px",
        threshold: 0.08
      }

    );

    elementosParaRevelar.forEach((elemento) => {

      observador.observe(elemento);

    });

  }

  /* ===================================================
     08. ELEMENTOS DEL FORMULARIO
  =================================================== */

  const formulario =
    $("formularioAsistencia");

  const nombreInvitado =
    $("nombreInvitado");

  const cantidadPersonas =
    $("cantidadPersonas");

  const campoPersonas =
    $("campoPersonas");

  const telefonoInvitado =
    $("telefonoInvitado");

  const enviarAsistencia =
    $("enviarAsistencia");

  const estadoConfirmacion =
    $("estadoConfirmacion");

  const opcionesAsistencia =
    document.querySelectorAll(
      'input[name="asistencia"]'
    );

  /* ===================================================
     09. MOSTRAR U OCULTAR CANTIDAD DE PERSONAS
  =================================================== */

  function obtenerAsistencia() {

    const seleccionada =
      document.querySelector(
        'input[name="asistencia"]:checked'
      );

    return seleccionada
      ? seleccionada.value
      : "si";

  }

  function actualizarCampoPersonas() {

    const asistira =
      obtenerAsistencia() === "si";

    // Solo mostrar cantidad si asistirá.
    campoPersonas.hidden = !asistira;

    cantidadPersonas.required = asistira;

    cantidadPersonas.disabled = !asistira;

    if (!asistira) {

      cantidadPersonas.value = "";

    }

    limpiarEstado();

  }

  opcionesAsistencia.forEach((opcion) => {

    opcion.addEventListener(
      "change",
      actualizarCampoPersonas
    );

  });

  actualizarCampoPersonas();

  /* ===================================================
     10. MENSAJES DEL FORMULARIO
  =================================================== */

  function mostrarEstado(
    mensaje,
    tipo = ""
  ) {

    estadoConfirmacion.textContent = mensaje;

    estadoConfirmacion.classList.remove(
      "exito",
      "error"
    );

    if (tipo) {

      estadoConfirmacion.classList.add(tipo);

    }

  }

  function limpiarEstado() {

    mostrarEstado("");

  }

  /* ===================================================
     11. OBTENER DATOS DEL INVITADO
  =================================================== */

  function obtenerDatosFormulario() {

    const nombre =
      nombreInvitado.value.trim();

    const asistencia =
      obtenerAsistencia();

    const telefono =
      telefonoInvitado.value.trim();

    const personas =
      asistencia === "si"
        ? Number(cantidadPersonas.value)
        : 0;

    return {
      nombre,
      asistencia,
      personas,
      telefono
    };

  }

  /* ===================================================
     12. VALIDAR DATOS
  =================================================== */

  function validarDatos(datos) {

    if (datos.nombre.length < 2) {

      mostrarEstado(
        "Por favor, escribe tu nombre completo.",
        "error"
      );

      nombreInvitado.focus();

      return false;

    }

    if (datos.asistencia === "si") {

      if (
        !cantidadPersonas.value.trim() ||
        !Number.isInteger(datos.personas) ||
        datos.personas < 1 ||
        datos.personas > 999
      ) {

        mostrarEstado(
          "Escribe una cantidad válida de personas.",
          "error"
        );

        cantidadPersonas.focus();

        return false;

      }

    }

    return true;

  }

  /* ===================================================
     13. MENSAJE DE WHATSAPP
  =================================================== */

  function crearMensajeWhatsApp(datos) {

    let mensaje =
      "Hola, quiero confirmar mi respuesta " +
      "a los XV años de Maria Samyreth.\n\n";

    mensaje +=
      "Nombre: " + datos.nombre + "\n";

    if (datos.asistencia === "si") {

      mensaje +=
        "Asistencia: Sí asistiré\n";

      mensaje +=
        "Total de personas: " +
        datos.personas + "\n";

    } else {

      mensaje +=
        "Asistencia: No podré asistir\n";

      mensaje +=
        "Total de personas: 0\n";

    }

    if (datos.telefono) {

      mensaje +=
        "Teléfono: " +
        datos.telefono + "\n";

    }

    mensaje +=
      "\nGracias por la invitación.";

    return mensaje;

  }

  function abrirWhatsApp(datos) {

    const mensaje =
      crearMensajeWhatsApp(datos);

    const enlace =
      "https://wa.me/" +
      TELEFONO_WHATSAPP +
      "?text=" +
      encodeURIComponent(mensaje);

    // Abrir WhatsApp en la misma pestaña.
    window.location.href = enlace;

  }

  /* ===================================================
     14. PREPARAR CONEXIÓN A GOOGLE SHEETS
  =================================================== */

  async function guardarEnGoogleSheets(datos) {

    if (!URL_GOOGLE_SCRIPT) {

      return {
        configurado: false
      };

    }

    // Con no-cors la respuesta no se puede leer.
    // El envío NO demuestra que Google Sheets
    // haya registrado correctamente los datos.

    await fetch(URL_GOOGLE_SCRIPT, {

      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify(datos)

    });

    return {
      configurado: true,
      verificado: false
    };

  }

  /* ===================================================
     15. ENVIAR FORMULARIO
  =================================================== */

  let enviando = false;

  formulario.addEventListener(
    "submit",
    async (evento) => {

      evento.preventDefault();

      if (enviando) {
        return;
      }

      limpiarEstado();

      const datos =
        obtenerDatosFormulario();

      if (!validarDatos(datos)) {
        return;
      }

      enviando = true;

      enviarAsistencia.disabled = true;

      enviarAsistencia.textContent =
        "PROCESANDO CONFIRMACIÓN...";

      try {

        /* SI GOOGLE SHEETS AÚN NO ESTÁ
           CONFIGURADO, USAR WHATSAPP */

        if (!URL_GOOGLE_SCRIPT) {

          mostrarEstado(
            "Se abrirá WhatsApp. Envía el " +
            "mensaje para completar tu confirmación."
          );

          abrirWhatsApp(datos);

          return;

        }

        /* ENVIAR DATOS A GOOGLE SHEETS */

        const resultado =
          await guardarEnGoogleSheets(datos);

        if (
          resultado.configurado &&
          !resultado.verificado
        ) {

          mostrarEstado(
            "La solicitud se envió, pero " +
            "todavía no se puede verificar " +
            "automáticamente su registro. " +
            "Consulta Google Sheets."
          );

        }

      } catch (error) {

        console.error(
          "Error en el formulario:",
          error
        );

        mostrarEstado(
          "No fue posible enviar la " +
          "confirmación. Inténtalo nuevamente.",
          "error"
        );

      } finally {

        enviando = false;

        enviarAsistencia.disabled = false;

        enviarAsistencia.textContent =
          "CONFIRMAR ASISTENCIA";

      }

    }
  );

  /* ===================================================
     16. FINAL
  =================================================== */

  console.info(
    "Gala Charra Imperial: invitación preparada."
  );

});

/* =====================================================
   FIN DE SCRIPT.JS
===================================================== */
