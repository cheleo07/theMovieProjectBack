const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "theMovieDb"; // Nom de votre base de données

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log("Connexion réussie à MongoDB ✅");
        return client.db(dbName);
    } catch (error) {
        console.error("Erreur de connexion à MongoDB ❌ :", error);
        process.exit(1); // Quitter l'application en cas d'erreur critique
    }
}

module.exports = connectDB();
