import { API_URL, API_KEY, DEFAULT_PIXABAY_PARAMS } from './configuration';
import { btnLoadMore } from './main';
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
    const { hits: photos, total } = await response.json();
    if (total === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (page > total / DEFAULT_PIXABAY_PARAMS.per_page) {
      btnLoadMore.disabled = true;
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    if (page === '1' && q !== '') {
      Notiflix.Notify.success(`Hooray! We found ${total} images.`);
    }
    return photos;
  } catch (e) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
