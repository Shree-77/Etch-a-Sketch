const container = document.getElementById('container');

function makeDivs(num) {
    for (let i = 0; i < num * num; i++) {
        let cells = document.createElement('div');
        cells.classList.add('cell')
        container.appendChild(cells)
    }
}
makeDivs(16);

document.querySelectorAll('button').forEach(button => {
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
        cell.addEventListener('touchstart', () => {
            cell.style.backgroundColor = color;
        });
    });

}


