(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const u=(o,r,t,i)=>{const e={titre:o,auteur:r,resume:t,estLu:i,id:crypto.randomUUID(),createdAt:new Date().toDateString()};JSON.stringify(e);const s=localStorage.getItem("livres"),n=s?JSON.parse(s):[];n.push(e),localStorage.setItem("livres",JSON.stringify(n))},m=()=>{const o=localStorage.getItem("livres");return o?JSON.parse(o):[]},g=o=>{const r=localStorage.getItem("livres"),i=(r?JSON.parse(r):[]).filter(e=>e.id!==o);localStorage.setItem("livres",JSON.stringify(i))},f=o=>{const r=localStorage.getItem("livres"),t=r?JSON.parse(r):[],i=t.filter(s=>s.id!==o),e=t.filter(s=>s.id===o);e[0].estLu=!e[0].estLu,i.push(e),localStorage.setItem("livres",JSON.stringify(i))},c=()=>{const o=document.querySelector("#booksList"),r=m();o.innerHTML=r.map(t=>{const i=new Date(t.createdAt).toLocaleDateString("fr-FR");return`
<div class="col-md-6 col-lg-4" id="book-${t.id}">
     <div class="card h-100">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">${t.titre}</h5>
                <span class="badge ${t.estLu?"bg-success":"bg-secondary"} toggle-read-btn" 
                        style="cursor: pointer;" data-hugo="${t.id}" >
                    ${t.estLu?'<i class="bi bi-check-circle me-1"></i>Lu':'<i class="bi bi-circle me-1"></i>Non lu'}
                </span>
                </div>
                <h6 class="card-subtitle mb-2">
                <i class="bi bi-person me-1"></i>${t.auteur}
                </h6>
                <p class="card-text small">${t.resume}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                <small class="text-muted">
                    <i class="bi bi-calendar3 me-1"></i>${i}
                </small>
                <button class="btn btn-outline-danger btn-sm delete-btn" data-adrien="${t.id}" >
                    <i class="bi bi-trash me-1"></i>Supprimer
                </button>
            </div>
        </div>
    </div>
</div>
`}).join("")},b=()=>{const o=document.querySelector("#toggleFormBtn"),r=document.querySelector("#formSection"),t=document.querySelector("#bookForm"),i=new bootstrap.Collapse(r,{toggle:!1});o.addEventListener("click",()=>{i.toggle()}),r.addEventListener("hidden.bs.collapse",()=>{t.reset()}),t.addEventListener("submit",s=>{s.preventDefault();const n=t.title.value,l=t.author.value,a=t.summary.value,d=t.isRead.checked;u(n,l,a,d),i.hide(),c()}),document.querySelector("#booksList").addEventListener("click",s=>{const n=s.target.closest(".delete-btn, .toggle-read-btn");if(n===null)return;const l=n.dataset.adrien;if(n.classList.contains("delete-btn"))g(l),c();else if(n.classList.contains("toggle-read-btn")){const a=n.dataset.hugo;f(a),c()}})};b();c();
