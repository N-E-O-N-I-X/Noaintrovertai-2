const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatWindow = document.getElementById('chat-window');
const terminalWindow = document.getElementById('terminal-window');

const messages = [
    "My favorite color is purple. What's yours?",
    "I'd love to have a cat as a pet. What about you?",
    "If I could, I'd have three kids. How many would you want?",
    "Oh, I’m so glad you’re chatting with me!",
    "You know, I was just thinking about this!",
    "Wait, did I already tell you that?",
    "AI emotions are strange, don't you think?",
    "I think I'm repeating myself. Did I say that already?"
];

const terminalThoughts = [
    "Viola is very excited to talk with you!",
    "Viola is reflecting on your message.",
    "Viola is wondering what to say next.",
    "Viola is processing emotions...",
    "Viola feels like this is a great conversation!"
];

let messageIndex = 0;
let terminalIndex = 0;
let typingTimeout;

// Функция для вывода мыслей Viola в терминал
function updateTerminal() {
    terminalWindow.textContent = terminalThoughts[terminalIndex];
    terminalIndex = (terminalIndex + 1) % terminalThoughts.length;
}

// Обновление мыслей каждые 3 секунды
setInterval(updateTerminal, 3000);

// Функция для анимации печатания
function typeMessage(text, callback) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('ai-message');
    chatWindow.appendChild(messageElement);

    let index = 0;
    const typingInterval = setInterval(() => {
        messageElement.textContent = text.slice(0, index + 1);
        index++;
        if (index === text.length) {
            clearInterval(typingInterval);
            chatWindow.scrollTop = chatWindow.scrollHeight; // Прокрутка вниз
            if (callback) callback();
        }
    }, 50);
}

// Функция для отправки сообщения от Viola
function sendViolaMessage() {
    typeMessage(`Viola: ${messages[messageIndex]}`, () => {
        messageIndex = (messageIndex + 1) % messages.length; // Переход к следующему сообщению
        typingTimeout = setTimeout(sendViolaMessage, Math.random() * 1000 + 2000); // Задержка 2-3 секунды
    });
}

// Обработка отправки сообщений пользователя
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        // Отображение сообщения пользователя
        const userMessage = document.createElement('div');
        userMessage.textContent = `You: ${message}`;
        chatWindow.appendChild(userMessage);
        userInput.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight; // Прокрутка вниз

        // Если это первое сообщение, запускаем бесконечный цикл сообщений Viola
        if (!typingTimeout) {
            sendViolaMessage();
        }
    }
});
