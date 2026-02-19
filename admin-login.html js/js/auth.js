async function loginAdmin(){

  const pass = document.getElementById("adminPass").value;

  const data = await apiRequest({
    action:"adminLogin",
    password:pass
  });

  if(data.success){
    localStorage.setItem("ADMIN_SESSION",data.session);
    window.location.href="dashboard.html";
  }else{
    document.getElementById("loginMsg").innerHTML="<p style='color:red'>Login gagal</p>";
  }
}

function checkAdminSession(){

  const session = localStorage.getItem("ADMIN_SESSION");
  if(!session){
    window.location.href="admin-login.html";
  }
}
