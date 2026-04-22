// Scroll-reveal
const reveals = document.querySelectorAll('.feature-card, .step, .demo-card, .testimonial, .callout-inner')

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

// Subtle parallax tilt on mockup
const mockup = document.querySelector('.mockup-browser')
if (mockup) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = (e.clientX - cx) / cx   // -1 → +1
    const dy = (e.clientY - cy) / cy

    const rx = dy * -5   // tilt up/down
    const ry = dx * 6    // tilt left/right

    mockup.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
  })

  document.addEventListener('mouseleave', () => {
    mockup.style.transform = 'rotateX(5deg) rotateY(-3deg)'
  })
}

// Demo timer loop for the Zen showcase card
const timerEl = document.querySelector('[data-demo-timer]')
if (timerEl) {
  let elapsed = 9
  setInterval(() => {
    elapsed += 1
    const minutes = Math.floor(elapsed / 60)
    const seconds = elapsed % 60
    timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, 1000)
}

// Light/Dark preview toggle in the showcase
const themeCard = document.querySelector('[data-theme-demo]')
const themeToggle = document.querySelector('[data-theme-toggle]')

if (themeCard && themeToggle) {
  themeToggle.addEventListener('click', () => {
    themeCard.classList.toggle('is-dark')
    themeToggle.textContent = themeCard.classList.contains('is-dark') ? 'Dark' : 'Light'
  })
}
