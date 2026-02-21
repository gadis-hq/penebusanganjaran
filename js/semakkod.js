let html5QrCode;
let currentCameraId = null;

// SEMAK KOD MANUAL
async function semakKod() {
  const kod = document.getElementById("kodInput").value.trim();
  const resultBox = document.getElementById("result");

  if (!kod) {
    resultBox.innerHTML = "<span style='color:red;'>Sila masukkan kod.</span>";
    return;
  }

  resultBox.innerHTML = "⏳ Sedang semak...";

  try {
    const response = await fetch(CONFIG.API_URL + "?action=semakKod&kod=" + kod + "&origin=" + window.location.hostname);
    const data = await response.json();

    if (data.kod_siri_status.includes("✅")) {
      // SAH / TELAH DITEBUS
      resultBox.className = "result-box green";
      startConfetti();
      document.getElementById("btnSijil").href = data.sijil_url;
      document.getElementById("btnSijil").style.display = "inline-block";
    }
    else if (data.kod_siri_status.includes("✔️")) {
      // AKTIF / BELUM DITEBUS
      resultBox.className = "result-box red";
      document.getElementById("btnSijil").style.display = "none";
    }
    else {
      resultBox.className = "result-box red";
      document.getElementById("btnSijil").style.display = "none";
    }

    resultBox.innerHTML = `
      <div>
        ${data.kod_siri_status}<br>
        Nama: ${data.nama || "-"}<br>
        Hadiah: ${data.hadiah || "-"}<br>
        Status Penebusan: ${data.status_penebusan || "-"}<br>
        Disahkan Oleh: ${data.disahkan_oleh || "-"}<br>
        Bandar / Negeri: ${data.bandar_negeri || "-"}
      </div>
    `;
    // Generate sijil PDF auto
    generateSijil(data.nama, data.hadiah, data.bandar_negeri).then(url=>{
        document.getElementById("btnSijil").href = url;
    });
    launchConfetti();
}

  } catch (err) {
    resultBox.className = "result-box red";
    resultBox.innerHTML = "<span style='color:red;'>Ralat sambungan server.</span>";
  }
}

// QR SCANNER
async function startScanner() {
  document.getElementById("qr-reader").style.display = "block";
  if (!html5QrCode) html5QrCode = new Html5Qrcode("qr-reader");

  const devices = await Html5Qrcode.getCameras();
  if (!devices || devices.length === 0) { alert("Kamera tidak dijumpai"); return; }

  const backCamera = devices.find(d => d.label.toLowerCase().includes("back") || d.label.toLowerCase().includes("rear"));
  currentCameraId = backCamera ? backCamera.id : devices[0].id;

  html5QrCode.start(currentCameraId, { fps:10, qrbox:{width:250,height:250} },
    qrCodeMessage => { document.getElementById("kodInput").value = qrCodeMessage; stopScanner(); semakKod(); },
    error => {}
  );
}

function stopScanner() {
  if (html5QrCode) html5QrCode.stop().then(()=>{ document.getElementById("qr-reader").innerHTML=""; document.getElementById("qr-reader").style.display="none"; });
}

// Confetti Animation
function startConfetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const canvas = document.getElementById("confetti-canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 9999;

  const confettiInterval = setInterval(() => {
    if (Date.now() > animationEnd) { clearInterval(confettiInterval); return; }
    const ctx = canvas.getContext("2d");
    const x = Math.random()*window.innerWidth;
    const y = Math.random()*window.innerHeight;
    const r = Math.random()*6+4;
    const color = ["#d4af37","#ff69b4","#ffffff"][Math.floor(Math.random()*3)];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
  }, 50);
}
