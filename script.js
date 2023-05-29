const form = document.querySelector('form');
const colorInput = document.getElementById('color');
const selectInput = document.getElementById('mode');
const colorPaletteContainer = document.querySelector('.color-palette-container');

fetch(`https://www.thecolorapi.com/scheme?hex=66CCFF&mode=analogic`)
    .then(res => res.json())
    .then(data => renderPalette(data));

function renderPalette(data) {
    data.colors.forEach(color => {
        const colorContainer = document.createElement('div');
                colorContainer.classList.add('color-container', 'flex');
                const colorSwatch = document.createElement('div');
                colorSwatch.classList.add('color');
                colorSwatch.style.backgroundColor = color.hex.value;
                const colorCode = document.createElement('div');
                colorCode.classList.add('color-code', 'flex');
                colorCode.textContent = color.hex.value;
                colorContainer.append(colorSwatch, colorCode)
                colorPaletteContainer.append(colorContainer);
    })
    addClipBoardFunctionality();
}

function addClipBoardFunctionality() {
    document.querySelectorAll('.color-code').forEach(colorCode => {
        colorCode.addEventListener('click', e => {
            const originalText = e.target.textContent;
            navigator.clipboard.writeText(originalText);
            colorCode.textContent = 'Copied!';
            setTimeout(() => colorCode.textContent = originalText, 1000);
        })
    })
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const hexParameter = colorInput.value.substr(1);
    const modeParameter = selectInput.value;
    colorPaletteContainer.innerHTML = '';
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexParameter}&mode=${modeParameter}`)
        .then(res => res.json())
        .then(data => renderPalette(data));
})
