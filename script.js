    // MENU BURGER  --------------------------------------------------------------------------------------------------------------------------------------

    document.addEventListener("DOMContentLoaded", function () {
        const menuOverlay = document.querySelector('.menu-overlay');

        // Fonction pour ouvrir/fermer le menu burger
        window.toggleMenu = function () {
            menuOverlay.classList.toggle('open');
        };
    });

    // SCROLL BOUTON --------------------------------------------------------------------------------------------------------------------------------------

    document.addEventListener("DOMContentLoaded", function () {
        const scrollTopBtn = document.getElementById("scrollTopBtn");
    
        // Afficher le bouton quand on descend de 200px
        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                scrollTopBtn.classList.add('visible'); // ✅ Afficher proprement
            } else {
                scrollTopBtn.classList.remove('visible'); // ✅ Masquer proprement
            }
        });
    
        // Fonction pour remonter en haut avec un effet fluide
        window.scrollToTop = function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    });    

    // POTEIRE TEXT  --------------------------------------------------------------------------------------------------------------------------------------
    // Affichage de texte sur clic pour la section poterie
    document.addEventListener("DOMContentLoaded", function () {
    const poterieItems = document.querySelectorAll("#poterie .gallery-item");

    poterieItems.forEach((item) => {
        item.addEventListener("click", function () {
                // Ferme d'abord tous les autres items ouverts (optionnel mais conseillé)
                poterieItems.forEach((otherItem) => {
                    if (otherItem !== item) otherItem.classList.remove("active");
                });

                // Active ou désactive l'élément cliqué
                item.classList.toggle("active");
            });
        });
    });

    // BOUTIQUE ETSY --------------------------------------------------------------------------------------------------------------------------------------

    async function fetchEtsyRSS() {
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent("https://www.etsy.com/shop/kamartiist/rss")}`; 

        try {
            const response = await fetch(url);
            const data = await response.json();
            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, "text/xml");
            const items = xml.querySelectorAll("item");

            console.log("XML récupéré :", xml); // DEBUG : Afficher les données en console

            const etsyContainer = document.getElementById('etsy-products');
            etsyContainer.innerHTML = "";

            items.forEach((item, index) => {
                if (index < 6) { // Afficher les 6 derniers articles Etsy
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;

                    // Extraction de l'image depuis la description
                    let image = "images/default-placeholder.jpg"; // Image par défaut
                    const description = item.querySelector("description") ? item.querySelector("description").textContent : "";
                    const imgMatch = description.match(/<img.*?src=["'](.*?)["']/); // Regarde si une image est présente dans le HTML
                    if (imgMatch && imgMatch[1]) {
                        image = imgMatch[1]; // Prend l'image trouvée
                    }

                    const productHTML = `
                        <div class="etsy-item">
                            <img src="${image}" alt="${title}">
                            <h3>${title}</h3>
                            <a href="${link}" target="_blank">Voir sur Etsy</a>
                        </div>
                    `;
                    etsyContainer.innerHTML += productHTML;
                }
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des articles Etsy :", error);
        }
    }

    fetchEtsyRSS();