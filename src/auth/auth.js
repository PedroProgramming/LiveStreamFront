export function auth_fetch(url, options = {}){
  const jwt_token = localStorage.getItem("access_token")

  let headers = {}

  if(jwt_token){
    headers["Authorization"] = `Bearer ${jwt_token}`
  }

  if(!(options.body instanceof FormData)){
    headers["Content-Type"] = "application/json";
  }

  let custom_options = {
    ...options,
    headers: {
      ...headers,
    },
  }

  return fetch(url, custom_options)
  .then(async response => {
    if(!response.ok){
      if(response.status == 401){
        console.log("Não autorizado")
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let jsonResponse = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      console.warn("Resposta sem JSON, ignorando erro.");
    }

    return {
      status: response.status,
      response: jsonResponse
    };
  })
}