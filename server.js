const express = require("express");
const path = require("path");
const app = express();
const todosRouter = require("./src/routes");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        return res.status(200).json({})
    } 
    next();   
});

app.use("/api/v1", todosRouter);

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
