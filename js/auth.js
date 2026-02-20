async function login(username,password){

  const data = await apiRequest({
    action:"adminLogin",
    username:username,
    password:password
  });

  if(data.success){
    localStorage.setItem("adminToken",data.token);
    return true;
  }

  return false;
}

function logout(){
  localStorage.removeItem("adminToken");
  window.location.href="admin-login.html";
}
