let html5QrCode;
let currentCameraId = null;

/* ================================
   SEMAK KOD MANUAL
================================ */
async function semakKod() {
    const kod = document.getElementById("kodInput").value.trim();
    const resultBox = document.getElementById("result");
    const btnSijil = document.getElementById("btnSijil");

    if (!kod) {
        resultBox.innerHTML = "<span style='color:red;'>Sila masukkan kod.</span>";
        btnSijil.style.display = "none";
        return;
    }

    resultBox.innerHTML = "⏳ Sedang semak...";
    btnSijil.style.display = "none";

    try {
        const response = await fetch(CONFIG.API_URL + "?kod=" + encodeURIComponent(kod));
        const data = await response.json();

        if (data.kod_siri_status.includes("✅")) {
            triggerConfetti();
        }

        // Badge warna
        let badgeColor = '#dc3545'; // default merah
        if(data.status_penebusan === "TELAH DITEBUS") badgeColor = '#d4af37';
        else if(data.status_penebusan === "BELUM DITEBUS") badgeColor = '#28a745';

        resultBox.innerHTML = `
            <div class="result-card" style="position:relative;">
              <div class="watermark">GADIS QS HQ</div>
              <span class="btn-premium" style="background-color:${badgeColor}; padding:5px 10px; border-radius:5px;">
                ${data.kod_siri_status}
              </span>
              <p><strong>Nama:</strong> ${data.nama}</p>
              <p><strong>Hadiah:</strong> ${data.hadiah}</p>
              <p><strong>Status Kod:</strong> ${data.status_kod}</p>
              <p><strong>Pembelian Produk:</strong> ${data.pembelian_produk}</p>
              <p><strong>Harga:</strong> ${data.harga}</p>
              <p><strong>No. Telefon:</strong> ${data.no_telefon}</p>
              <p><strong>No. IC:</strong> ${data.no_ic}</p>
              <p><strong>Status Penebusan:</strong> ${data.status_penebusan}</p>
              <p><strong>Disahkan Oleh:</strong> ${data.disahkan_oleh}</p>
              <p><strong>Bandar / Negeri:</strong> ${data.bandar_negeri}</p>
            </div>
        `;

        if(data.sijil_url && data.sijil_url !== "") {
            btnSijil.href = data.sijil_url;
            btnSijil.style.display = "inline-block";
        } else {
            btnSijil.style.display = "none";
        }

    } catch (error) {
        resultBox.innerHTML = "<span style='color:red;'>Ralat sambungan server.</span>";
        btnSijil.style.display = "none";
    }
}

/* ================================
   QR SCANNER
================================ */
async function startScanner() {
    document.getElementById("qr-reader").style.display = "block";

    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qr-reader");
    }

    const devices = await Html5Qrcode.getCameras();
    if (!devices || devices.length === 0) {
        alert("Kamera tidak dijumpai");
        return;
    }

    // Auto detect kamera belakang
    const backCamera = devices.find(device =>
        device.label.toLowerCase().includes("back") ||
        device.label.toLowerCase().includes("rear")
    );
    currentCameraId = backCamera ? backCamera.id : devices[0].id;

    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };

    html5QrCode.start(
        currentCameraId,
        config,
        (qrCodeMessage) => {
            document.getElementById("kodInput").value = qrCodeMessage;
            stopScanner();
            semakKod();
        },
        (errorMessage) => {
            // ignore scanning errors
        }
    );
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById("qr-reader").innerHTML = "";
            document.getElementById("qr-reader").style.display = "none";
        });
    }
}

/* ================================
   Confetti
================================ */
function triggerConfetti() {
    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff99cc','#d4af37','#fff0f5']
    });
}
