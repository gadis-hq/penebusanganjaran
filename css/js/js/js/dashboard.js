async function loadDashboard(){
  const data = await apiRequest({action:"stats"});
  document.getElementById("totalAktif").innerText=data.status.aktif;
  document.getElementById("totalDitebus").innerText=data.status.ditebus;
  document.getElementById("totalSemua").innerText=data.total;
}
setInterval(loadDashboard,5000);
loadDashboard();
