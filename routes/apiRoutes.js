const db = require("../db/db.json");
const fs = require("fs");

module.exports = function(app){

    app.get("/api/notes", function(req, res) {
        res.json(db);
    });
    
    app.post("/api/notes", function(req, res){
        db.push(req.body);
        db.forEach((data, index) => {
            data.id = index + 1
        });
        fs.writeFile("./db/db.json", JSON.stringify(db), function() {
            res.json(db);
        });
    });
    
    app.delete("/api/notes/:id", function(req, res){
       const id = req.params.id;
       db.splice(id - 1, 1);
       db.forEach((data, index) => {
           data.id = index + 1;
       });
       fs.writeFile("./db/db.json", JSON.stringify(db), function() {
           res.json(db);
       });
    }); 
};