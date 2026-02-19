function buildURL(params){
  params.token = CONFIG.API_TOKEN;
  params.origin = window.location.hostname;
  return CONFIG.API_BASE + "?" + new URLSearchParams(params);
}

async function apiRequest(params){
  const res = await fetch(buildURL(params),{cache:"no-store"});
  return await res.json();
}
