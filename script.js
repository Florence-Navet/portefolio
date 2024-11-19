// Récupère toutes les pages du livre
const pageTurnBtn = document.querySelectorAll(".nextprev-btn");
const pages = document.querySelectorAll(".book-page");
const allPages = Array.from(pages);

// Fonction pour ajouter ou retirer les gestionnaires d'événements en fonction de la taille de l'écran
function toggleEventListeners() {
  if (window.innerWidth > 800) {
    // Si la largeur de l'écran est supérieure à 800px
    // Ajoute un gestionnaire d'événements à chaque bouton "Next/Prev"
    pageTurnBtn.forEach((el, index) => {
      el.onclick = () => {
        const pageTurnId = el.getAttribute("data-page");
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains("turn")) {
          pageTurn.classList.remove("turn");
          setTimeout(() => (pageTurn.style.zIndex = 20 - index), 500);
        } else {
          pageTurn.classList.add("turn");
          setTimeout(() => (pageTurn.style.zIndex = 20 + index), 500);
        }
      };
    });

    // Bouton "Contact Me" : tourne toutes les pages pour atteindre la section Contact
    const contactMeBtn = document.querySelector(".btn.contact-me");

    contactMeBtn.onclick = () => {
      pages.forEach((page, index) => {
        setTimeout(() => {
          page.classList.add("turn");
          setTimeout(() => (page.style.zIndex = 20 + index), 500);
        }, (index + 1) * 200 + 100);
      });
    };

    // Bouton "Profile" : revenir à la page de profil en inversant les pages tournées
    const backProfileBtn = document.querySelector(".back-profile");

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
  } else {
    // Désactive les événements de clic sur les boutons si la largeur est inférieure ou égale à 800px
    pageTurnBtn.forEach((el) => {
      el.onclick = null;
    });

    const contactMeBtn = document.querySelector(".btn.contact-me");
    if (contactMeBtn) {
      contactMeBtn.onclick = null;
    }

    const backProfileBtn = document.querySelector(".back-profile");
    if (backProfileBtn) {
      backProfileBtn.onclick = null;
    }
  }
}

// Fonction pour gérer les index inversés lors de la navigation arrière
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalPages - 1;
  }
}

// Animation d'ouverture : gestion de l'ouverture automatique des pages au chargement
const coverRight = document.querySelector(".cover.cover-right"); // Cible la couverture droite
const pageLeft = document.querySelector(".book-page.page-left"); // Cible la page de profil (gauche)

setTimeout(() => {
  coverRight.classList.add("turn");
}, 2100);

setTimeout(() => {
  coverRight.style.zIndex = -1;
}, 2800);

setTimeout(() => {
  pageLeft.style.zIndex = 20;
}, 3200);

pages.forEach((_, index) => {
  setTimeout(() => {
    reverseIndex();
    pages[pageNumber].classList.remove("turn");

    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].style.zIndex = 10 + index;
    }, 500);
  }, (index + 1) * 200 + 2100);
});

// Applique un fond transparent flouté aux pages sur mobile (moins de 800px)
function applyBlurredBackground() {
  if (window.innerWidth <= 800) {
    console.log("Mobile détecté : application du fond transparent flouté.");
    allPages.forEach((page, index) => {
      page.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      page.style.backdropFilter = "blur(10px)";
      page.style.webkitBackdropFilter = "blur(10px)";
    });
  } else {
    console.log("Desktop détecté : réinitialisation du fond.");
    allPages.forEach((page) => {
      page.style.backgroundColor = "";
      page.style.backdropFilter = "";
      page.style.webkitBackdropFilter = "";
    });
  }
}

// Appliquer le fond flouté dès le chargement et sur redimensionnement
applyBlurredBackground();
window.addEventListener("resize", () => {
  applyBlurredBackground();
  toggleEventListeners(); // Met à jour les gestionnaires d'événements lors du redimensionnement
});

// Appel initial pour activer les gestionnaires d'événements en fonction de la taille actuelle de l'écran
toggleEventListeners();
