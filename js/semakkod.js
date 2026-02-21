let html5QrCode;
let currentCameraId = null;

async function semakKod(){
  const kod = document.getElementById("kodInput").value.trim();
  const resultBox = document.getElementById("result");
  if(!kod){resultBox.innerHTML="<span style='color:red;'>Sila masukkan kod.</span>"; return;}
  resultBox.innerHTML="⏳ Sedang semak...";
  try{
    const data = await fetchKod(kod);
    if(data.success){
      const badgeClass = data.status_kod.replace(/\s/g,'').toLowerCase();
      resultBox.innerHTML=`<div class="badge-${badgeClass}">
        ${data.kod_siri_status}<br>
        Nama: ${data.nama}<br>
        Hadiah: ${data.hadiah}<br>
        No Telefon: ${data.no_telefon}<br>
        No IC: ${data.no_ic}<br>
        Status Penebusan: ${data.status_penebusan}<br>
        Disahkan Oleh: ${data.disahkan_oleh}<br>
        Bandar / Negeri: ${data.bandar_negeri}
      </div>`;
      document.getElementById("btnSijil").href = data.sijil_url;
      if(data.status_kod==="SAH / TELAH DITEBUS") confetti();
    }else{
      resultBox.innerHTML=`<span style="color:red;">❌ ${data.kod_siri_status}</span>`;
    }
  }catch(e){
    resultBox.innerHTML="<span style='color:red;'>Ralat sambungan server.</span>";
  }
}

async function startScanner(){
  document.getElementById("qr-reader").style.display="block";
  if(!html5QrCode) html5QrCode = new Html5Qrcode("qr-reader");
  const devices = await Html5Qrcode.getCameras();
  if(!devices||devices.length===0){alert("Kamera tidak dijumpai");return;}
  const backCamera = devices.find(d=>d.label.toLowerCase().includes("back")||d.label.toLowerCase().includes("rear"));
  currentCameraId = backCamera?backCamera.id:devices[0].id;
  html5QrCode.start(currentCameraId,{fps:10,qrbox:{width:250,height:250}},qrCodeMessage=>{
    document.getElementById("kodInput").value=qrCodeMessage;
    stopScanner(); semakKod();
  },errorMessage=>{});
}
function stopScanner(){if(html5QrCode) html5QrCode.stop().then(()=>{document.getElementById("qr-reader").innerHTML=""; document.getElementById("qr-reader").style.display="none";});}
