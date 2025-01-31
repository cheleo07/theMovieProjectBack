const dbPromise = require("./db");

async function testDB() {
    try {
        const db = await dbPromise;
        console.log("Connexion réussie à la base de données :", db.databaseName);
        const collections = await db.listCollections().toArray();
        console.log("Collections disponibles :", collections.map(c => c.name));
    } catch (error) {
        console.error("Erreur de connexion :", error);
    }
}

testDB();
