async function semakKod() {

    const kod = document.getElementById("kodInput").value.trim();
    const resultBox = document.getElementById("result");
    const btnSijil = document.getElementById("btnSijil");

    if (!kod) {
        resultBox.innerHTML = "<span style='color:red;'>Sila masukkan kod.</span>";
        if(btnSijil) btnSijil.style.display = "none";
        return;
    }

    resultBox.innerHTML = "⏳ Sedang semak...";
    if(btnSijil) btnSijil.style.display = "none";

    try {

        const response = await fetch(CONFIG.API_URL + "?kod=" + encodeURIComponent(kod), {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
        }

        const data = await response.json();

        console.log("FULL DATA RECEIVED:", data);

        if (!data.success) {
            resultBox.innerHTML = `<div style="color:red;">❌ ${data.message || "Kod tidak sah."}</div>`;
            return;
        }

        // ===============================
        // SAFE STATUS HANDLING
        // ===============================

        const statusPenebusan = (data.status_penebusan || "").trim().toUpperCase();

        const STATUS_COLOR = {
            "TELAH DITEBUS": "#d4af37",
            "BELUM DITEBUS": "#28a745"
        };

        const badgeColor = STATUS_COLOR[statusPenebusan] || "#dc3545";

        // ===============================
        // CONFETTI (hanya jika sah)
        // ===============================

        if ((data.kod_siri_status || "").includes("SAH")) {
            if (typeof confetti === "function") {
                confetti({
                    particleCount: 120,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff99cc','#d4af37','#fff0f5']
                });
            }
        }

        // ===============================
        // PAPARAN DATA LENGKAP
        // ===============================

        resultBox.innerHTML = `
            <div class="result-card" style="position:relative;">
                <div class="watermark">GADIS QS HQ</div>

                <div style="margin-bottom:10px;">
                    <span style="
                        background:${badgeColor};
                        color:white;
                        padding:6px 12px;
                        border-radius:6px;
                        font-weight:bold;
                        display:inline-block;">
                        ${data.kod_siri_status || ""}
                    </span>
                </div>

                <p><strong>Nama:</strong> ${data.nama || "-"}</p>
                <p><strong>Hadiah:</strong> ${data.hadiah || "-"}</p>
                <p><strong>Status Kod:</strong> ${data.status_kod || "-"}</p>
                <p><strong>Pembelian Produk:</strong> ${data.pembelian_produk || "-"}</p>
                <p><strong>Harga:</strong> ${data.harga || "-"}</p>
                <p><strong>No. Telefon:</strong> ${data.no_telefon || "-"}</p>
                <p><strong>No. IC:</strong> ${data.no_ic || "-"}</p>
                <p><strong>Status Penebusan:</strong> ${data.status_penebusan || "-"}</p>
                <p><strong>Disahkan Oleh:</strong> ${data.disahkan_oleh || "-"}</p>
                <p><strong>Bandar / Negeri:</strong> ${data.bandar_negeri || "-"}</p>
            </div>
        `;

        // ===============================
        // SIJIL BUTTON
        // ===============================

        if (btnSijil && data.sijil_url) {
            btnSijil.href = data.sijil_url;
            btnSijil.style.display = "inline-block";
        }

    } catch (error) {
        console.error("FETCH ERROR:", error);
        resultBox.innerHTML = "<div style='color:red;'>❌ Ralat sambungan server.</div>";
    }
}
