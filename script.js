let hackSilver = localStorage.getItem('hackSilver') ? parseInt(localStorage.getItem('hackSilver')) : 0;
document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;

document.getElementById('rune').addEventListener('click', function() {
    hackSilver++;
    localStorage.setItem('hackSilver', hackSilver);
    document.getElementById('hackSilver').textContent = 'HackSilver: ' + hackSilver;
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('hackSilver', hackSilver);
});

let switchButton = document.getElementById('mobileSwitch');
if (switchButton) {
    switchButton.addEventListener('click', function() {
        window.location.href = 'mobile.html';
    });
}
