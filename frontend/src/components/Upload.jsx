import { useRef, useState } from "react";

function Upload({ files, setFiles }) {
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);

    const validFiles = selectedFiles.filter((file) => {
      if (file.type !== "application/pdf") {
        alert(`${file.name} is not a PDF file.`);
        return false;
      }

      if (file.size > 20 * 1024 * 1024) {
        alert(`${file.name} is larger than 20 MB.`);
        return false;
      }

      return true;
    });

    setFiles((previous) => [...previous, ...validFiles]);

    // Reset the input so the user can select the same file again if needed
    event.target.value = "";
  }

  function removeFile(indexToRemove) {
    setFiles((previous) =>
      previous.filter((_, index) => index !== indexToRemove)
    );
  }

  return (
    <div className="upload-container">
      <h2>Study Materials</h2>

      <p className="upload-description">
        Upload your textbook, lecture notes, or study materials
        so StudySpot can create a more personalized plan. Max 5 files.
      </p>

      {/* Files that have already been uploaded */}
      {files.length > 0 && (
        <div className="selected-files">
          {files.map((file, index) => (
            <div className="selected-file" key={`${file.name}-${index}`}>
              <div>
                <strong>📄 {file.name}</strong>
                <p>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="remove-file"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload box ALWAYS stays visible */}
      <label className="upload-box">
        <span className="upload-icon">↑</span>
        <span className="upload-title">
          {files.length === 0
            ? "Upload a PDF"
            : "Upload another PDF"}
        </span>
        <span className="upload-subtitle">
          Click to browse your files
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          hidden
        />
      </label>
    </div>
  );
}

export default Upload;