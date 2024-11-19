// Tourner les pages en cliquant sur les boutons "Next" ou "Previous"
const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

// Ajoute un gestionnaire d'événements à chaque bouton "Next/Prev"
pageTurnBtn.forEach((el, index) => {
  el.onclick = () => {
    // Récupère l'identifiant de la page cible depuis l'attribut data-page
    const pageTurnId = el.getAttribute("data-page");
    const pageTurn = document.getElementById(pageTurnId);

    // Vérifie si la page contient déjà la classe "turn" (la page est tournée)
    if (pageTurn.classList.contains("turn")) {
      // Si oui, on retire la classe "turn" pour revenir à l'état initial
      pageTurn.classList.remove("turn");
      setTimeout(() => {
        // Ajuste le z-index pour rétablir la superposition des pages
        pageTurn.style.zIndex = 20 - index;
      }, 500); // Délai pour correspondre à l'animation CSS
    } else {
      // Sinon, on ajoute la classe "turn" pour tourner la page
      pageTurn.classList.add("turn");
      setTimeout(() => {
        // Ajuste le z-index pour que la page se superpose correctement
        pageTurn.style.zIndex = 20 + index;
      }, 500); // Délai pour correspondre à l'animation CSS
    }
  };
});

// Bouton "Contact Me" : tourne toutes les pages pour atteindre la section Contact
const pages = document.querySelectorAll(".book-page.page-right");
const contactMeBtn = document.querySelector(".btn.contact-me");

contactMeBtn.onclick = () => {
  // Tourne toutes les pages à droite une par une avec un décalage dans le temps
  pages.forEach((page, index) => {
    setTimeout(() => {
      // Ajoute la classe "turn" pour déclencher l'animation
      page.classList.add("turn");

      setTimeout(() => {
        // Ajuste le z-index après l'animation
        page.style.zIndex = 20 + index;
      }, 500); // Délai pour correspondre à l'animation CSS
    }, (index + 1) * 200 + 100); // Décalage pour un effet progressif
  });
};

// Fonction pour gérer les index inversés lors de la navigation arrière
let totalPages = pages.length; // Nombre total de pages
let pageNumber = 0; // Index courant de la page

function reverseIndex() {
  pageNumber--; // Passe à la page précédente
  if (pageNumber < 0) {
    // Si on dépasse le début, on revient à la dernière page
    pageNumber = totalPages - 1;
  }
}

// Bouton "Profile" : revenir à la page de profil en inversant les pages tournées
const backProfileBtn = document.querySelector(".back-profile");

backProfileBtn.onclick = () => {
  pages.forEach((_, index) => {
    setTimeout(() => {
      // Met à jour l'index pour cibler les pages dans l'ordre inverse
      reverseIndex();
      // Retire la classe "turn" pour faire revenir la page
      pages[pageNumber].classList.remove("turn");

      setTimeout(() => {
        // Ajuste le z-index après l'animation
        reverseIndex();
        pages[pageNumber].style.zIndex = 10 + index;
      }, 500); // Délai pour correspondre à l'animation CSS
    }, (index + 1) * 200 + 100); // Décalage progressif pour un effet fluide
  });
};

// Animation d'ouverture : gestion de l'ouverture automatique des pages au chargement
const coverRight = document.querySelector(".cover.cover-right"); // Cible la couverture droite
const pageLeft = document.querySelector(".book-page.page-left"); // Cible la page de profil (gauche)

// Animation de la couverture droite (tourne après 2,1 secondes)
setTimeout(() => {
  coverRight.classList.add("turn"); // Ajoute la classe "turn" pour simuler l'ouverture
}, 2100);

// Ajuste le z-index de la couverture pour qu'elle disparaisse derrière les pages
setTimeout(() => {
  coverRight.style.zIndex = -1; // Cache la couverture après l'animation
}, 2800);

// Met la page de profil (gauche) au premier plan
setTimeout(() => {
  pageLeft.style.zIndex = 20; // Assure que la page de profil est visible
}, 3200);

// Animation des pages droites pour qu'elles s'affichent correctement au chargement
pages.forEach((_, index) => {
  setTimeout(() => {
    // Met à jour l'index en sens inverse
    reverseIndex();
    // Retire la classe "turn" pour que les pages apparaissent en état initial
    pages[pageNumber].classList.remove("turn");

    setTimeout(() => {
      // Ajuste le z-index pour éviter les conflits
      reverseIndex();
      pages[pageNumber].style.zIndex = 10 + index;
    }, 500); // Délai pour correspondre à l'animation CSS
  }, (index + 1) * 200 + 2100); // Décalage progressif pour un effet fluide
});
