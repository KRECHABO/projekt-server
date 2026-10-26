const path = require('path');
const express = require('express');
const app = express();
const PORT = 3001;

// 1. Serwowanie plików statycznych (css, zdjęcia) z folderu public:
app.use(express.static('public'));

// 2. Obsługa strony głównej (skierowana do public/index.html):
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. Uruchomienie serwera:
app.listen(PORT, () => {
    console.log(`Server dziala na http://localhost:${PORT}`);
});