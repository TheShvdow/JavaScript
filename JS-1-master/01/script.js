// const span = "<span class='pixel'></span>";
// const span = document.createElement("span");
// span.innerHTML = "toto"
// console.log(span)

const selectedDiv = document.querySelector("div");


for (let i = 0; i < 2500; i++) {
    let span = document.createElement("span");
    span.className = "pixel";
    let r = Math.ceil(Math.random() * 255);
    let g = Math.ceil(Math.random() * 255);
    let b = Math.ceil(Math.random() * 255);
    // let css = "rgb("+r+","+g+",b)";
    let css = `rgb(${r},${g},${b})`;
    span.style.backgroundColor = css;
    selectedDiv.appendChild(span)
}


/* const selectedDiv = document.querySelector("div");

for (let i = 0; i < 2500; i++) {
    let span = document.createElement("span");
    span.className = "pixel";
    let r = Math.ceil(Math.random() * 255);
    let g = Math.ceil(Math.random() * 255);
    let b = Math.ceil(Math.random() * 255);
    let css = `rgb(${r},${g},${b})`;
    // Définir la couleur d'arrière-plan sur transparent par défaut
    span.style.backgroundColor = "transparent";
    // Ajouter un écouteur d'événements mouseover au pixel
    span.addEventListener('mouseover', (e) => {
        // Définir la couleur d'arrière-plan sur la couleur aléatoire
        e.target.style.backgroundColor = css;
    });
    // Ajouter un écouteur d'événements mouseout au pixel
    span.addEventListener('mouseout', (e) => {
        // Réinitialiser la couleur d'arrière-plan sur transparent
        e.target.style.backgroundColor = "transparent";
    });
    // Ajouter la couleur aléatoire en tant que donnée personnalisée au pixel
    span.dataset.color = css;
    selectedDiv.appendChild(span)
}
 */