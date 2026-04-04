export function setFavicon(url: string) {
    document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']").forEach((el) => el.remove());

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = `${url}?v=${Date.now()}`;
    document.head.appendChild(link);
}
