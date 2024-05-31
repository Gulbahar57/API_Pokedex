var tabMapType = new Map();
var tabMapTypeEntries = []
let count = 0
let DivPage2 = []
let daata;
let tab1 = []
let tab2 = []

fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
    .then(response => response.json())
    .then(data => {            
        daata = data
        choice(daata)  
        calculPourcent(daata)  
         
    });
// Sélectionner l'élément de saisie de recherche
const searchInput = document.getElementById('searchInput');

// Ajouter un gestionnaire d'événements pour l'événement d'entrée de texte
searchInput.addEventListener('input', function() {
    const searchValue = searchInput.value.toLowerCase(); // Récupérer la valeur de la recherche et la convertir en minuscules

    // Sélectionner tous les éléments de la classe "pokemon" (les div contenant les informations sur les Pokémon)
    const pokemons = document.querySelectorAll('.pokemon');

    // Parcourir tous les éléments Pokémon
    pokemons.forEach(pokemon => {
        const pokemonName = pokemon.querySelector('h2').textContent.toLowerCase(); // Récupérer le nom du Pokémon

        // Vérifier si le nom du Pokémon contient la valeur de recherche
        if (pokemonName.includes(searchValue)) {
            // Afficher le Pokémon si le nom correspond à la recherche
            pokemon.style.display = 'block';
        } else {
            // Masquer le Pokémon si le nom ne correspond pas à la recherche
            pokemon.style.display = 'none';
        }

    });
});    

//fonction qui sélectionne 9 pokemons, les stockent dans le tableau DivPage2 
//et incrémente count puis appelle la fonction affichage pour les données de DivPage2
function choice(data){
        let DivPage2 = []
        let n= count+9
        for (count; count<n; count++){             
            DivPage2.push(data[count])      
        }  
        // if(getComputedStyle(document.getElementById("chartContainer")).display != "none"){
        //   document.getElementById("chartContainer").style.display = "none";
        // } else {
        //   document.getElementById("chartContainer").style.display = "block";
        // }
        affichage(DivPage2)

        if (count >= daata.length) {
          document.getElementById("boutonNext").style.display = "none"; // Masquer le bouton
        }
        document.getElementById("buttonAll").addEventListener("click", function () { //ici on viens chrcher l'élement buttonAll et on ajoute à cela un écouteur d'évènement, c'est à dire
          // que dès que quelqu'un va cliquer sur le bouton All ça va éxecuter la fonction. 
          // Masquer le bouton "Charger d'autres Pokémons"
          document.getElementById("boutonNext").style.display = "none"; //ici on récupère l'ID boutonNext et on le masque en fonction de ce qu'on a paramétré au dessus.
      
          // Autres actions à effectuer lorsque "All" est sélectionné
        });
       
        
    }

//fonction qui affiche tous les pokemons (image/nom/types) de x dans la page web
function affichage(x) {
  x.forEach(pokemon => {
    //on veut afficher le resultat dans la page web
    const Div = document.createElement("div");
    Div.classList.add("pokemon");
    Div.innerHTML = `
            <center><img class="image" src="${pokemon.image}" /></center>
                <h2><center>${pokemon.name}</center></h2>
                <p id="type"><center>
                ${pokemon.apiTypes.map(type => `<span class="${type.name.toLowerCase()}">${type.name}</span> `).join('')} 
                </center></p>
            `;

    // Ajouter un gestionnaire d'événements de clic à l'élément div
    Div.addEventListener("click", () => {
      // Rediriger vers la page de détails du Pokémon
      window.location.href = `api1.html?id=${pokemon.id}`;
    });

        //va chercher tout ce qu'il y a dans Div et mets dans allPokemons
        document.getElementById("allPokemons").appendChild(Div);
        
    })
}

function triType(type,y){
  let typeTab = []
 
y.forEach(pokemon => {
  pokemon.apiTypes.forEach(pokemonType => {
      if (type === pokemonType.name) {
          typeTab.push(pokemon);
      }
  });
});
    console.log("typetab ", typeTab)
    console.log("type ", type)
    document.getElementById("allPokemons").innerHTML = ""
    affichage(typeTab)
}

