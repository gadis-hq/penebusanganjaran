if(!localStorage.getItem("adminToken")){
  window.location.href="admin-login.html";
}

async function loadDashboard(){

  try{
    const data = await apiRequest({
      action:"dashboardStats",
      token: localStorage.getItem("adminToken")
    });

    console.log(data);

  }catch(err){
    console.error("Dashboard error",err);
  }
}

loadDashboard();
