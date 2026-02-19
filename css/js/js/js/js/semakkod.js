async function checkKod(){
  const kod=document.getElementById("kodInput").value.trim();
  if(!kod) return;

  const data=await apiRequest({action:"check",kod:kod});
  const box=document.getElementById("result");

  if(!data.found){
    box.innerHTML="<p style='color:red'>Kod Tidak Sah</p>";
    return;
  }

  box.innerHTML=`<p style='color:lime'>Status: ${data.type}</p>`;
}
