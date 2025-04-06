import { GifLoader } from './GifLoader.js';
import { BookmarksManager } from './BookmarksManager.js';


document.addEventListener('DOMContentLoaded', () => {
  GifLoader.loadRandomGif();
  BookmarksManager.loadQuickmarks();
});
