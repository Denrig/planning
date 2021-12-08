export const handleModalState = isModalOpen => {
  if (process.client) {
    const body = document.querySelector('body')
    if (isModalOpen) {
      body.classList.add('modal-open')
    } else {
      body.classList.remove('modal-open')
    }
  }
}