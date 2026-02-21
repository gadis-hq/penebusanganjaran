let html5QrCode;
let currentCameraId = null;

async function semakKod() {
    const kod = document.getElementById("kodInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!kod) {
        resultBox.innerHTML = "<span style='color:red;'>Sila masukkan kod.</span>";
        return;
    }

    resultBox.innerHTML = "⏳ Sedang semak...";

    try {
        const response = await fetch(CONFIG.API_URL + "?kod=" + encodeURIComponent(kod));
        const data = await response.json();

        if (data.success) {
            resultBox.innerHTML = `
                <div style="color:green;">
                    ✅ ${data.kod_siri_status}<br>
                    Nama: ${data.nama}<br>
                    Status Penebusan: ${data.status_penebusan}
                </div>
            `;
        } else {
            resultBox.innerHTML = `
                <div style="color:red;">
                    ❌ Kod Tidak Sah
                </div>
            `;
        }

    } catch (error) {
        resultBox.innerHTML = "<span style='color:red;'>Ralat sambungan server.</span>";
        console.error(error);
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
