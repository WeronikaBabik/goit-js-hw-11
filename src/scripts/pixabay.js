import { API_URL, DEFAULT_PIXABAY_PARAMS } from './configuration';
import { btnLoadMore } from './main';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
export default async function dataFromPixabay({ q = '', page = '1' }) {
  try {
    const query = {
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
    };

    const response = await axios.get(API_URL, { params: query });
    const { hits: photos, total } = response.data;

    if (photos === 0 && q !== '') {
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
