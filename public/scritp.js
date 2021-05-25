let cards = document.getElementById("cards");
const search = document.getElementById("search");

const xhr = new XMLHttpRequest();

search.addEventListener("click", () => {
  // @ts-ignore
  const artista = document.getElementById("artista").value;
  // @ts-ignore
  const titulo = document.getElementById("titulo").value;
  // @ts-ignore
  const lanzamiento = document.getElementById("lanzamiento").value;

  xhr.addEventListener("load", () => {
    cards.innerHTML = "";
    const response = JSON.parse(xhr.responseText);

    response.forEach((element) => {
      cards.innerHTML += `<div class="card col-4" style="width: 18rem; margin-left:10px; margin-top: 10px">
        <img src="${element.tapa}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${element.artista}</h5>
        <h6 class="card-title">${element.titulo}</h6>
        <p class="card-text">Lanzamiento: ${element.lanzamiento}</p>        
        </div>
        </div>`;
    });
  });

  let filtros = "";

  if (artista) {
    filtros += (filtros ? "&" : "") + `artista=${artista}`;
  }
  if (titulo) {
    filtros += (filtros ? "&" : "") + `titulo=${titulo}`;
  }
  if (lanzamiento) {
    filtros += (filtros ? "&" : "") + `lanzamiento=${lanzamiento}`;
  }
  xhr.open("GET", `/discos?${filtros}`);
  xhr.send();
});
