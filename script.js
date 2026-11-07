// --- 1. Drag to Look (Parallax) ---
const scene = document.getElementById('scene');
const room = document.getElementById('room');
const resetBtn = document.getElementById('reset-btn');

const DEFAULT_ROTATE_X = -35;
const DEFAULT_ROTATE_Y = -45;

let isDragging = false;
let startX, startY;
let rotateX = DEFAULT_ROTATE_X; 
let rotateY = DEFAULT_ROTATE_Y;  

scene.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    room.style.transition = 'transform 0.1s ease-out';
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    rotateY += deltaX / 2; 
    rotateX -= deltaY / 2;

    room.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
});

resetBtn.addEventListener('click', () => {
    room.style.transition = 'transform 0.8s ease-out';
    room.style.transform = `rotateX(${DEFAULT_ROTATE_X}deg) rotateY(${DEFAULT_ROTATE_Y}deg)`;
    rotateX = DEFAULT_ROTATE_X;
    rotateY = DEFAULT_ROTATE_Y;
});

// --- 2. Modal & File Menu Logic ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeBtn = document.getElementById('close-btn');

const fileMenu = document.getElementById('file-menu');
const closeFileMenu = document.getElementById('close-file-menu');

function openModal(title, text) {
    modalTitle.innerText = title;
    modalText.innerText = text;
    modal.style.display = 'flex';
}

function openFileMenu() {
    fileMenu.style.display = 'flex';
}

closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
closeFileMenu.addEventListener('click', () => { fileMenu.style.display = 'none'; });

// --- 3. Monitor Interactions ---
const monitorScreen = document.getElementById('monitor-screen');
let clickCount = 0;

document.getElementById('monitor-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    clickCount++;
    
    monitorScreen.classList.add('glitching');
    setTimeout(() => { monitorScreen.classList.remove('glitching'); }, 300);

    if (clickCount >= 3) {
        clickCount = 0;
        openFileMenu();
    } else {
        monitorScreen.innerText = "> ACCESSING...";
        setTimeout(() => { monitorScreen.innerText = "> whoami"; }, 500);
    }
});

// --- 4. File Menu Content ---
document.getElementById('file-1-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    fileMenu.style.display = 'none';
    openModal("My Interests", "Photography, Nature, and knowing more about Space. I love capturing the unseen and exploring the cosmos through a lens.");
});

document.getElementById('file-2-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    fileMenu.style.display = 'none';
    openModal("What I'm Pursuing", "B.Tech CSE with a specialization in Software Product Engineering at Kalvium. Building products that merge art and code.");
});

document.getElementById('file-3-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    fileMenu.style.display = 'none';
    openModal("My Basics", "Java, Python, HTML, CSS, and JavaScript. Currently diving deep into TypeScript and interactive web design.");
});

document.getElementById('frame-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal("About Me", "First-year B.Tech CSE student at Kalvium. I build interactive, 3D web experiences that stand out from the standard template portfolios.");
});

document.getElementById('cat-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    alert("Meow! You found me. Keep coding.");
});

// --- 5. Typing Effect ---
const textToType = "> initializing portfolio...\n> loading 3D engine...\n> whoami = 'developer';\n> ready.";
const typingElement = document.getElementById('typing-text');
let i = 0;

function typeWriter() {
    if (i < textToType.length) {
        if (textToType.charAt(i) === '\n') {
            typingElement.innerHTML += '<br>';
        } else {
            typingElement.innerHTML += textToType.charAt(i);
        }
        i++;
        setTimeout(typeWriter, 50);
    } else {
        setTimeout(() => {
            i = 0;
            typingElement.innerHTML = '';
            typeWriter();
        }, 3000);
    }
}
setTimeout(typeWriter, 1000);

// --- 6. THEME TOGGLE & CURSOR EFFECTS ---
const lampBtn = document.getElementById('lamp-btn');
const canvas = document.getElementById('stardust');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let currentTheme = 1;
const maxThemes = 4;

// Theme & Cursor definitions
const themes = {
    1: { class: 'theme-1', cursor: 'stardust', colors: ['#00f3ff', '#ff00ff'] },
    2: { class: 'theme-2', cursor: 'bubbles', colors: ['#ff00ff', '#ffffff'] },
    3: { class: 'theme-3', cursor: 'matrix', colors: ['#39ff14'] },
    4: { class: 'theme-4', cursor: 'square', colors: ['#7000ff', '#ffcc00'] }
};

let currentCursorType = themes[1].cursor;
let currentColors = themes[1].colors;

lampBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Remove old theme class
    document.body.classList.remove(themes[currentTheme].class);
    
    // Update theme counter
    currentTheme = currentTheme >= maxThemes ? 1 : currentTheme + 1;
    
    // Add new theme class
    document.body.classList.add(themes[currentTheme].class);
    
    // Update Cursor variables
    currentCursorType = themes[currentTheme].cursor;
    currentColors = themes[currentTheme].colors;
    
    // Clear existing particles for a clean switch
    particles = [];
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (e) => {
    // Spawn particles based on the cursor type
    if (currentCursorType === 'stardust') {
        for (let i = 0; i < 3; i++) particles.push(new Particle(e.clientX, e.clientY, 'stardust'));
    } else if (currentCursorType === 'bubbles') {
        particles.push(new Particle(e.clientX, e.clientY, 'bubbles'));
    } else if (currentCursorType === 'matrix') {
        particles.push(new Particle(e.clientX, e.clientY, 'matrix'));
    } else if (currentCursorType === 'square') {
        for (let i = 0; i < 2; i++) particles.push(new Particle(e.clientX, e.clientY, 'square'));
    }
});

class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = currentColors[Math.floor(Math.random() * currentColors.length)];
        this.life = 1;
        
        // Customize properties based on particle type
        if (type === 'stardust') {
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.fade = 0.02;
        } else if (type === 'bubbles') {
            this.size = Math.random() * 8 + 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * -3 - 1; // Float up
            this.fade = 0.015;
        } else if (type === 'matrix') {
            this.size = Math.random() * 2 + 1;
            this.speedX = 0;
            this.speedY = Math.random() * 4 + 2; // Fall down
            this.fade = 0.03;
        } else if (type === 'square') {
            this.size = Math.random() * 6 + 2;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.fade = 0.04;
            this.rotation = Math.random() * Math.PI;
        }
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.fade;
        if (this.type === 'square') this.rotation += 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        
        if (this.type === 'square') {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            ctx.restore();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();