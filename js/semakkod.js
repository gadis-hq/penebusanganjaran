document.addEventListener("DOMContentLoaded", async function(){

const resultBox = document.getElementById("result");
const loading = document.getElementById("loading");

// =============================
// AMBIL PARAMETER URL
// =============================

function getParam(name){
const url = new URL(window.location.href);
return url.searchParams.get(name);
}

const kod = getParam("kod");

if(!kod){

loading.innerHTML = "❌ Kod siri tidak diberikan.";
return;

}

// =============================
// PAPAR LOADING
// =============================

loading.innerHTML = "⏳ Sedang menyemak kod siri...";

// =============================
// FETCH DATA API
// =============================

const data = await fetchKodSiri(kod);

loading.style.display = "none";

// =============================
// JIKA KOD TIDAK SAH
// =============================

if(!data.success){

resultBox.innerHTML = `
<div class="result-card error">
❌ Kod siri tidak sah atau tidak wujud.
</div>
`;

return;

}

// =============================
// FORMAT TARIKH
// =============================

function formatTarikh(t){

if(!t) return "-";

const d = new Date(t);

return d.toLocaleDateString("ms-MY");

}

// =============================
// CONFETTI JIKA KOD SAH
// =============================

if(data.status_kod && data.status_kod.includes("SAH")){

if(typeof confetti === "function"){

confetti({
particleCount:120,
spread:70,
origin:{y:0.6},
colors:['#ff99cc','#d4af37','#fff0f5']
});

}

}

// =============================
// PAPAR KEPUTUSAN
// =============================

resultBox.innerHTML = `

<div class="result-card">

<h2 style="color:${data.color};margin-bottom:20px;">
${data.tajuk}
</h2>

<table class="result-table">

<tr>
<td>Kod Siri</td>
<td>${data.kod_siri || "-"}</td>
</tr>

<tr>
<td>Nama</td>
<td>${data.nama || "-"}</td>
</tr>

<tr>
<td>Hadiah</td>
<td>${data.hadiah || "-"}</td>
</tr>

<tr>
<td>Status Kod</td>
<td>${data.status_kod || "-"}</td>
</tr>

<tr>
<td>Produk</td>
<td>${data.produk || "-"}</td>
</tr>

<tr>
<td>Harga</td>
<td>${data.harga || "-"}</td>
</tr>

<tr>
<td>No Telefon</td>
<td>${data.telefon || "-"}</td>
</tr>

<tr>
<td>No IC</td>
<td>${data.ic || "-"}</td>
</tr>

<tr>
<td>Status Penebusan</td>
<td>${data.status_penebusan || "-"}</td>
</tr>

<tr>
<td>Disahkan Oleh</td>
<td>${data.disahkan || "-"}</td>
</tr>

<tr>
<td>Tarikh</td>
<td>${formatTarikh(data.tarikh)}</td>
</tr>

<tr>
<td>Lokasi</td>
<td>${data.lokasi || "-"}</td>
</tr>

</table>

</div>

`;

// =============================
// POPUP KEPUTUSAN PREMIUM
// =============================

if(typeof bukaPopup === "function"){
bukaPopup(data.tajuk);
}

});
