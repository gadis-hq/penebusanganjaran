async function loadStage(){
  const data=await apiRequest({action:"stats"});
  document.getElementById("stageTotal").innerText=data.total;
}
setInterval(loadStage,4000);
loadStage();
