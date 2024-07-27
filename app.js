const socket = io('ws://localhost:3500');

function sendMessage(event) {
    event.preventDefault();
    const messageInput = document.querySelector('input');
    if (messageInput.value.trim()) {
        socket.emit('message', socket.id.substr(0,5)+':'+messageInput.value);
        messageInput.value = "";
    }
    messageInput.focus();
}

document.querySelector('form').addEventListener('submit', sendMessage);

socket.on("message", (message) => {
    const messageList = document.querySelector('ul');
    const listItem = document.createElement('li');
    listItem.textContent = message;
    messageList.appendChild(listItem);
});

// Optional: Add error handling
socket.on('connect_error', (err) => {
    console.error('Connection Error:', err.message);
});

socket.on('error', (err) => {
    console.error('Error:', err.message);
});
