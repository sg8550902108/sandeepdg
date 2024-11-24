document.getElementById('compressButton').addEventListener('click', () => {
  const input = document.getElementById('imageInput').files[0];
  
  if (!input) {
    alert('Please select an image first.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Resize the image
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Compress the image
      const quality = 0.7; // Compression quality (0 to 1)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

      // Display the compressed image
      const compressedImage = document.getElementById('compressedImage');
      compressedImage.src = compressedDataUrl;

      // Enable download
      const downloadLink = document.getElementById('downloadLink');
      downloadLink.href = compressedDataUrl;
      document.getElementById('output').style.display = 'block';
    };
  };

  reader.readAsDataURL(input);
});
