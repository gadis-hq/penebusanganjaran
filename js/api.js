async function apiRequest(payload){

  const response = await fetch(CONFIG.API_URL,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(payload)
  });

  if(!response.ok){
    throw new Error("Network error");
  }

  return await response.json();
}
