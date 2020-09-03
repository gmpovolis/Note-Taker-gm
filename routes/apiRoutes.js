const path = require("path");
const fs = require("fs");
const { v1: uuidv1 } = require("uuid");
const indexData = require("../db/db.json");

module.exports = function(app){

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });
    
    app.post("/api/notes", function(req, res){
        const data = fs.readFileSync(path.join(__dirname, "../db/db.json"));
        const parseData = JSON.parse(data);
        parseData.push(newNote);

        const output = JSON.stringify(parseData, null, 2);

        fs.writeFile(path.join(__dirname, "../db/db.json"), output, function(err){
            if (err) throw err;
        });

        res.json(output).status(201);
    });
    
    app.delete("/api/notes/:id", function(req, res){
        const data = fs.readFileSync(path.join(__dirname, "../db/db.json"));
        const parseData = JSON.parse(data);
        console.log("param id", req.params.id);

        const filterData = parseData.filter((notes) => notes.id !== req.params.id);

        const output = JSON.stringify(filterData, null, 2);
        fs.writeFile(path.join(__dirname, "../db/db.json"), output, function(err){
            if (err) throw err;
        });

        res.status(200).json(output);
    }); 
};



