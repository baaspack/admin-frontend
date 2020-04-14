const prettyErrorMessages = {
  'Failed to fetch': 'There was a problem connecting to the Baaspack system. ' +
                     'Please try again in a few minutes'
};

const isOk = (response) => {
  if (response.ok) {
    return response.json();
  }

  return response
    .json()
    .then(handleError)
};

const handleError = (errObj) => {
  // Some errors are internal and should be improved before showing them to the
  // user.
  errObj.message = prettyErrorMessages[errObj.message] || errObj.message;

  throw(errObj);
}

const apiClientFactory = () => {
  const hostname = window.location.origin;
  // const hostname = 'admin.localhost';

  const send = (method = 'GET', action, body) => {
    const url = `${hostname.replace('admin', 'admin-be')}/${action}`;

    const options = {
      method,
      headers: {},
      credentials: 'include',
    };

    if (body) {
      // make sure body is an object
      const bodyType = typeof body;

      if (bodyType !== 'object') {
        body = { data: body };
      }

      if (body instanceof FormData) {
        options.body = body;
      } else {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(body);
      }
    }

    return fetch(url, options)
      .then(isOk)
      // Run all network failures through a handler
      .catch(handleError);
  };

  return {
    send,
  }
}

const apiClient = apiClientFactory();

export default apiClient;
