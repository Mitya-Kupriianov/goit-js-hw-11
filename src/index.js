import getImg, { resetCounterPege, upCounterPege } from './pixabay';
import onNotify, { resetCounterNotiify } from './notify';
import defMarkup, { createMarkup } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const { inputForm, galleryDiv } = {
  inputForm: document.querySelector('.search-form'),
  galleryDiv: document.querySelector('.gallery'),
};

let inputText = '';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

inputForm.addEventListener('submit', async e => {
  e.preventDefault();

  inputText = e.target.elements.searchQuery.value.trim('');
  if (inputText) {
    clearGallery();
    resetCounterPege();
    resetCounterNotiify();
    await onCreate();
    lightboxRefresh();
    qwerty();
  }
});

function clearGallery() {
  galleryDiv.innerHTML = '';
}

function lightboxRefresh() {
  lightbox.refresh();
}

let totalHits;

async function onCreate() {
  try {
    if (totalHits <= galleryDiv.children.length) {
      onNotify(res);
      window.removeEventListener('scroll', throttled);
      return;
    }
    const res = await getImg(inputText);
    totalHits = res.data.totalHits;

    onNotify(res);
    createMarkup(defMarkup(res), galleryDiv);
  } catch (error) {
    throw new Error(error);
  }
}
function infiniteScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 300) {
    upCounterPege();
    onCreate();
    lightboxRefresh();
  }
}

const throttled = throttle(infiniteScroll, 1000);

window.addEventListener('scroll', throttled);
