// Fetch points when the button is clicked
document.getElementById('fetchPoints').addEventListener('click', async function () {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) {
        alert('Please enter your name.');
        return;
    }

    const sheetId = '1xR1gcOyaAosC7EikXpPfuDQJinWuHKCFQHcw-6a7uu4'; // Replace with your Google Sheet ID
    const range = 'Sheet1!A:C'; // Assuming Name is in A, Points in B, Prev Points in C

    try {
        // Fetch data from the Google Sheets API
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=AIzaSyCZs5suLIdDJ8K48wRUM2WiFiMXx6tLuMM`
        );
        const data = await response.json();

        // Get the sheet data rows
        const rows = data.values;

        // Find the row for the entered name
        const userRow = rows.find(row => row[0].toLowerCase() === name.toLowerCase());

        if (!userRow) {
            document.getElementById('pointsDisplay').innerHTML = `<span style="color:red;">User not found</span>`;
            return;
        }

        // Extract points and previous points from the user row
        const points = parseInt(userRow[1], 10);
        const prevPoints = parseInt(userRow[2], 10);
        const diff = points - prevPoints;

        // Generate the difference display based on whether points increased or decreased
        const diffDisplay = diff > 0 ? `<span style="color:green;">(+${diff})</span>` : `<span style="color:red;">(${diff})</span>`;

        // Update the points display with the gold "IP" and points in white, diff in green or red
        document.getElementById('pointsDisplay').innerHTML = `<span class="ip-text">IP</span><span class="points-text">${points}</span> ${diffDisplay}`;
    } catch (error) {
        console.error("Error fetching data from Google Sheets: ", error);
        document.getElementById('pointsDisplay').innerHTML = `<span style="color:red;">Error fetching data</span>`;
    }
});

// Background music controls
const backgroundMusic = document.getElementById('backgroundMusic');
document.getElementById('playMusic').addEventListener('click', () => {
    backgroundMusic.play();
});

document.getElementById('pauseMusic').addEventListener('click', () => {
    backgroundMusic.pause();
});
