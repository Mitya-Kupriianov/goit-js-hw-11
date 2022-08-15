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

var lightbox = new SimpleLightbox('.gallery a', {
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
  }
});

function clearGallery() {
  galleryDiv.innerHTML = '';
}

function lightboxRefresh() {
  lightbox.refresh();
}

async function onCreate() {
  try {
    const res = await getImg(inputText);

    if (res.data.hits.length < 40) {
      window.removeEventListener('scroll', infiniteScroll);
    }
    onNotify(res);
    createMarkup(defMarkup(res), galleryDiv);
  } catch (error) {
    throw new Error(error);
  }
}
function infiniteScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 800) {
    upCounterPege();
    onCreate();
    lightboxRefresh();
  }
}

window.addEventListener('scroll', throttle(infiniteScroll, 500));
