import './style.css'

document.addEventListener('DOMContentLoaded', async () => {
  const btn = document.querySelectorAll('.cc_settings')
  if (btn.length > 0) {
    btn.forEach((el) => {
      el.dataset.cc = 'c-settings'
    })
  }
  await import('./cookie-consent-settings')
})
