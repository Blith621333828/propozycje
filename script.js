// Po stronie serwera (Node.js z użyciem Socket.IO)
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Nowe połączenie WebSocket');

    socket.on('newPost', (postData) => {
        // Przetwarzanie nowego wpisu, np. zapis do bazy danych

        // Wysłanie nowego wpisu do wszystkich podłączonych klientów
        io.emit('updatePosts', postData);
    });
});

// Po stronie klienta (JavaScript w przeglądarce)
const socket = io();

socket.on('updatePosts', (postData) => {
    console.log('Nowy wpis otrzymany:', postData);

    // Tutaj można zaktualizować widok strony (np. dodanie nowego wpisu do listy)
    displayNewPost(postData);
});

function addPost() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (name && message) {
        const timestamp = new Date().toLocaleString();
        const post = { name, message, timestamp };

        // Wysyłanie nowego wpisu do serwera za pomocą WebSocket
        socket.emit('newPost', post);

        // Czyszczenie formularza
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Proszę wypełnić wszystkie pola');
    }
}

function displayNewPost(postData) {
    const postsContainer = document.getElementById('posts');

    const postContainer = document.createElement('div');
    postContainer.classList.add('post');

    // Tworzenie elementów wpisu na podstawie postData i dodanie do postsContainer
    // ...

    postsContainer.appendChild(postContainer);
}
