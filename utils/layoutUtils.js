export const isScreenMD = () => process.client && window.innerWidth <= 1024

export const isScreenLG = () => process.client && window.innerWidth >= 1024

export const screenSize = () => {
  if (process.client) {
    return window.innerWidth
  }
}

export const isScreenScrolled = () => process.client && window.scrollY > 50
