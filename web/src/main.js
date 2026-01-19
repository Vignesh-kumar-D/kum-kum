import './style.css'

const BRAND = {
  name: 'Kumkum & Co',
  email: 'kumkumandco@gmail.com',
  phones: ['+91 9663868179', '+91 9481483119'],
}

const routes = [
  {
    path: '/',
    title: 'Kumkum & Co',
    description: 'Kumkum & Co — bespoke invitations and design for meaningful celebrations.',
    render: renderHome,
  },
  {
    path: '/gallery',
    title: 'Gallery · Kumkum & Co',
    description: 'A glimpse of our invitation and design work.',
    render: renderGallery,
  },
  {
    path: '/get-in-touch',
    title: 'Get in touch · Kumkum & Co',
    description: 'Connect with us for bespoke invitations and design.',
    render: renderGetInTouch,
  },
]

function matchRoute(pathname) {
  return routes.find((r) => r.path === pathname) ?? null
}

function setMeta({ title, description }) {
  document.title = title

  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', description)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', title)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', description)

  const twTitle = document.querySelector('meta[name="twitter:title"]')
  if (twTitle) twTitle.setAttribute('content', title)

  const twDesc = document.querySelector('meta[name="twitter:description"]')
  if (twDesc) twDesc.setAttribute('content', description)

  // Best-effort runtime update for share URL while developing/previewing.
  const ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) ogUrl.setAttribute('content', `${window.location.origin}${window.location.pathname}`)
}

function navigate(to) {
  if (window.location.pathname === to) return
  history.pushState({}, '', to)
  render()
}

function wireLinks(rootEl) {
  rootEl.querySelectorAll('a[data-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.defaultPrevented) return
      if (a.target === '_blank') return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/')) return

      e.preventDefault()
      navigate(href)
    })
  })
}

function layout(contentHtml) {
  return `
    <div class="page">
      ${header()}
      <main class="main" id="main">
        ${contentHtml}
      </main>
      ${footer()}
    </div>
  `
}

function header() {
  const current = window.location.pathname
  const navLink = (path, label) => {
    const active = path === current
    return `
      <a
        class="nav__link ${active ? 'nav__link--active' : ''}"
        href="${path}"
        data-link
        ${active ? 'aria-current="page"' : ''}
      >
        ${label}
      </a>
    `
  }

  return `
    <header class="header" id="siteHeader">
      <div class="header__inner">
      ${navLink('/', 'Home')}
        <nav class="nav" aria-label="Primary navigation">
          
          ${navLink('/gallery', 'Gallery')}
          ${navLink('/get-in-touch', 'Get in touch')}
        </nav>
      </div>
    </header>
  `
}

function footer() {
  const year = new Date().getFullYear()
  const phoneLine = BRAND.phones.join(' / ')

  return `
    <footer class="footer">
      <div class="footer__inner">
        <img class="footer__logo" src="/brand/og-image.png" alt="${BRAND.name}" />

        <div class="footer__contact">
          <a class="footer__email" href="mailto:${BRAND.email}">${BRAND.email}</a>
          <div class="footer__phones">
            <a href="tel:${BRAND.phones[0].replace(/\\s/g, '')}">${BRAND.phones[0]}</a>
            <span class="footer__sep">/</span>
            <a href="tel:${BRAND.phones[1].replace(/\\s/g, '')}">${BRAND.phones[1]}</a>
          </div>
        </div>

        <div class="footer__meta">
          <div>Copyright © ${year} ${BRAND.name} - All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  `
}

