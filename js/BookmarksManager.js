import { extractDomain, getIcon } from './Utils.js';
import { Config } from './config.js';

export async function loadQuickmarks() {
  try {
    const response = await fetch(Config.PATHS.QUICKMARKS_PATH);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }

    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    await renderBookmarks(lines);
  } catch (error) {
    console.error('Error loading bookmarks:', error);
  }
}

export async function renderBookmarks(lines) {
  const container = document.getElementById('bookmark-container');

  for (const line of lines) {
    const bookmark = await createBookmarkElement(line);
    if (bookmark) {
      container.appendChild(bookmark);
    }
  }
}

export async function createBookmarkElement(line) {
  const parts = line.split(' ');
  const url = parts.pop();
  const name = parts.join(' ');
  const domain = extractDomain(url);

  if (!domain) return null;

  try {
    const iconUrl = getIcon(domain);

    const bookmark = document.createElement('a');
    bookmark.className = 'bookmark';
    bookmark.href = url;
    bookmark.title = name;
    bookmark.innerHTML = `
      <div class="bookmark-logo" 
            style="display: inline-block; width: 40px; height: 40px; margin:10px; 
                  background: url(${iconUrl}) center/contain no-repeat;" 
            role="img" 
            aria-label="Favicon">
      </div>
      <p class="bookmark-name">${name}</p>
    `;

    return bookmark;
  } catch (error) {
    console.error(`Error creating bookmark for ${url}:`, error);
    return null;
  }
}
