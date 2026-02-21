let html5QrCode;
let currentCameraId = null;

async function semakKod(){
    const kod = document.getElementById("kodInput").value.trim();
    const resultBox = document.getElementById("result");

    if(!kod){resultBox.innerHTML="<span style='color:red;'>Sila masukkan kod.</span>";return;}
    resultBox.innerHTML="⏳ Sedang semak...";

    try{
        const response = await fetch(CONFIG.API_URL + "?action=semakKod&kod="+kod+"&origin="+window.location.hostname);
        const data = await response.json();

        if(data.success){
            resultBox.innerHTML=`
                <div class="status-badge ${data.status_penebusan==="TELAH DITEBUS"?"emerald":"gold"}">
                    KOD SIRI: ${data.status_kod} ✅<br>
                    Nama: ${data.nama}<br>
                    Hadiah: ${data.hadiah}<br>
                    Produk: ${data.pembelian_produk}<br>
                    Harga: ${data.harga}<br>
                    Telefon: ${data.no_telefon}<br>
                    IC: ${data.no_ic}<br>
                    Disahkan oleh: ${data.disahkan_oleh}<br>
                    Bandar/Negeri: ${data.bandar_negeri}
                </div>
            `;
            document.getElementById("btnSijil").href=data.sijil_url;
            launchConfetti();
        } else{
            resultBox.innerHTML=`<div style="color:red;">❌ ${data.kod_siri_status||data.message}</div>`;
        }

    }catch(err){
        resultBox.innerHTML="<span style='color:red;'>Ralat sambungan server.</span>";
    }
}

async function startScanner(){
    document.getElementById("qr-reader").style.display="block";
    if(!html5QrCode){html5QrCode=new Html5Qrcode("qr-reader");}

    const devices=await Html5Qrcode.getCameras();
    if(!devices || devices.length===0){alert("Kamera tidak dijumpai"); return;}
    const backCamera=devices.find(d=>d.label.toLowerCase().includes("back")||d.label.toLowerCase().includes("rear"));
    currentCameraId = backCamera?backCamera.id:devices[0].id;

    const config={fps:10, qrbox:{width:250,height:250}};
    html5QrCode.start(currentCameraId,config,
        (qrCodeMessage)=>{document.getElementById("kodInput").value=qrCodeMessage; stopScanner(); semakKod();},
        ()=>{}
    );
}

function stopScanner(){
    if(html5QrCode){html5QrCode.stop().then(()=>{
        document.getElementById("qr-reader").innerHTML="";
        document.getElementById("qr-reader").style.display="none";
    });}
}
