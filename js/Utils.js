export class Utils {
  static extractDomain(url) {
    try {
      const domain = new URL(url).hostname
        .replace('www.', '')
        .replace('chat.', '')
        .replace('web.', '');
      return domain;
    } catch {
      return '';
    }
  }

  static async getIcon(domain) {
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  }
}
