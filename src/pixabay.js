import axios from 'axios';

let PAGE_COUNTER = 1;

export default async function getImg(search) {
  try {
    const BASE_URL = `https://pixabay.com/api/`;
    const searchParams = new URLSearchParams({
      key: '29286447-e0acda4b7f54a964b1d886463',
      q: `${search}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${PAGE_COUNTER}`,
      per_page: 40,
    });

    const res = await axios.get(`${BASE_URL}/?${searchParams}`);

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export const resetCounterPege = () => {
  PAGE_COUNTER = 1;
};

export const upCounterPege = () => {
  PAGE_COUNTER += 1;
};
