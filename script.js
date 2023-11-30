function seleccionarPlan(planId) {
    // Simplemente mostramos un mensaje en la consola por ahora
    console.log(`Plan seleccionado: ${planId}`);
    // Aquí podrías agregar lógica adicional, como enviar el plan seleccionado a un servidor, etc.
}

// Añadir un evento de escucha al evento 'scroll'
window.addEventListener('scroll', function() {
    // Obtener la posición actual de desplazamiento vertical
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Obtener el botón de volver arriba
    var btnVolverArriba = document.getElementById('btnVolverArriba');

    // Mostrar u ocultar el botón según la posición de desplazamiento
    if (scrollPosition > 200) { // Puedes ajustar este valor según tus preferencias
        btnVolverArriba.style.display = 'block';
    } else {
        btnVolverArriba.style.display = 'none';
    }
});

// Función para volver arriba al hacer clic en el botón
function volverArriba() {
    document.body.scrollTop = 0; // Para navegadores antiguos
    document.documentElement.scrollTop = 0; // Para navegadores modernos
}
const apiKey = 'OPENAI_KEY'; // Reemplaza con tu clave de API
const gpt3 = new OpenAIAPI(apiKey);

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.classList.toggle('hidden');
}

function cerrarChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.classList.add('hidden');
}
function agregarMensajeAlChat(emisor, mensaje) {
    const chatLog = document.getElementById('chat-log');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add(emisor === 'usuario' ? 'user-message' : 'bot-message');
    mensajeDiv.textContent = `${emisor}: ${mensaje}`;
    chatLog.appendChild(mensajeDiv);

    // Hacer scroll hacia abajo para mostrar el último mensaje
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function enviarMensajeUsuario() {
    const userMessageInput = document.getElementById('user-message');
    const mensajeUsuario = userMessageInput.value;

    if (mensajeUsuario.trim() === '') {
        return;
    }

    agregarMensajeAlChat('usuario', mensajeUsuario);
    userMessageInput.value = ''; // Limpiar el campo de entrada

    // Enviar el mensaje del usuario al chatbot
    const respuestaChatbot = await gpt3.complete({
        engine: 'text-davinci-003',
        prompt: mensajeUsuario,
        max_tokens: 150,
    });

    const respuestaTexto = respuestaChatbot.choices[0].text;
    agregarMensajeAlChat('bot', respuestaTexto);
}

// Iniciar el chat con un saludo
agregarMensajeAlChat('bot', '¡Hola! Soy el chatbot de Micenia Digital. ¿En qué puedo ayudarte?');
