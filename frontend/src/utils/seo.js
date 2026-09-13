export const setSeoMeta = (title, description, image, url) => {
  document.title = title

  const updateMeta = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  const updateOgMeta = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  updateMeta('description', description)
  updateMeta('viewport', 'width=device-width, initial-scale=1.0, viewport-fit=cover')
  updateMeta('theme-color', '#071A33')
  updateMeta('keywords', 'VRR Career Academy, PU integrated academy Bengaluru, PCMB coaching Bengaluru, PCMC coaching Bengaluru, KCET coaching Sahakar Nagar, JEE coaching Kodigehalli, NEET coaching Sahakar Nagar, PU Science coaching Bengaluru, Shanti Niketan PU College, PU Integrated Academy')

  updateOgMeta('og:title', title)
  updateOgMeta('og:description', description)
  updateOgMeta('og:image', image)
  updateOgMeta('og:url', url)
  updateOgMeta('og:type', 'website')

  updateMeta('twitter:card', 'summary_large_image')
  updateMeta('twitter:title', title)
  updateMeta('twitter:description', description)
  updateMeta('twitter:image', image)
}

export const createStructuredData = (type, data) => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.innerHTML = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  })
  document.head.appendChild(script)
}

export const addOrganizationSchema = () => {
  createStructuredData('Organization', {
    name: 'VRR Career Academy',
    url: 'https://vrr-career-academy.com',
    logo: 'https://vrr-career-academy.com/logo.png',
    description: 'PU integrated academy in Bengaluru offering PU Boards, KCET, JEE and NEET preparation through a structured academic system.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '52nd Floor, Vinayaka Complex, 11, Kodigehalli - Thindlu Main Road',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560092',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+91-9611747003'
    }
  })
}

export const addCourseSchema = (courseName, description, instructor) => {
  createStructuredData('Course', {
    name: courseName,
    description: description,
    instructor: {
      '@type': 'Person',
      name: instructor
    },
    provider: {
      '@type': 'Organization',
      name: 'VRR Career Academy'
    }
  })
}

export const addBreadcrumbSchema = (breadcrumbs) => {
  const itemListElement = breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))

  createStructuredData('BreadcrumbList', {
    itemListElement
  })
}
