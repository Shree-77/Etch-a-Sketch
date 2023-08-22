const container = document.getElementById('container');
const gridSize = document.getElementById('SetGridSize');
const reset = document.getElementById('reset');
const rgb = document.getElementById('rgb');

function makeDivs(num) {
    for (let i = 0; i < num * num; i++) {
        let cells = document.createElement('div');
        cells.classList.add('cell');
        container.appendChild(cells);
    }
}

function randomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

reset.addEventListener('click', () => {
    const res = document.querySelectorAll('.cell');
    res.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
});

rgb.addEventListener('click', () => {
    const setcolor = document.querySelectorAll('.cell');
    setcolor.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = randomRGB();
        });
    });
});

gridSize.addEventListener('click', () => {
    let num = prompt('Enter grid Size');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    makeDivs(num);
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        Sketch(button.value);
    });
});

function Sketch(color) {
    const setcolor = document.querySelectorAll('.cell');
    setcolor.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = color;
        });
        cell.addEventListener('click', () => {
            cell.style.backgroundColor = color;
        });
    });
}
