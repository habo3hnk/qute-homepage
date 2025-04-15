import { Config } from './config.js';


const API_KEY = Config.GIPHY.API_KEY;
const SEARCH_QUERY = Config.GIPHY.SEARCH_QUERY;

export async function loadRandomGif() {
  const spinner = document.querySelector('.spinner');
  const gifElement = document.getElementById('random-gif');

  try {
    showLoadingState(spinner, gifElement);
    const gifUrl = await fetchRandomGif();

    if (gifUrl) {
      await displayGif(gifElement, spinner, gifUrl);
    }

  } catch (error) {
    console.error('Error loading GIF:', error);
    hideLoadingState(spinner);
  }
}

export async function showLoadingState(spinner, gifElement) {
  try {
    spinner.style.display = 'flex';
    gifElement.style.display = 'none';
    gifElement.style.opacity = '0';
  } catch (e) {
    console.log(e);
  }
}

export async function hideLoadingState(spinner) {
  try {
    spinner.style.display = 'none';
  } catch (e) {
    console.log(e);
  }
}

export async function fetchRandomGif() {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${SEARCH_QUERY}&rating=r`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  return data.data?.images?.original?.url;
}

export async function displayGif(gifElement, spinner, url) {
  return new Promise((resolve) => {
    gifElement.src = url;
    gifElement.onload = () => {
      spinner.style.display = 'none';
      gifElement.style.display = 'block';
      gifElement.style.opacity = '1';
      resolve();
    };
  });
}
