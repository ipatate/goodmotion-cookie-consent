import './style.css'

document.addEventListener('DOMContentLoaded', async () => {
  // add html to body
  const body = document.querySelector('body')
  body.insertAdjacentHTML(
    'beforeend',
    `<button type="button" data-cc="c-settings">Cookie settings</button>`,
  )
  await import('./cookie-consent-settings')
})
