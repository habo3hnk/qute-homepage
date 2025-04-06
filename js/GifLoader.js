import { Config } from './config.js';

export class GifLoader {
  static API_KEY = Config.GIPHY.API_KEY;
  static SEARCH_QUERY = Config.GIPHY.SEARCH_QUERY;

  static async loadRandomGif() {
    const spinner = document.querySelector('.spinner');
    const gifElement = document.getElementById('random-gif');

    try {
      this.showLoadingState(spinner, gifElement);
      const gifUrl = await this.fetchRandomGif();

      if (gifUrl) {
        await this.displayGif(gifElement, spinner, gifUrl);
      }

    } catch (error) {
      console.error('Error loading GIF:', error);
      this.hideLoadingState(spinner);
    }
  }

  static showLoadingState(spinner, gifElement) {
    spinner.style.display = 'flex';
    gifElement.style.display = 'none';
    gifElement.style.opacity = '0';
  }

  static hideLoadingState(spinner) {
    spinner.style.display = 'none';
  }

  static async fetchRandomGif() {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${this.API_KEY}&tag=${this.SEARCH_QUERY}&rating=r`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.images?.original?.url;
  }

  static displayGif(gifElement, spinner, url) {
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
}
