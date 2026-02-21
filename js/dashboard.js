/* =========================================
   GADIS QS HQ – DASHBOARD FINAL VERSION
========================================= */
let lastCount = 0;

async function checkPenebusan() {

    const response = await fetch(CONFIG.API_URL + "?heatmap=true");
    const data = await response.json();

    let total = 0;
    data.heatmap.forEach(item => total += item.jumlah);

    if (lastCount !== 0 && total > lastCount) {
        showNotification("Kod Baru Telah Ditebus 🎉");
    }

    lastCount = total;
}

function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification(message);
    }
}

setInterval(checkPenebusan, 10000); // check setiap 10 saat


let lastTotal = 0;
let heatmapInstance = null;

/* =========================
   FETCH STATS EVERY 3 SEC
========================= */

async function fetchStats(){
    try{
        const res = await fetch(CONFIG.API_URL + "?action=stats&origin=" + window.location.hostname);
        const data = await res.json();

        if(!data || !data.total) return;

        // =====================
        // UPDATE SUMMARY TEXT
        // =====================
        document.getElementById("totalKod").innerText = "Total Kod: " + data.total;
        document.getElementById("aktifKod").innerText = "Aktif / Belum Ditebus: " + data.status.aktif;
        document.getElementById("ditebusKod").innerText = "Telah Ditebus: " + data.status.ditebus;

        // =====================
        // GRAND TOTAL LED
        // =====================
        if(data.total > lastTotal){
            const ding = document.getElementById("ding");
            if(ding) ding.play();
            if(typeof launchConfetti === "function") launchConfetti();
        }

        lastTotal = data.total;
        animateGrandTotal(data.total);

        // =====================
        // TOP 5 BANDAR
        // =====================
        const arr = Object.entries(data.bandar)
            .sort((a,b)=>b[1]-a[1])
            .slice(0,5);

        const ul = document.getElementById("top5Bandar");
        ul.innerHTML="";

        arr.forEach(([bandar,count])=>{
            const li=document.createElement("li");
            li.innerText=`${bandar}: ${count}`;
            ul.appendChild(li);
        });

        // =====================
        // HEATMAP LEAFLET
        // =====================
        buildHeatmap(data.bandar);

    }catch(err){
        console.log("Error fetching stats:",err);
    }
}

setInterval(fetchStats,3000);
fetchStats();

/* =========================
   LED GRAND TOTAL ANIMATION
========================= */

function animateGrandTotal(total){
    const el = document.getElementById("grandTotalLED");
    let current=parseInt(el.innerText)||0;

    const step = (total-current)/20;
    let count=0;

    const interval=setInterval(()=>{
        if(count>=20){
            el.innerText=total;
            clearInterval(interval);
            return;
        }
        current+=step;
        el.innerText=Math.floor(current);
        count++;
    },50);
}

/* =========================
   BUILD HEATMAP (LEAFLET)
========================= */

function buildHeatmap(bandarStat){

    const bandarArray = Object.entries(bandarStat).map(([nama,jumlah])=>{
        return {
            nama:nama,
            lat:getLat(nama),
            lng:getLng(nama),
            jumlah:jumlah
        };
    });

    initHeatmap(bandarArray);
}

/* =========================
   INIT LEAFLET MAP
========================= */

function initHeatmap(bandarData){

    if(heatmapInstance){
        heatmapInstance.remove();
    }

    heatmapInstance = L.map('heatmap-map').setView([4.2105,101.9758],6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution:'© OpenStreetMap'
    }).addTo(heatmapInstance);

    bandarData.forEach(item=>{
        const radius = item.jumlah * 5000;

        L.circle([item.lat,item.lng],{
            color:'#d4af37',
            fillColor:'#ff99cc',
            fillOpacity:0.5,
            radius:radius
        }).addTo(heatmapInstance)
        .bindPopup(`${item.nama}<br>Jumlah: ${item.jumlah}`);
    });
}

/* =========================
   COORDINATE MAPPING
========================= */

function getLat(negeri){
    const map={
        "PERAK":4.5975,
        "KUALA LUMPUR":3.1390,
        "JOHOR BAHRU":1.4927,
        "KELANTAN":6.1254,
        "PENANG":5.4141,
        "SELANGOR":3.0738
    };
    return map[negeri.toUpperCase()] || 4.2105;
}

function getLng(negeri){
    const map={
        "PERAK":101.0901,
        "KUALA LUMPUR":101.6869,
        "JOHOR BAHRU":103.7414,
        "KELANTAN":102.2381,
        "PENANG":100.3288,
        "SELANGOR":101.5183
    };
    return map[negeri.toUpperCase()] || 101.9758;
}
