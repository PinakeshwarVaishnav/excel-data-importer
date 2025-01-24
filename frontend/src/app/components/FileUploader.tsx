"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];

    if (
      uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      uploadedFile.size <= 2 * 1024 * 1024
    ) {
      setFile(uploadedFile);
      console.log("added uploaded file to the file state");
    } else {
      alert("Invalid file. Please upload a .xlsx file under 2 MB");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        "xlsx",
      ],
    },
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-md p-5 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the .xlsx file here</p>
        ) : (
          <p>Drag and drop an .xlsx file here, or click to select one</p>
        )}
      </div>
      {file && (
        <div>
          <p>Uploaded file: {file.name}</p>
          <p>File size: {file.size} MB</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
