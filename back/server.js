const express = require("express");
const path = require("path");
const app = express();
const discos = require("./discos.json");

const PORT = 3034;
const index = path.join(__dirname, "../public", "index.html");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(index);
});

app.get("/discos", (req, res) => {
  let titulo = req.query.titulo;
  let artistas = req.query.artista;
  let lanzamiento = req.query.lanzamiento;
  let array = [];
  
  discos.discos.forEach((element) => {
    let artistaLowerCase = element.artista.toLowerCase();
    let tituloLowerCase = element.titulo.toLowerCase();
    let lanzamientoString = element.lanzamiento.toString();


    if (artistas && lanzamiento) {
      if (
        lanzamientoString.includes(lanzamiento.toString()) &&
        artistaLowerCase.includes(artistas.toString().toLowerCase())
      ) {
        return array.push(element);
      }
    }
    
    if (artistas) {
      if (artistaLowerCase.includes(artistas.toString().toLowerCase())) {
        return array.push(element);
      }
    }
    if (titulo) {
      if (tituloLowerCase.includes(titulo.toString().toLocaleLowerCase())) {
        return array.push(element);
      }
    }
    if (lanzamiento) {
      if (lanzamientoString.includes(lanzamiento.toString())) {
        return array.push(element);
      }
    }

  });
  res.json(array);

  // res.send(discos.discos);

  // res.json(discos);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is up and listening on PORT:", PORT);
});
