// Scroll-reveal
const reveals = document.querySelectorAll('.problem-copy, .problem-product-card, .feature-card, .step, .demo-card, .testimonial, .callout-inner')

reveals.forEach((el) => el.classList.add('reveal'))

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 }
)

reveals.forEach((el) => observer.observe(el))

// Soft 2D drift on mockup + reactive background anchor
const mockup = document.querySelector('.mockup-browser')
const root = document.documentElement
if (mockup) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = (e.clientX - cx) / cx   // -1 → +1
    const dy = (e.clientY - cy) / cy

    const tx = dx * 7
    const ty = dy * 5

    mockup.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    root.style.setProperty('--mx', `${e.clientX}px`)
    root.style.setProperty('--my', `${e.clientY}px`)
  })

  document.addEventListener('mouseleave', () => {
    mockup.style.transform = 'translate3d(0, 0, 0)'
  })
}

// Zen cursor follow effect
const zenCursor = document.querySelector('.zen-cursor')
if (zenCursor && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (event) => {
    zenCursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    zenCursor.classList.add('is-visible')
  })

  document.addEventListener('mouseleave', () => {
    zenCursor.classList.remove('is-visible')
  })
}

// Demo timer loops for the hero preview and showcase cards
const timerEl = document.querySelector('[data-demo-timer]')
const clockEl = document.querySelector('[data-demo-clock]')
if (timerEl || clockEl) {
  let elapsed = 9
  setInterval(() => {
    elapsed += 1
    const minutes = Math.floor(elapsed / 60)
    const seconds = elapsed % 60
    const value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    if (timerEl) timerEl.textContent = value
    if (clockEl) clockEl.textContent = value
  }, 1000)
}

// Light/Dark preview toggle in the hero preview
const heroThemeCard = document.querySelector('[data-theme-demo]')
const heroThemeToggle = document.querySelector('[data-theme-toggle]')

if (heroThemeCard && heroThemeToggle) {
  heroThemeToggle.addEventListener('click', () => {
    heroThemeCard.classList.toggle('is-dark')
    heroThemeToggle.textContent = heroThemeCard.classList.contains('is-dark') ? 'Dark' : 'Light'
  })
}

// Light/Dark preview toggle in the showcase card
const showcaseThemeCard = document.querySelector('[data-theme-card]')
const showcaseThemeToggle = document.querySelector('[data-theme-card-toggle]')

if (showcaseThemeCard && showcaseThemeToggle) {
  showcaseThemeToggle.addEventListener('click', () => {
    showcaseThemeCard.classList.toggle('is-dark')
    showcaseThemeToggle.textContent = showcaseThemeCard.classList.contains('is-dark') ? 'Dark' : 'Light'
  })
}
