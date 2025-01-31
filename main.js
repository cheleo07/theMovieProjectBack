const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbPromise = require("./db"); // Import de la connexion MongoDB

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Charger les routes après la connexion à la base de données
async function startServer() {
    try {
        await dbPromise; // Assurez-vous que la connexion est bien établie
        require("./routes/movies")(app); // Charger les routes
        const PORT = process.env.PORT || 3005;
        app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
    } catch (error) {
        console.error("Erreur lors du démarrage du serveur :", error);
        process.exit(1);
    }
}

startServer();
