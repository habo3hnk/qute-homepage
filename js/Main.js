import { loadRandomGif } from './GifLoader.js';
import { loadQuickmarks } from './BookmarksManager.js';


document.addEventListener('DOMContentLoaded', () => {
  loadRandomGif();
  loadQuickmarks();
});
