export const notifyError = (context, message) => {
  if (process.client) {
    context.$notify({
      type: 'error',
      text: message,
    });
  }
};

export const notifySuccess = (context, message) => {
  if (process.client) {
    context.$notify({
      type: 'success',
      text: message,
    });
  }
};

export const notifyRequestError = (context, response) => {
  if (response) {
    if (response.data && response.data.errors[0]) {
      notifyError(context, response.data.errors[0]);
    } else {
      notifyError(context, 'An error occured please try again later!');
    }
  }
};
