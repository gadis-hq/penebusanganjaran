async function fetchKodSiri(kod) {
    try {
        const response = await fetch(
            CONFIG.API_URL + "?kod=" + encodeURIComponent(kod),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        console.log("FULL DATA:", data); // untuk debug

        return data;

    } catch (error) {
        console.error("Fetch Error:", error);
        return { success:false, message:"Ralat sambungan server." };
    }
}
