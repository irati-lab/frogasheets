// 1. Zure Google Sheets esteka gordeko dugu aldagai batean
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXkWKtxhTS5x4YzcaKXPs6-jHb7i1XIPRld6BUKmQGiD2_B-1qZAwAxVPL5MClsqtnI3VzvyLnuuYN/pub?output=csv';

// 2. Funtzio asinkrono bat sortuko dugu (denbora behar baitu Internetetik datuak ekartzeko)
async function datuakKargatu() {
    try {
        // Google-ri datuak eskatu (Fetch)
        const erantzuna = await fetch(url);
        const datuakCSV = await erantzuna.text();
        
        // 3. Datuak prestatu: lerro bakoitza banatu
        const lerroak = datuakCSV.split('\n');
        
        // 4. Gure HTML-ko "kutxa hutsa" aukeratu
        const kutxa = document.getElementById('liburu-zerrenda');
        
        // Zerrenda bat sortzen hasiko gara
        let htmlEdukia = '<ul>';
        
        // 5. Lerroz lerro irakurri (1etik hasten gara, 0 izenburuak direlako)
        for (let i = 1; i < lerroak.length; i++) {
            const lerroa = lerroak[i];
            
            // Lerroa hutsik ez badago...
            if (lerroa.trim() !== "") {
                // Zutabeak komaz banatu
                const zutabeak = lerroa.split(',');
                
                // Gure hiru zutabeak (Izenburua, Egilea, Urtea)
                const izenburua = zutabeak[0];
                const egilea = zutabeak[1];
                const urtea = zutabeak[2];
                const generoa = zutabeak[3];
                
                // HTML formatuan gehitu zerrendara
                htmlEdukia += `<li>
                                  <strong>${izenburua}</strong> 
                                  - ${egilea} (${urtea}) <br> 
                                  <span style="color: #7f8c8d; font-size: 0.9em;">Generoa: ${generoa}</span>
                               </li>`;
            }
        }
        
        htmlEdukia += '</ul>';
        
        // 6. Kutxa hutsaren barruan gure zerrenda sartu eta "Kargatzen..." mezua ezabatu
        kutxa.innerHTML = htmlEdukia;
        document.querySelector('p').style.display = 'none';

    } catch (errorea) {
        // Arazoren bat badago, kontsolan abisatu
        console.error('Arazo bat egon da datuak kargatzean:', errorea);
    }
}

// 7. Funtzioa martxan jarri!
datuakKargatu();
// 3. Iragazkiaren funtzioa (BERRIA)
function liburuakIragazi() {
    // 1. Zer aukeratu dugu menuan?
    const aukeratutakoGeneroa = document.getElementById('generoa-aukeratu').value;
    
    // 2. Hartu pantailako liburu (txartel) guztiak
    const txartelak = document.querySelectorAll('#liburu-zerrenda li');
    
    // 3. Banan-banan begiratu
    txartelak.forEach(txartela => {
        // Txartelaren barruko testuak aukeratutako generoa badu (edo "Guztiak" bada)
        if (aukeratutakoGeneroa === 'Guztiak' || txartela.innerHTML.includes(aukeratutakoGeneroa)) {
            txartela.style.display = 'block'; // Erakutsi
        } else {
            txartela.style.display = 'none'; // Ezkutatu
        }
    });
}
