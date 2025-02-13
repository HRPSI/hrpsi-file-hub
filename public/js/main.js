
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    if (dropZone) {
      // Prevent default drag behaviors
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, e => e.preventDefault());
        dropZone.addEventListener(evt, e => e.stopPropagation());
      });
  
      // Highlight on dragover
      dropZone.addEventListener('dragover', () => {
        dropZone.classList.add('drop-zone-hover');
      });
  
      // Remove highlight on dragleave
      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drop-zone-hover');
      });
  
      // Handle dropped files
      dropZone.addEventListener('drop', (e) => {
        dropZone.classList.remove('drop-zone-hover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          uploadFiles(files);
        }
      });
    }
  });
  
  async function uploadFiles(files) {
    try {
      const formData = new FormData();
      for (const file of files) {
        // Must match the field name 'files'
        formData.append('files', file);
      }
  
      // Optional: show a loader if you have one
      // document.getElementById('loaderOverlay').style.display = 'flex';
  
      const response = await fetch('/files/upload', {
        method: 'POST',
        body: formData
      });
  
      // Hide loader
      // document.getElementById('loaderOverlay').style.display = 'none';
  
      if (response.ok) {
        window.location.reload(); // reload to see new files
      } else {
        const err = await response.text();
        alert(`Error: ${err}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading files');
    }
  }



//   document.addEventListener('DOMContentLoaded', () => {
//     // HIDE LOADER ON PAGE LOAD (for demonstration)
//     const loader = document.getElementById('loaderOverlay');
//     loader.style.display = 'none';
  
//     const uploadForm = document.getElementById('uploadForm');
    
//     // PREVENT FORM'S NORMAL SUBMISSION
//     uploadForm.addEventListener('submit', async (event) => {
//       event.preventDefault(); // stop the default page reload
  
//       // SHOW LOADER
//       loader.style.display = 'flex';
  
//       // Collect the file(s) in a FormData object
//       const formData = new FormData(uploadForm);
  
//       try {
//         // Example: Upload via Fetch instead of normal form submit
//         const response = await fetch('/files/upload', {
//           method: 'POST',
//           body: formData
//         });
  
//         // Optional: Simulate a slow upload so we can see the loader:
//         // await new Promise(res => setTimeout(res, 3000));
  
//         if (!response.ok) {
//           const errMsg = await response.text();
//           alert(`Upload failed: ${errMsg}`);
//         } else {
//           alert('Upload succeeded!');
//         }
//       } catch (err) {
//         console.error('Error uploading:', err);
//         alert('Error uploading');
//       } finally {
//         // HIDE LOADER (if you want to keep it until you redirect, remove this line)
//         loader.style.display = 'none';
  
//         // Possibly redirect or reload
//         window.location.reload();
//       }
//     });
//   });