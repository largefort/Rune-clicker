let hackSilver = localStorage.getItem('hackSilver') ? parseInt(localStorage.getItem('hackSilver')) : 0;
let hackSilverPerSecond = localStorage.getItem('hackSilverPerSecond') ? parseInt(localStorage.getItem('hackSilverPerSecond')) : 0;
let megaRune = localStorage.getItem('megaRune') ? parseInt(localStorage.getItem('megaRune')) : 0;
let autoClickers = localStorage.getItem('autoClickers') ? parseInt(localStorage.getItem('autoClickers')) : 0;

document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;

document.getElementById('rune').addEventListener('click', function() {
    hackSilver += megaRune ? 10 : 1;
    localStorage.setItem('hackSilver', hackSilver);
    document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('hackSilver', hackSilver);
    localStorage.setItem('hackSilverPerSecond', hackSilverPerSecond);
    localStorage.setItem('megaRune', megaRune);
    localStorage.setItem('autoClickers', autoClickers);
});

let switchButton = document.getElementById('mobileSwitch');
if (switchButton) {
    switchButton.addEventListener('click', function() {
        window.location.href = 'mobile.html';
    });
}

document.getElementById('buyUpgrade').addEventListener('click', function() {
    if (hackSilver >= 10) {
        hackSilver -= 10;
        hackSilverPerSecond++;
        localStorage.setItem('hackSilver', hackSilver);
        localStorage.setItem('hackSilverPerSecond', hackSilverPerSecond);
        document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
    } else {
        alert('You do not have enough HackSilver to buy this upgrade.');
    }
});

document.getElementById('buyMegaRune').addEventListener('click', function() {
    if (hackSilver >= 500 && !megaRune) {
        hackSilver -= 500;
        megaRune = 1;
        localStorage.setItem('hackSilver', hackSilver);
        localStorage.setItem('megaRune', megaRune);
        document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
        document.getElementById('buyMegaRune').textContent = 'Mega Rune purchased!';
    } else if (megaRune) {
        alert('You already have the Mega Rune!');
    } else {
        alert('You do not have enough HackSilver to buy the Mega Rune.');
    }
});

document.getElementById('buyAutoClicker').addEventListener('click', function() {
    if (hackSilver >= 1000) {
        hackSilver -= 1000;
        autoClickers++;
        localStorage.setItem('hackSilver', hackSilver);
        localStorage.setItem('autoClickers', autoClickers);
        document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
    } else {
        alert('You do not have enough HackSilver to buy an Auto Clicker.');
    }
});

setInterval(function() {
    hackSilver += hackSilverPerSecond;
    for (let i = 0; i < autoClickers; i++) {
        hackSilver += megaRune ? 10 : 1;
    }
    localStorage.setItem('hackSilver', hackSilver);
    document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
}, 1000);

document.getElementById('resetGame').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset the game? This will erase your progress!')) {
        localStorage.clear();
        hackSilver = 0;
        hackSilverPerSecond = 0;
        megaRune = 0;
        autoClickers = 0;
        document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
        document.getElementById('buyMegaRune').textContent = 'Buy Mega Rune for 500 HackSilver (increases HackSilver per click to 10)';
    }
});

document.getElementById('exportSave').addEventListener('click', function() {
    const saveData = {
        hackSilver: hackSilver,
        hackSilverPerSecond: hackSilverPerSecond,
        megaRune: megaRune,
        autoClickers: autoClickers
    };
    const saveDataText = JSON.stringify(saveData);
    navigator.clipboard.writeText(saveDataText).then(() => {
        alert('Save data copied to clipboard');
    }, (err) => {
        alert('Could not copy save data to clipboard');
    });
});

document.getElementById('importSave').addEventListener('click', function() {
    const saveDataText = prompt('Paste your save data');
    if (saveDataText) {
        try {
            const saveData = JSON.parse(saveDataText);
            hackSilver = saveData.hackSilver || 0;
            hackSilverPerSecond = saveData.hackSilverPerSecond || 0;
            megaRune = saveData.megaRune || 0;
            autoClickers = saveData.autoClickers || 0;
            localStorage.setItem('hackSilver', hackSilver);
            localStorage.setItem('hackSilverPerSecond', hackSilverPerSecond);
            localStorage.setItem('megaRune', megaRune);
            localStorage.setItem('autoClickers', autoClickers);
            document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
            if (megaRune) {
                document.getElementById('buyMegaRune').textContent = 'Mega Rune purchased!';
            }
        } catch (e) {
            alert('Invalid save data');
        }
    }
});
