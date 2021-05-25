let cards = document.getElementById("cards");
const search = document.getElementById("search");

const xhr = new XMLHttpRequest();

search.addEventListener("click", () => {
  const artista = document.getElementById("artista").value;
  const titulo = document.getElementById("titulo").value;
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

  if (artista !== "") {
     xhr.open("GET", `/discos?artista=${artista}`);
  }

  if (titulo !== "") {
     xhr.open("GET", `/discos?titulo=${titulo}`);
  }

  if (lanzamiento !== "") {
    xhr.open("GET", `/discos?lanzamiento=${lanzamiento}`);
 }

 if (lanzamiento !== ""&& artista !=='') {
  xhr.open("GET", `/discos?artista=${artista}&lanzamiento=${lanzamiento}`);
}

  xhr.send();
});

