import { useState } from "react";

function Upload({onFileSelect}) {
  const [fileName, setFileName] = useState("");
  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }
    // Only allow PDF files
    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    // Limit file size to 20 MB
    if (selectedFile.size > 20 * 1024 * 1024) {
      alert("Please upload a PDF smaller than 20 MB.");
      return;
    }
    setFile(selectedFile);
    onFileSelect(file);
  }

  function removeFile() {
    setFile(null);
  }

  return (
    <div className="upload-container">
      <h2>Study Materials</h2>
      <p className="upload-description">
        Upload your textbook, lecture notes, or study materials
        so StudySpot can create a more personalized plan.
      </p>

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

        {fileName && (
          <p className="uploaded-file">
            ✓ {fileName}
          </p>
        )}
      </label>

     {/* file alr uploaded */}
      {onFileSelect&& (
        <div className="selected-file"> 
          <div>
            <strong>{onFileSelect.name}</strong>
            <p>
              {(onFileSelect.size / (1024 * 1024)).toFixed(2)} MB
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