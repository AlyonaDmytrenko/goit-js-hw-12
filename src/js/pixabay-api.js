import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

export async function someFunction() {
  let currentPage = 1;
  let currentQuery = '';

  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const loader = document.getElementById('loader');
  const gallery = document.getElementById('gallery');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const endMessage = document.getElementById('endMessage');

  const lightbox = new SimpleLightbox('.gallery a');

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query',
      });
      return;
    }
    loader.style.display = 'block';
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    endMessage.style.display = 'none';
    currentQuery = query;
    currentPage = 1;
    try {
      const data = await fetchImages(currentQuery, currentPage);
      handleImageData(data);
    } catch (error) {
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: error.message,
      });
    }
  });

  loadMoreBtn.addEventListener('click', async function () {
    currentPage++;
    try {
      const data = await fetchImages(currentQuery, currentPage);
      handleImageData(data);
      smoothScroll();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: error.message,
      });
    }
  });

  async function fetchImages(query, page) {
    const apiKey = '42375067-5abc1b4a099550ffbb458c60e';
    const perPage = 15;
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  function handleImageData(data) {
    loader.style.display = 'none';
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      showImages(data.hits);
      if (data.totalHits <= currentPage * 15) {
        loadMoreBtn.style.display = 'none';
        endMessage.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'block';
        endMessage.style.display = 'none';
      }
    }
  }

  function showImages(images) {
    const galleryContent = images
      .map(
        image => `
        <a href="${image.largeImageURL}" data-lightbox="gallery">
          <img src="${image.webformatURL}" alt="${image.tags}">
        </a>
      `
      )
      .join('');
    gallery.innerHTML += galleryContent;

    lightbox.refresh();
  }

  function smoothScroll() {
    const cardHeight = gallery
      .querySelector('a')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

someFunction();
