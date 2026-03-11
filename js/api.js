window.fetchKodSiri = async function(kod) {

try {

const url = CONFIG.API_URL + "?kod=" + encodeURIComponent(kod);

console.log("REQUEST URL:", url);

const response = await fetch(url, {
method: "GET"
});

if (!response.ok) {
throw new Error("HTTP error " + response.status);
}

const data = await response.json();

console.log("FULL DATA:", data);

return data;

} catch (error) {

console.error("Fetch Error:", error);

return {
success:false,
message:"Ralat sambungan server."
};

}

};
