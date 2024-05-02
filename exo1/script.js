const myboule = document.querySelector('.boule');

myboule.addEventListener('mouseover', bonjour); 
        this.style.backgroundColor = '#fff';
        this.style.transition = '1s';
        //alert('bonjour');

function bonjour() {
   //alert('bonjour');
   
}

myboule.addEventListener('mouseover', opacite);
function opacite() {
    setTimeout(() => {
        this.style.opacite -= '0.1'
        //console.log('bonjour');
    },1000);
    
}