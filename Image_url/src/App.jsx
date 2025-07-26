import React, { useState, useRef } from 'react'
import Spiro from '/components/spiro'
import './App.css'

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const CLOUD_NAME = "dcmcrc4v3";
  const UPLOAD_PRESET = "101GuestHouse";

  const handleFiles = (files) => {
    const file = files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    setSelectedImage(file);
    setCopied(false);
  };

  const uploadImage = async () => {
    if (!selectedImage) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        setSelectedImage(null);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const copyToClipboard = () => {
    if (!imageUrl) return;
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen gap-5'>
      <div>
        <p className='text-4xl lg:text-6xl font-bold text-center'>📷Image Url Uploader</p>
        <p className='text-lg lg:text-2xl mt-4 text-center'>Upload your images and get the URL</p>
      </div>
      <div
        className={`p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center upload-area ${dragActive ? "active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onClick={handleBrowseClick}
        style={{ cursor: 'pointer', position: 'relative', width: '300px', height: '200px' }}
      >
        {selectedImage && (
          <>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-full h-full object-contain"
            />
            {!uploading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  uploadImage();
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Upload
              </button>
            )}
            {uploading && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spiro />
              </div>
            )}
          </>
        )}
        {!selectedImage && (
          <>
            <p className='text-center text-xl'>Drag and drop or click to select</p>
            <p className='text-center text-gray-400'>Supported formats: JPG, PNG, GIF</p>
            <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded' onClick={handleBrowseClick}>Browse Files</button>
          </>
        )}
        <input type="file" ref={fileInputRef} className='hidden' accept='image/*' onChange={handleFileChange} />
      </div>
      {imageUrl && (
        <div className='flex flex-col justify-center items-center'>
          <span>
            <p>Uploaded Image URL</p>
          </span>
          <span className='flex flex-col justify-center items-center gap-3'>
            <input type="text" className='border-2 border-gray-300 rounded p-2 mt-2 w-80 lg:w-100' value={imageUrl} readOnly />
            <button className='mt-2 bg-green-500 text-white py-2 px-4 rounded' onClick={copyToClipboard}>Copy URL</button>
            {copied && <p className='text-green-600 mt-1'>Copied📋</p>}
          </span>
        </div>
      )}
    </div>
  )
}

export default App
