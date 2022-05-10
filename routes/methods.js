function createCollection(db){
    if(db.getCollection("Films").exists != null){
        db.createCollection("customers", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            client.close();
          });
    }
    console.log("Collection already exist!");
}

function insertMovies(movies){
    movies.insertMany([
        { name: 'Web Design' },
        { name: 'Distributed Database' },
        { name: 'Artificial Intelligence' }
    ], (err, results) => {
    });
}

function insertMovie(movies, movieName){
    movies.insertOne({ name: movieName }, (err, result) => { console.log(result); });
}

function getMovies(movies){
    movies.find().toArray((err, results) => {
        console.log(results);
    });
}

function updateMovie(movies, movieName, newMovieName){
    movies.updateOne({ name: movieName }, { $set: { name: newMovieName } },
    (err, result) => {
        console.log(result);
    });
}

function findMovie(movies, movieName){
    movies.find({ name: movieName }).toArray((err, result) => {
        console.log(result);
    });
}

module.exports = { insertMovies, getMovies, findMovie, updateMovie, insertMovie, createCollection };