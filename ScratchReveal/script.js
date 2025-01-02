const $canvas = document.querySelector('canvas');
const context = $canvas.getContext('2d');
const brushRadius = 45;
const image = new Image();

image.onload = function () {
  context.drawImage(image, 0, 0, $canvas.width, $canvas.height);
};

image.src =
  'https://codetheworld.io/wp-content/uploads/2023/11/rNPrrXG-censor.png';

function getBrushPosition(xRef, yRef) {
  const rect = $canvas.getBoundingClientRect();
  return {
    x: Math.floor(
      ((xRef - rect.left) / (rect.right - rect.left)) * $canvas.width,
    ),
    y: Math.floor(
      ((yRef - rect.top) / (rect.bottom - rect.top)) * $canvas.height,
    ),
  };
}

function drawDot(mouseX, mouseY) {
  context.beginPath();
  context.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
  context.fillStyle = '#000';
  context.globalCompositeOperation = 'destination-out';
  context.fill();
}

$canvas.addEventListener('mousemove', (e) => {
  const position = getBrushPosition(e.clientX, e.clientY);
  const isLeftButton = e.buttons === 1;
  if (isLeftButton) {
    drawDot(position.x, position.y);
  }
});
