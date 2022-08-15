import { Notify } from 'notiflix/build/notiflix-notify-aio';

let RES_COUNTER = 1;

export default function onNotify(res) {
  if (res.data.hits.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (RES_COUNTER === 1) {
    Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
  } else if (res.data.hits.length < 40) {
    return Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  }

  RES_COUNTER += 1;
}

export const resetCounterNotiify = () => {
  RES_COUNTER = 1;
};
