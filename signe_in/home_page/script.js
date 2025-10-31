// Add sparkle animation & sound on lipstick hover
const lipsticks = document.querySelectorAll('.lipstick');

// Create sparkle element
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

// Hover effects
lipsticks.forEach(lipstick => {
  lipstick.addEventListener('mouseenter', e => {
    const audio = new Audio('hover.mp3'); // Add a short "pop" or "shimmer" sound
    audio.volume = 0.2;
    audio.play();

    for (let i = 0; i < 8; i++) {
      const x = e.pageX + Math.random() * 50 - 25;
      const y = e.pageY + Math.random() * 50 - 25;
      createSparkle(x, y);
    }
  });
});

// Sparkle CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, gold, transparent);
  border-radius: 50%;
  pointer-events: none;
  animation: sparkleMove 1s ease-out forwards;
}
@keyframes sparkleMove {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(2) translateY(-20px); }
}
`;
document.head.appendChild(sparkleStyle);
