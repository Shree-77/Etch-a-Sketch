// Default 16x16 row and column
let gridSize = 16;

// Selectors for buttons
const gridClear = document.getElementById('clearBtn');
const randomColorButton = document.getElementById('randomBtn');
const colorModeButton = document.getElementById('colorModeBtn');
const gridEraser = document.getElementById('eraserBtn');
const darkShade = document.getElementById('darkShadeBtn');
const sizeChange = document.getElementById('sizeBtn');
const colorPicker = document.getElementById('colorPicker');
const buttons = document.querySelectorAll('button');


// Utility functions
function createSquare(className = '') {
    const square = document.createElement('div');
    square.classList.add(className);
    return square;
}

function applyColor(square, color) {
    square.style.backgroundColor = color;
}

function removeEventListeners() {
    const squares = document.querySelectorAll('.column');
    squares.forEach(square => {
        const newSquare = square.cloneNode(true);
        square.parentNode.replaceChild(newSquare, square);
    });
}

// Event listeners for buttons
gridClear.addEventListener('click', () => {
    const squares = document.querySelectorAll('.column');
    squares.forEach(square => applyColor(square, 'white'));
});

randomColorButton.addEventListener('click', () => {
    //1. After refactor (did not work)
    //changeColor(getRandomColor());
    //2. Original Code
    removeEventListeners();
    const squares = document.querySelectorAll('.column');
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            isDragging = true;
            applyColor(square, getRandomColor());
        });
        square.addEventListener('mouseenter', () => {
            if (isDragging === true) {
                applyColor(square, getRandomColor());
            }
        });
        square.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
});

colorPicker.addEventListener('input', () => {
    let selectedColor = colorPicker.value;
    changeColor(selectedColor);
});

colorModeButton.addEventListener('click', () => {
    let selectedColor = colorPicker.value;
    changeColor(selectedColor);
});

gridEraser.addEventListener('click', () => {
    changeColor('white');
});

darkShade.addEventListener('click', () => {
    applyDarkShade();
});

sizeChange.addEventListener('click', getUserInput);

// Functions for changing colors
let isDragging = false;
function changeColor(color) {
    removeEventListeners();
    const squares = document.querySelectorAll('.column');
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            isDragging = true;
            applyColor(square, color);
        });
        square.addEventListener('mouseenter', () => {
            if (isDragging === true) {
                applyColor(square, color);
            }
        });
        square.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}

// Apply dark shading effect
let currentDarkness = 1;
function applyDarkShade() {
    removeEventListeners();
    const squares = document.querySelectorAll('.column');
    let currentDarkness = 1;
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            isDragging = true;
            applyDarkness(square, currentDarkness)
        });
        square.addEventListener('mouseenter', () => {
            if (isDragging === true) {
                applyDarkness(square, currentDarkness)
            }
        });
        square.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}

function applyDarkness(square, currentDarkness) {
    const newDarkness = Math.max(currentDarkness - 0.2, 0);
    const currentColor = window.getComputedStyle(square).backgroundColor;
    const currentRGB = currentColor.match(/\d+/g);
    const newColor = `rgb(${Math.floor(currentRGB[0] * newDarkness)}, ${Math.floor(currentRGB[1] * newDarkness)}, ${Math.floor(currentRGB[2] * newDarkness)})`;
    applyColor(square, newColor);
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Resize columns and rows when gridSize changes
function resizeColumnsAndRows() {
    const containerWidth = 960;
    const columnWidth = containerWidth / gridSize;
    const rowHeight = containerWidth / gridSize;

    const columns = document.querySelectorAll('.column');
    const rows = document.querySelectorAll('.row');

    columns.forEach(column => {
        column.style.width = `${columnWidth}px`;
    });

    rows.forEach(row => {
        row.style.height = `${rowHeight}px`;
    });
}

// Create initial grid
function addSquares() {
    for (let i = 0; i < gridSize; i++) {
        const row = createSquare('row');
        grid.appendChild(row);
        for (let j = 0; j < gridSize; j++) {
            const column = createSquare('column');
            row.appendChild(column);
        }
    }
}

// Handle user input for gridSize change
function getUserInput() {
    const userInput = +prompt("Grid Size (Up to 100): ");
    if (userInput !== null) {
        if (userInput <= 100) {
            grid.innerHTML = '';
            gridSize = userInput;
            addSquares(gridSize);
            resizeColumnsAndRows(gridSize);
        } else {
            alert("Please enter a value up to 100.");
        }
    } else {
        alert("No input was provided.");
    }
}

// Function to handle button clicks
function handleButtonClick(event) {
    buttons.forEach(button => {
        button.classList.remove('clicked');
    });
    event.currentTarget.classList.add('clicked');
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Initialize the grid
const grid = document.getElementById('grid');
addSquares();
resizeColumnsAndRows();