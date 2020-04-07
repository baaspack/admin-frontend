const isOk = (response) => {
  if (response.ok) {
    return response.json();
  }

  return response
    .json()
    .then((errObj) => {
      throw errObj;
    });
};

const apiClientFactory = () => {
  // const { hostname } = window.location;
  // const url = `http://admin.${hostname}/${action}`;
  const hostname = 'localhost:3000';
  let websocketsRetryCount = 5;
  const websocketsRetryDelay = 5000;

  const send = (method = 'GET', action, body) => {
    const url = `http://${hostname}/${action}`;

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

      options.headers['content-type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    return fetch(url, options)
      .then(isOk)
  };

  const getWebsocket = (path = '', tempOverride, tempUrl) => {
    const url = tempUrl || tempOverride || `ws://${hostname}${path}`;
    let ws = new WebSocket(url);

    ws.onopen = () => {
      websocketsRetryCount = 5;
      console.log(`Connected to ${url} via WS!`);
    };

    // ws.onerror = (err) => {
    //   console.error('WS error:', err);
    // };

    ws.onclose = (e) => {
      if (e.reason === 'page_change') {
        console.log('closed WS!');
        return;
      }

      if (websocketsRetryCount > 0) {
        websocketsRetryCount -= 1;
        console.log('WS connection closed! Trying to reconnect...');
        setTimeout(() => getWebsocket(null, null, url), websocketsRetryDelay);
      } else {
        console.log('WS server is not responding. Stopping retries');
      }
    };

    return ws;
  };

  return {
    send,
    getWebsocket,
  }
}

const apiClient = apiClientFactory();

export default apiClient;
