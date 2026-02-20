let html5QrCode;
let currentCameraId = null;

async function startScanner() {

    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qr-reader");
    }

    const devices = await Html5Qrcode.getCameras();

    if (!devices || devices.length === 0) {
        alert("Kamera tidak dijumpai");
        return;
    }

    // 🔐 Auto detect kamera belakang
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
            semakKod();
            stopScanner();
        },
        (errorMessage) => {
            // ignore
        }
    );
}

function stopScanner(){
    if(html5QrCode){
        html5QrCode.stop().then(()=>{
            document.getElementById("qr-reader").innerHTML="";
        });
    }
}
