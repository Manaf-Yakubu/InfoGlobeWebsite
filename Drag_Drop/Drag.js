const draggables = document.querySelectorAll('.draggable');
const dropBoxes = document.querySelectorAll('.drop-box');

draggables.forEach(img => {
  img.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', img.dataset.name);
    e.dataTransfer.setDragImage(img, 50, 50);
  });
});

dropBoxes.forEach(box => {
  box.addEventListener('dragover', (e) => {
    e.preventDefault();
    box.classList.add('over');
  });

  box.addEventListener('dragleave', () => {
    box.classList.remove('over');
  });

  box.addEventListener('drop', (e) => {
    e.preventDefault();
    const name = e.dataTransfer.getData('text/plain');
    const draggedImg = document.querySelector(`.draggable[data-name="${name}"]`);

    // Allow only one image per box
    if (!box.querySelector('img')) {
      box.appendChild(draggedImg);
    }

    box.classList.remove('over');
  });
});
const imageContainer = document.querySelector('.image-container');
const resetButton = document.getElementById('resetBtn');

// Store original positions of images
const originalImages = Array.from(draggables).map(img => img.cloneNode(true));

// Reset functionality
resetButton.addEventListener('click', () => {
  dropBoxes.forEach(box => {
    const img = box.querySelector('img');
    if (img) box.removeChild(img);
  });

  // Clear container first
  imageContainer.innerHTML = '';

  // Re-add cloned original images
  originalImages.forEach(img => {
    const clone = img.cloneNode(true);
    imageContainer.appendChild(clone);
  });

  // Reattach drag events
  const newDraggables = document.querySelectorAll('.draggable');
  newDraggables.forEach(img => {
    img.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', img.dataset.name);
      e.dataTransfer.setDragImage(img, 50, 50);
    });
  });
});

// Back to home
function goBack() {
  window.location.href = "Home.html"; 
}
