window.addEventListener('load', (event) => {
  const contentWrapper = document.querySelector('.content-wrapper');
  const asideElement = document.querySelector('aside');

  if (contentWrapper.clientHeight <= asideElement.clientHeight) {
    return;
  }

  const info = contentWrapper.querySelector('.info');

  info.classList.add('hidden-info', 'gray-gradient')

  const readMoreButton = contentWrapper.querySelector('.show-more-button');
  readMoreButton.classList.remove('hidden');

  readMoreButton.addEventListener('click', (event) => {
    info.classList.remove('hidden-info', 'gray-gradient');
    readMoreButton.classList.add('hidden');
  });
});
