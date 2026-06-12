export function scrollToAnchor(href: string) {
  const id = href.replace('#', '');
  const el = id === 'top' || id === '' ? document.body : document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href');
  if (href?.startsWith('#')) {
    e.preventDefault();
    scrollToAnchor(href);
  }
}
