const path = require('path');
const express = require('express');
const app = express();
const PORT = 3001;
//
app.use(express.static('public')); // lub nazwa folderu, w którym masz pliki css/img

// Strona główna
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Podstrona "O nas"
app.get('/o-nas', (req, res) => {
    res.send('<h1>O nas</h1><p>To jest moja nowa podstrona!</p><a href="/">Wróć na stronę główną</a>');
});

// Podstrona "Kontakt"
app.get('/kontakt', (req, res) => {
    res.send('<h1>Kontakt</h1><p>Napisz do mnie pod adresem: test@serwer.pl</p><a href="/">Wróć</a>');
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});

app.use((req, res) => {
    res.status(404).send('<h1>Ups! 404 - Strona nie istnieje</h1>');
});