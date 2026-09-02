import { useState } from "react";

function Upload({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Only allow PDF files
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    // Limit file size to 20 MB
    if (file.size > 20 * 1024 * 1024) {
      alert("Please upload a PDF smaller than 20 MB.");
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  }

  function removeFile() {
    setSelectedFile(null);
    onFileSelect(null);
  }

  return (
    <div className="upload-container">

      <h2>Study Materials</h2>

      <p className="upload-description">
        Upload your textbook, lecture notes, or study materials
        so StudySpot can create a more personalized plan.
      </p>

      {!selectedFile && (
        <label className="upload-box">

          <span className="upload-icon">↑</span>

          <span className="upload-title">
            Upload a PDF
          </span>

          <span className="upload-subtitle">
            Click to browse your files
          </span>

          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            hidden
          />

        </label>
      )}

      {selectedFile && (
        <div className="selected-file">

          <div>
            <strong>{selectedFile.name}</strong>

            <p>
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="remove-file"
          >
            Remove
          </button>

        </div>
      )}

    </div>
  );
}

export default Upload;

