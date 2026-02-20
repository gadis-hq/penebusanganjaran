let html5QrCode;

function startScanner() {
    const qrContainer = document.getElementById("qr-reader");

    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qr-reader");
    }

    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const cameraId = devices[0].id;

            html5QrCode.start(
                cameraId,
                config,
                qrCodeMessage => {
                    document.getElementById("kodInput").value = qrCodeMessage;
                    semakKod();
                    stopScanner();
                },
                errorMessage => {
                    // ignore scan error
                }
            );
        }
    }).catch(err => {
        alert("Kamera tidak dapat diakses");
        console.error(err);
    });
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById("qr-reader").innerHTML = "";
        }).catch(err => {
            console.error(err);
        });
    }
}
