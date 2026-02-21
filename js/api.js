async function fetchKod(kod){
  const res = await fetch(`${CONFIG.API_URL}?kod=${kod}`);
  return await res.json();
}
