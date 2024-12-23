export function auth_fetch(url, options = {}){
  const jwt_token = localStorage.getItem("access_token")

  let headers = {
    "Content-Type": "application/json",
  }

  if(jwt_token){
    headers["Authorization"] = `Bearer ${jwt_token}`
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
        // Redirecionar para login
        console.log("Não autorizado")
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      status: response.status,
      response: await response.json()
    };
  })
}