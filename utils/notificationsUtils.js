export const notifyRequestError = (context, response) => {
  if (response) {
    if (response.data.error_messages) {
      notifyError(context, response.data.error_messages.join('<br>'))
    } else {
      notifyError(context, response.data.message)
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
