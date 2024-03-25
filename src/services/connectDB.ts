interface apiRestInterface {
  url: string,
  method: ('GET'|'POST'|'DELETE'|'PUT'|'PATCH'),
  body?: {},
}
const apiRest = async (data: apiRestInterface) => {
  const { url, method, body} = data;
  const resp = await fetch(`${url}`,
    {
      method,
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "69420"
      },
      body: JSON.stringify(body)}
  )
  return resp.json();
}

class connectDB {

  get(url: string) {
    const dataApi: apiRestInterface = {
      url,
      method: 'GET',
    };
    return apiRest(dataApi);
  }

  post(url: string, body: {}) {
    const dataApi: apiRestInterface = {
      url,
      method: 'POST',
      body,
    }
    return apiRest(dataApi);
  }
  delete(url: string) {
    const dataApi: apiRestInterface = {
      url,
      method: 'DELETE',
      body: {}
    }
    return apiRest(dataApi);
  }

  update(url: string, body: {}) {
    const dataApi: apiRestInterface = {
      url,
      method: 'PATCH',
      body
    }
    return apiRest(dataApi);
  }
}

export default connectDB;
