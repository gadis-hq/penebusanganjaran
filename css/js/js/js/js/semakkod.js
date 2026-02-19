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

let html5QrCode;

function startScanner(){

  html5QrCode = new Html5Qrcode("reader");

  Html5Qrcode.getCameras().then(devices=>{
    if(devices && devices.length){
      html5QrCode.start(
        devices[0].id,
        {fps:10, qrbox:250},
        qrCodeMessage=>{
          document.getElementById("kodInput").value = qrCodeMessage;
          html5QrCode.stop();
          checkKod();
        }
      );
    }
  });
}
