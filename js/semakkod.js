function getParam(name){

const url = new URL(window.location.href);
return url.searchParams.get(name);

}

const kod = getParam("kod");

semakKod(kod);

function safe(v){
if(!v || v==="") return "-";
return v;
}

function semakKod(kod){

fetch(CONFIG.API_URL + "?kod=" + encodeURIComponent(kod))

.then(res=>res.json())

.then(data=>{

document.getElementById("loading").style.display="none";

if(!data.success){

document.getElementById("result").innerHTML =
"<div class='card'><b style='color:red'>Kod tidak sah</b></div>";

return;
}

let html = `

<div class="card">

<div class="status" style="color:${data.color}">
${safe(data.tajuk)}
</div>

<table>

<tr>
<td class="label">Kod Siri</td>
<td>${safe(data.kod_siri)}</td>
</tr>

<tr>
<td class="label">Nama</td>
<td>${safe(data.nama)}</td>
</tr>

<tr>
<td class="label">Hadiah</td>
<td>${safe(data.hadiah)}</td>
</tr>

<tr>
<td class="label">Status Kod</td>
<td>${safe(data.status_kod)}</td>
</tr>

<tr>
<td class="label">Produk</td>
<td>${safe(data.produk)}</td>
</tr>

<tr>
<td class="label">Harga</td>
<td>${safe(data.harga)}</td>
</tr>

<tr>
<td class="label">No Telefon</td>
<td>${safe(data.telefon)}</td>
</tr>

<tr>
<td class="label">No IC</td>
<td>${safe(data.ic)}</td>
</tr>

<tr>
<td class="label">Status Penebusan</td>
<td>${safe(data.status_penebusan)}</td>
</tr>

<tr>
<td class="label">Disahkan Oleh</td>
<td>${safe(data.disahkan)}</td>
</tr>

<tr>
<td class="label">Tarikh</td>
<td>${formatTarikh(data.tarikh)}</td>
</tr>

<tr>
<td class="label">Lokasi</td>
<td>${safe(data.lokasi)}</td>
</tr>

</table>

</div>

`;

document.getElementById("result").innerHTML = html;

})

.catch(err=>{

document.getElementById("loading").innerHTML =
"❌ Ralat sambungan server";

});

}

function formatTarikh(t){

if(!t) return "-";

const d = new Date(t);

return d.toLocaleDateString("ms-MY");

}
