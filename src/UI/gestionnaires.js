//Gestionnaire d'événements
import {estLu, insererLivre, supprimerLivre} from "../services/livreService.js";
import {afficherLivres} from "./render.js";

export const setupGestionnaire = () => {
    //Récupérer les éléments dans le DOM
    const toggleFormBtn = document.querySelector("#toggleFormBtn")
    const formSection = document.querySelector("#formSection")
    const bookForm = document.querySelector("#bookForm")
    const formCollapse = new bootstrap.Collapse(formSection, {toggle: false}
    )

    //Gestionnaire clique bouton toggleFormBtn
    toggleFormBtn.addEventListener("click", () => {
        formCollapse.toggle()
    })

    //On reset le formulaire lorsque celui-ci est caché
    formSection.addEventListener("hidden.bs.collapse", () => {
        bookForm.reset()
    })

    bookForm.addEventListener("submit", (evt) => {
    //Empêcher le rechargement de la page
    evt.preventDefault()
    //Récupérer les valeurs saisies
    const titre = bookForm.title.value
    const auteur = bookForm.author.value
    const resume = bookForm.summary.value
    const estLu = bookForm.isRead.checked

        insererLivre(titre,auteur,resume,estLu)
        //4 Cacher (collapse) le formulaire
        formCollapse.hide()

        //Afficher la liste des livres
        afficherLivres()
    })

    //Traitement de la suppression d'un livre
    //Délégation d'événement
    const listeLivres = document.querySelector("#booksList")
    listeLivres.addEventListener("click", (evt) => {
        //Récupérer l'évenement sur lequel on a cliqué
        const target = evt.target.closest(".delete-btn, .toggle-read-btn")
        if (target===null) return;
        //Récupérer l'id du livre à partir du dataset
        const idLivre = target.dataset.adrien

        //Déterminer sur quel élément on a cliqué
        if (target.classList.contains("delete-btn")) {
            supprimerLivre(idLivre)
            afficherLivres()
        }else if (target.classList.contains("toggle-read-btn")){
            const id = target.dataset.hugo
            estLu(id)
            afficherLivres()
        }

    })


}