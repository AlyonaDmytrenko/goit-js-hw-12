import{S as w,i as y,a as E}from"./assets/vendor-5401a4b0.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();async function I(){let a=1,n="";const d=document.getElementById("searchForm"),l=document.getElementById("searchInput"),e=document.getElementById("loader"),t=document.getElementById("gallery"),o=document.getElementById("loadMoreBtn"),u=document.getElementById("endMessage"),f=new w(".gallery a");d.addEventListener("submit",async function(r){r.preventDefault();const i=l.value.trim();if(i===""){y.error({title:"Error",message:"Please enter a search query"});return}e.style.display="block",t.innerHTML="",o.style.display="none",u.style.display="none",n=i,a=1;try{const s=await g(n,a);m(s)}catch(s){e.style.display="none",y.error({title:"Error",message:s.message})}}),o.addEventListener("click",async function(){a++;try{const r=await g(n,a);m(r),h()}catch(r){y.error({title:"Error",message:r.message})}});async function g(r,i){const b=`https://pixabay.com/api/?key=42375067-5abc1b4a099550ffbb458c60e&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${i}&per_page=15`;try{const c=await E.get(b);if(c.status!==200)throw new Error("Network response was not ok");return c.data}catch(c){throw new Error(c.response.data.message||c.message)}}function m(r){e.style.display="none",r.hits.length===0?y.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):(p(r.hits),r.totalHits<=a*15?(o.style.display="none",u.style.display="block"):(o.style.display="block",u.style.display="none"))}function p(r){const i=r.map(s=>`
        <a href="${s.largeImageURL}" data-lightbox="gallery">
          <img src="${s.webformatURL}" alt="${s.tags}">
        </a>
      `).join("");t.innerHTML+=i,f.refresh()}function h(){const r=t.querySelector("a").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}I();
//# sourceMappingURL=commonHelpers.js.map