function renderHome() {
  return `
    <section class="hero" aria-label="Kumkum & Co hero">
      <div class="hero__media" aria-hidden="true">
        <video
          class="hero__bg"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          poster="/brand/card-front.png"
        >
          <source src="/brand/wedding-video.mp4" type="video/mp4" />
        </video>
        <div class="hero__scrim"></div>
      </div>

      <div class="hero__content">
        <img class="hero__lockup" src="/brand/og-image.png" alt="${BRAND.name}" />
        <p class="hero__tagline">
          Bespoke invitations and design for meaningful celebrations.
        </p>
        <div class="hero__cta">
          <a class="btn" href="/gallery" data-link>View gallery</a>
          <a class="btn btn--ghost" href="/get-in-touch" data-link>Get in touch</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2 class="h2">Thoughtful design, beautifully crafted</h2>
        <p class="p">
          From elegant invites to cohesive event stationery, we help you tell your story
          with warmth and intention.
        </p>
        <div class="cards">
          <div class="card">
            <h3 class="h3">Invitations</h3>
            <p class="p p--muted">Custom invites that feel personal and timeless.</p>
          </div>
          <div class="card">
            <h3 class="h3">Event stationery</h3>
            <p class="p p--muted">Menus, signage, place cards, and more—designed to match.</p>
          </div>
          <div class="card">
            <h3 class="h3">Branding & collateral</h3>
            <p class="p p--muted">Clean, elevated design for small businesses and creatives.</p>
          </div>
        </div>
      </div>
    </section>
  `
}

function renderGallery() {
  const items = [
    { src: '/brand/card-front.png', alt: 'Card front' },
    { src: '/brand/card.png', alt: 'Card detail' },
    { src: '/brand/og.png', alt: 'Brand preview' },
  ]

  return `
    <section class="section section--tight">
      <div class="section__inner">
        <h1 class="h1">Gallery</h1>
        <p class="p p--muted">We’ll add your real work here next.</p>

        <div class="gallery" aria-label="Gallery grid">
          ${items
            .map(
              (i) => `
            <figure class="gallery__item">
              <img class="gallery__img" src="${i.src}" alt="${i.alt}" loading="lazy" />
            </figure>
          `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `
}

function renderGetInTouch() {
  return `
    <section class="section section--tight">
      <div class="section__inner">
        <h1 class="h1">Get in touch</h1>
        <p class="p">
          For enquiries and collaborations, reach out via email or phone.
        </p>

        <div class="contact">
          <div class="contact__details">
            <div class="contact__row">
              <div class="label">Email</div>
              <a class="contact__value" href="mailto:${BRAND.email}">${BRAND.email}</a>
            </div>
            <div class="contact__row">
              <div class="label">Phone</div>
              <div class="contact__value">
                <a href="tel:${BRAND.phones[0].replace(/\\s/g, '')}">${BRAND.phones[0]}</a>
                <span class="muted"> / </span>
                <a href="tel:${BRAND.phones[1].replace(/\\s/g, '')}">${BRAND.phones[1]}</a>
              </div>
            </div>

            <div class="contact__note p p--muted">
              Prefer WhatsApp? Tap a number above.
            </div>
          </div>

          <div class="contact__qr">
            <img class="qr" src="/brand/qr.png" alt="QR code" />
            <div class="p p--muted">Scan to connect</div>
          </div>
        </div>
      </div>
    </section>
  `
}

function renderNotFound() {
  return `
    <section class="section section--tight">
      <div class="section__inner">
        <h1 class="h1">404</h1>
        <p class="p">That page doesn’t exist.</p>
        <a class="btn" href="/" data-link>Go home</a>
      </div>
    </section>
  `
}

function updateHeaderOnScroll() {
  const headerEl = document.getElementById('siteHeader')
  if (!headerEl) return
  headerEl.classList.toggle('header--scrolled', window.scrollY > 8)
}

function render() {
  const app = document.getElementById('app')
  if (!app) return

  const route = matchRoute(window.location.pathname)
  const meta = route
    ? { title: route.title, description: route.description }
    : { title: `Not found · ${BRAND.name}`, description: routes[0].description }

  setMeta(meta)

  const html = layout(route ? route.render() : renderNotFound())
  app.innerHTML = html

  wireLinks(app)

  // reset scroll on navigation
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  updateHeaderOnScroll()
}

window.addEventListener('popstate', render)
window.addEventListener('scroll', updateHeaderOnScroll, { passive: true })

render()
