const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const api = require('../api_key.js');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var url = "mongodb://localhost:27017/";

module.exports = (app) => {

    app.get('/api/discover/movie/:page', async (req, res) => {
        let page = req.params.page;

        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key='+ api +'&language=fr-FR&page='+ page,
            {   method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
        const data = await response.json();
        return res.status(200).send(JSON.stringify(data));
    });

    // Point d'api qui sert à liker un film
    app.put('/api/like/:idMovie', async (req, res) => {
        let idMovie = req.params.idMovie; // id du film dans l'api de the movie db

        // retour de la requête
        let new_data = {
            "name": "",
            "id_mdb" : idMovie,
            "nb_likes" : 0
        };

        MongoClient.connect(url, function(err, db) {
            if (err) {
                // Il y a eu une erreur de connexion à mongodb
                db.close();
                return res.status(500).send(JSON.stringify(err));
            } else {
                var dbo = db.db("theMovieDb");
                // On recherche dans la base de données locale, un film ayant pour id_mdb, celui sélectionné
                dbo.collection("Films").findOne({id_mdb: idMovie}, function(err, result) {
                    if (err) {
                        // Il y a eu une erreur de recherche
                        db.close();
                        return res.status(500).send(JSON.stringify(err));
                    } else {
                        if(result == null){ // Si le film liké n'est pas encore dans notre base de données locale

                            // on récupère le nom du film
                            getMovieFromApi(idMovie, function(movieName){
                                var myobj = { name: movieName, id_mdb: idMovie, nb_likes: 1 };
                                // on insère dans la table, une nouvelle ligne avec l'id du film dans themoviedb, son nom et un compteur de likes à 1
                                dbo.collection("Films").insertOne(myobj, function(err, resultat2) {
                                    if (err) throw err;
                                    // console.log("1 document inserted");
                                    new_data.nb_likes = 1;
                                    new_data.name = movieName;
                                    db.close();
                                    return res.status(200).send(JSON.stringify(new_data));
                                });
                            })
                        } else {
                            // le film est déjà dans notre base de données locale donc on incrémente son compteur de likes
                            var myquery = { id_mdb: idMovie };
                            var old_nb_likes = result.nb_likes;
                            var new_nb_likes = { $set: {nb_likes: old_nb_likes + 1 } };
                            new_data.nb_likes = old_nb_likes + 1;
                            dbo.collection("Films").updateOne(myquery, new_nb_likes, function(err, resultat2) {
                                if (err) throw err;
                                console.log("1 document updated");
                                new_data.name = result.name;
                                db.close();
                                return res.status(200).send(JSON.stringify(new_data));
                            });
                        }
                    }

                });
            }

        });
    });
}

// Fonction servant à récupérer le nom d'un film dans l'api de themoviedb à partir de son id
async function getMovieFromApi(idMovie, callback){
    const response = await fetch('https://api.themoviedb.org/3/movie/'+idMovie+'?api_key='+ api +'&language=fr-FR',
        {   method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    const data = await response.json();
    callback(data.original_title)
}