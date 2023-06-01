import { API_URL, API_KEY, DEFAULT_PIXABAY_PARAMS } from './configuration';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
export default async function dataFromPixabay({ q = '', page = '1' }) {
  try {
    const query = new URLSearchParams({
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
    });

    const response = await fetch(`${API_URL}?${query}`);
    if (!response.ok) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    const { hits: photos, totalHits } = await response.json();
    if (totalHits === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (page > totalHits / DEFAULT_PIXABAY_PARAMS.per_page) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    if (q !== '') {
      Notiflix.Notify.success(`Hooray! We found new ${totalHits} images.`);
    }
    return photos;
  } catch (e) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
