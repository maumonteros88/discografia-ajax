const express = require("express");
const { parse } = require("path");
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
  let titulos = req.query.titulo;
  let artistas = req.query.artista;
  let lanzamientos = req.query.lanzamiento;
  let resultado = discos.discos;

  if (artistas) {
    resultado = resultado.filter((element) =>
      element.artista
        .toLocaleLowerCase()
        .includes(artistas.toString().toLocaleLowerCase())
    );
  }

  if (titulos) {
    resultado = resultado.filter((element) =>
      element.titulo
        .toLocaleLowerCase()
        .includes(titulos.toString().toLocaleLowerCase())
    );
  }

  if (lanzamientos) {
    resultado = resultado.filter(
      (element) => element.lanzamiento.toString() === lanzamientos
    );
  }

  if (artistas && lanzamientos) {
    resultado = resultado.filter(
      (element) =>
        element.lanzamiento.toString() === lanzamientos &&
        element.artista
          .toLocaleLowerCase()
          .includes(artistas.toString().toLocaleLowerCase())
    );
  }

  if (titulos && lanzamientos) {
    resultado = resultado.filter(
      (element) =>
        element.lanzamiento.toString() === lanzamientos &&
        element.titulo
          .toLocaleLowerCase()
          .includes(titulos.toString().toLocaleLowerCase())
    );
  }

  if (titulos && lanzamientos && artistas) {
    resultado = resultado.filter(
      (element) =>
        element.lanzamiento.toString() === lanzamientos &&
        element.titulo
          .toLocaleLowerCase()
          .includes(titulos.toString().toLocaleLowerCase()) &&
        element.artista
          .toLocaleLowerCase()
          .includes(artistas.toString().toLocaleLowerCase())
    );
  }

  res.json(resultado);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is up and listening on PORT:", PORT);
});
