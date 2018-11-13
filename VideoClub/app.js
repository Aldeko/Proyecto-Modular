// Automatic Slideshow - change image every 3 seconds
let myIndex = 0;
let mySlides = document.getElementById("mySlides");
    if(mySlides=== null)
        carousel();

function carousel() {
    
    let x = document.getElementsByClassName("mySlides");
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 3000);
}

function obtainData() {
    let xhr = new XMLHttpRequest();
    let title = document.getElementById("title").value;
    let url = "http://www.omdbapi.com/?apikey=ba44a12d&s=" + title;
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        let responseObject;
        if (xhr.readyState === 4 && xhr.status === 200) {
           responseObject = JSON.parse(xhr.response);
            //if (responseObject.search.length === false) {
            //    alert("Escribe mas vago");
            //}

            for (let j = 0; j < responseObject.Search.length; j++) {
                

                let pelicula = responseObject.Search[j];
                let parrafo = document.createElement("p");
                let textoParrafo = document.createTextNode(pelicula.Title + " - " + pelicula.Year);
                parrafo.appendChild(textoParrafo);
                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.addEventListener("click", function () {
                    save(pelicula.Title, pelicula.Year);
                });
                parrafo.appendChild(checkbox);

                document.getElementById("info").appendChild(parrafo);
                
            }
            
            
            
        } else if (xhr.readyState === 4 && xhr.status === 400) {
            document.getElementById("info").innerHTML = "titulo incorrecta";
        }
    };
    xhr.send();
}



function save(title, year) {
    let peliculas;
    if (localStorage.getItem("peliculas") !== null) {
        peliculas = JSON.parse(localStorage.getItem("peliculas"));
    } else {
        peliculas = [];
    }
    peliculas.push({ title: title, year: year });
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}
