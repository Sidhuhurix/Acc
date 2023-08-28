document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");
  const progressBar = document.getElementById("progressBar");
  const message = document.getElementById("message");
  const dropZone = document.getElementById("dropZone");

  dropZone.addEventListener("drop", handleDrop);

  function handleDrop(event) {
    event.preventDefault();

    const files = event.dataTransfer.files;
    handleFiles(files);
  }

  uploadButton.addEventListener("click", function () {
    const files = fileInput.files;
    if (files.length === 0) {
      message.textContent = "Please select files to upload.";
      return;
    }

    message.textContent = "";
    progressBar.style.width = "0%";

    for (const file of files) {
      if (!checkFileType(file)) {
        message.textContent = "Invalid file type.";
        return;
      }

      if (!checkFileSize(file)) {
        message.textContent = "File size exceeds 5MB limit.";
        return;
      }
    }

    // Simulating file upload progress
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 5;
        progressBar.style.width = `${progress}%`;
      } else {
        clearInterval(interval);
        message.textContent = "Files uploaded successfully.";
      }
    }, 300);


    const uploadContainer = document.getElementById("uploadContainer");
    uploadContainer.classList.add("success-container");
  });
  
  function handleDragEnter(event) {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  }

  function handleDragOver(event) {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  }

  function handleDragLeave(event) {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
  }

  function handleDrop(event) {
    event.preventDefault();
    dropZone.classList.remove("drag-over");

    const files = event.dataTransfer.files;
    handleFiles(files);
  }

  function checkFileType(file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/bmp", "image/webp", "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    return allowedTypes.includes(file.type);
  }

  function checkFileSize(file) {
    const maxSize = 10 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  }
});
