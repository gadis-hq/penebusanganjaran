async function generateSijil(nama, hadiah, bandar) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'pt', 'a4');

    // Background warna merah jambu emas
    doc.setFillColor(255, 224, 240); // light pink
    doc.rect(0, 0, 842, 595, 'F');

    // Header
    doc.setFontSize(28);
    doc.setTextColor("#d4af37");
    doc.setFont("helvetica", "bold");
    doc.text("GADIS QS HQ - SIJIL PENEBUSAN", 421, 80, { align: "center" });

    // Nama
    doc.setFontSize(22);
    doc.setTextColor("#333");
    doc.text(`Diberikan kepada: ${nama}`, 421, 150, { align: "center" });

    // Hadiah
    doc.setFontSize(20);
    doc.text(`Hadiah: ${hadiah}`, 421, 200, { align: "center" });

    // Bandar / Negeri
    doc.text(`Bandar/Negeri: ${bandar}`, 421, 240, { align: "center" });

    // Watermark GADIS QS HQ
    doc.setFontSize(60);
    doc.setTextColor("rgba(212,175,55,0.1)");
    doc.text("GADIS QS HQ", 421, 350, { align: "center", angle: -30 });

    // Footer / QR Code (boleh tambah QR link jika perlu)
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text("Disahkan oleh GADIS QS HQ", 421, 550, { align: "center" });

    // Generate blob URL
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    return url;
}
