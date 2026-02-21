let lastTotal=0;
async function fetchStats(){
    try{
        const res = await fetch(CONFIG.API_URL + "?action=stats&origin=" + window.location.hostname);
        const data = await res.json();

        document.getElementById("totalKod").innerText = "Total Kod: "+data.total;
        document.getElementById("aktifKod").innerText = "Aktif / Belum Ditebus: "+data.status.aktif;
        document.getElementById("ditebusKod").innerText = "Telah Ditebus: "+data.status.ditebus;

        // Grand total LED
        if(data.total>lastTotal){
            document.getElementById("ding").play();
            launchConfetti();
        }
        lastTotal = data.total;
        animateGrandTotal(data.total);

        // Top 5 bandar
        const arr = Object.entries(data.bandar).sort((a,b)=>b[1]-a[1]).slice(0,5);
        const ul = document.getElementById("top5Bandar"); ul.innerHTML="";
        arr.forEach(([bandar,count])=>{
            const li=document.createElement("li");
            li.innerText=`${bandar}: ${count}`;
            ul.appendChild(li);
        });

        // Heatmap
        drawHeatmap(data.bandar);

    }catch(err){
        console.log("Error fetching stats:",err);
    }
}
setInterval(fetchStats,3000);
fetchStats();

function animateGrandTotal(total){
    const el = document.getElementById("grandTotalLED");
    let current=parseInt(el.innerText)||0;
    const step = (total-current)/20;
    let count=0;
    const interval=setInterval(()=>{
        if(count>=20){el.innerText=total; clearInterval(interval); return;}
        current+=step;
        el.innerText=Math.floor(current);
        count++;
    },50);
}

function drawHeatmap(bandarStat){
    const canvas=document.getElementById("malaysiaHeatmap");
    const ctx=canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    Object.keys(bandarStat).forEach((b,i)=>{
        ctx.fillStyle=`rgba(255,0,0,${Math.min(bandarStat[b]/10,1)})`;
        ctx.fillRect(i*100,0,80,80);
        ctx.fillStyle="#000"; ctx.fillText(`${b}: ${bandarStat[b]}`,i*100+5,50);
    });
}
