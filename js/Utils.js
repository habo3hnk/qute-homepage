export function extractDomain(url) {
  try {
    return new URL(url).hostname
      .replace('www.', '')
      .replace('chat.', '')
      .replace('web.', '');
  } catch {
    return '';
  }
}

export function getIcon(domain) {
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}
