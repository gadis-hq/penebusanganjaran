let html5QrCode;
let currentCameraId = null;

/* ================================
   SEMAK KOD MANUAL
================================ */

async function semakKod() {

    const kod = document.getElementById("kodInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!kod) {
        resultBox.innerHTML = "<span style='color:red;'>Sila masukkan kod.</span>";
        return;
    }

    resultBox.innerHTML = "⏳ Sedang semak...";

    try {

        const response = await fetch(CONFIG.API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "semakKod",
                kod: kod,
                origin: window.location.hostname
            })
        });

        const data = await response.json();

        if (data.success) {
            resultBox.innerHTML = `
                <div style="color:green;">
                    ✅ Kod Sah<br>
                    Nama: ${data.nama}<br>
                    Status: ${data.status}
                </div>
            `;
        } else {
            resultBox.innerHTML = `
                <div style="color:red;">
                    ❌ ${data.message}
                </div>
            `;
        }

    } catch (error) {
        resultBox.innerHTML = "<span style='color:red;'>Ralat sambungan server.</span>";
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
            // ignore error scanning
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
