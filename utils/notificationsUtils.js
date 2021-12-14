export const notifyRequestError = (context, response) => {
  if (response) {
    if (response.data && response.data.message) {
      notifyError(context, response.data.message)
    } else {
      notifyError(context, 'An error occured please try again later!')
    }
  }
}

export const notifyError = (context, message) => {
  if (process.client) {
    context.$notify({
      type: 'error',
      text: message
    })
  }
}

export const notifySuccess = (context, message) => {
  if (process.client) {
    context.$notify({
      type: 'success',
      text: message
    })
  }
}
