// === VARIABLES GLOBALES ===
const coverRight = document.querySelector(".cover.cover-right"); // Couverture droite
const pageLeft = document.querySelector(".book-page.page-left"); // Page de profil (gauche)
const pages = document.querySelectorAll(".book-page"); // Toutes les pages
const pageTurnBtn = document.querySelectorAll(".nextprev-btn"); // Boutons de navigation

let totalPages = pages.length; // Nombre total de pages
let pageNumber = 0; // Page active (index)

// === FONCTIONS ===

// Fonction : Ajout ou retrait des gestionnaires d'événements de clic
function toggleEventListeners() {
  pageTurnBtn.forEach((btn, index) => {
    btn.onclick = () => {
      const pageTurnId = btn.getAttribute("data-page"); // ID de la page cible
      const pageTurn = document.getElementById(pageTurnId); // Page cible

      if (pageTurn.classList.contains("turn")) {
        // Si la page est tournée, la retourner
        pageTurn.classList.remove("turn");
        setTimeout(() => (pageTurn.style.zIndex = 20 - index), 500);
      } else {
        // Sinon, la tourner
        pageTurn.classList.add("turn");
        setTimeout(() => (pageTurn.style.zIndex = 20 + index), 500);
      }
    };
  });
}

// Fonction : Gestion du bouton "Contact Me"
function setupContactButton() {
  const contactMeBtn = document.querySelector(".btn.contact-me");
  if (contactMeBtn) {
    contactMeBtn.onclick = () => {
      pages.forEach((page, index) => {
        setTimeout(() => {
          page.classList.add("turn");
          setTimeout(() => (page.style.zIndex = 20 + index), 500);
        }, (index + 1) * 200 + 100);
      });
    };
  }
}

// Fonction : Gestion du bouton "Back to Profile"
function setupBackProfileButton() {
  const backProfileBtn = document.querySelector(".back-profile");
  if (backProfileBtn) {
    backProfileBtn.onclick = () => {
      pages.forEach((_, index) => {
        setTimeout(() => {
          reverseIndex();
          pages[pageNumber].classList.remove("turn");

          setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
          }, 500);
        }, (index + 1) * 200 + 100);
      });
    };
  }
}

// Fonction : Gère l'index inversé pour revenir en arrière
function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalPages - 1;
  }
}

// Fonction : Animation d'ouverture automatique au chargement
function autoOpenAnimation() {
  setTimeout(() => {
    coverRight.classList.add("turn"); // Ouvre la couverture droite
  }, 2100);

  setTimeout(() => {
    coverRight.style.zIndex = -1; // Masque la couverture
  }, 2800);

  setTimeout(() => {
    pageLeft.style.zIndex = 20; // Met la page gauche devant
  }, 3200);

  // Animation progressive des pages droites
  pages.forEach((_, index) => {
    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].classList.remove("turn");

      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].style.zIndex = 15 + index;

        console.log("page number"); // Affiche "Bonjour, monde !" dans la console
      }, 500);
    }, (index + 1) * 200 + 2100);
  });
}

// Fonction pour gérer le changement de feuille de style
function switchStylesheet() {
  const viewportWidth = window.innerWidth; // Récupère la largeur de l'écran
  const pcStylesheet = document.querySelector("link[href='./style.css']"); // Style pour PC
  const mobileStylesheet = document.querySelector("link[href='./mobile.css']"); // Style pour Mobile

  // Active/Désactive les styles en fonction de la largeur de l'écran
  if (viewportWidth > 800) {
    pcStylesheet.disabled = false;
    mobileStylesheet.disabled = true;
  } else {
    pcStylesheet.disabled = true;
    mobileStylesheet.disabled = false;
  }
}

// === INITIALISATION ===

// Active les gestionnaires d'événements au chargement
toggleEventListeners();
setupContactButton();
setupBackProfileButton();

// Lance l'animation d'ouverture
autoOpenAnimation();

// Définition d'un effet d'animation pour changer la feuille de style
window.addEventListener("resize", switchStylesheet);
switchStylesheet();