function calculPourcent(data){ 
  
// tabMapType = new Map();
let type = ["Poison", "Plante", "Feu", "Eau", "Insecte", "Normal", "Vol", "Électrik", "Sol", "Fée", "Combat", "Psy", "Roche", "Acier", "Glace", "Spectre"]

// Initialiser le compteur pour chaque type à zéro
for (let i = 0; i < type.length; i++) {
  tabMapType.set(type[i], 0);
}

// Itérer à travers chaque Pokémon et chaque type de Pokémon pour compter
data.forEach(pokemon => {
  pokemon.apiTypes.forEach(pokemonType => {
      // Incrémenter le compteur pour le type de Pokémon actuel
      let currentCount = tabMapType.get(pokemonType.name);
      tabMapType.set(pokemonType.name, currentCount + 1);
  });
});

tabMapTypeEntries = Array.from(tabMapType.entries()); 
tabMapTypeEntries.forEach(entry => {
  const key = entry[0];
  tab1.push(entry[0]); 
  const value = entry[1];
  tab2.push(entry[1]);
});
}

const btnDataViz = document.querySelector("#buttonDataViz");

btnDataViz.addEventListener("click", function () {
  document.getElementById("allPokemons").innerHTML = ""
  document.getElementById("boutonNext").style.display = "none"; //ici on récupère l'ID boutonNext et on le masque en fonction de ce qu'on a paramétré au dessus.
  
  const charData = {
    labels: tab1,
    data: tab2,
};

  const myChart = document.getElementById("myChart");

  new Chart(myChart, {
    type: "doughnut",
    data: {
      labels: charData.labels,
      datasets: [
        {
          label: "pokemon type",
          data: charData.data
        }
      ]
    },
    options: {
      // Redimensionner le graphique doughnut
      responsive: true,
      maintainAspectRatio: false,
      // Afficher les étiquettes à droite du graphique
      plugins: {
          legend: {
              position: 'right', 
              labels:{
                color: 'white',
                font: {
                  weight: 'bold' // Rendre le texte de la légende en gras
                }
              }
          } 
      }
  }  
  });
});

//Trie par ordre alphabétique de A à Z
const boutonAZ = document.querySelector("#buttonAZ");

boutonAZ.addEventListener("click", function () {
    const tabTri = Array.from(daata);
    tabTri.sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
     });
     document.getElementById("allPokemons").innerHTML = ""
     document.getElementById("chartContainer").innerHTML = ""
     document.getElementById("boutonNext").style.display = "none";
    affichage(tabTri);
});

//Trie par ordre alphabétique de Z à A
const boutonZA = document.querySelector("#buttonZA");

boutonZA.addEventListener("click", function () {
    const tabTri2 = Array.from(daata);
    tabTri2.sort(function (a, b) {
      if (a.name > b.name)
        return -1;
      if (a.name < b.name)
        return 1;
      return 0;
     });
     console.log("tabtri2 ", tabTri2)
     document.getElementById("allPokemons").innerHTML = ""
     document.getElementById("chartContainer").innerHTML = ""
     document.getElementById("boutonNext").style.display = "none";
    affichage(tabTri2);
});

//Tri par type
const typesSelect = document.querySelector("#types");

typesSelect.addEventListener("change", (event) => {
  //const result = document.querySelector(".result");
  triType(`${event.target.value}`,daata)
  
});

//Si on clique sur le bouton "charger d'autres pokemons", ça appelle la fonction choice
document.querySelector("#boutonNext").addEventListener("click", function(){
  // if(getComputedStyle(document.getElementById("chartContainer")).display != "none"){
  //   document.getElementById("chartContainer").style.display = "none";
  // } else {
  //   document.getElementById("chartContainer").style.display = "block";
  // }
  choice(daata)
});
//Affiche tous les pokemons quand on clique sur All
document.querySelector("#buttonAll").addEventListener("click", function(){
  document.getElementById("allPokemons").innerHTML = ""
  document.getElementById("chartContainer").innerHTML = ""
  // if(getComputedStyle(document.getElementById("chartContainer")).display != "none"){
  //   document.getElementById("chartContainer").style.display = "none";
  // } else {
  //   document.getElementById("chartContainer").style.display = "block";
  // }
  affichage(daata)
});