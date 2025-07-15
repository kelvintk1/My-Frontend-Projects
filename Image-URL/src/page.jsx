import React, { useRef, useState } from 'react';
import './page.css';
import SplitText from "./SplitText";

function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef();

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  const handleBrowseClick = () => {
    setError('');
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, and GIF files are allowed.');
      setSelectedFile(null);
      setPreviewUrl('');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError('');
    setImageUrl('');
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', '101GuestHouse');
      const res = await fetch('https://api.cloudinary.com/v1_1/dcmcrc4v3/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        setError('Upload failed.');
      }
    } catch (err) {
      setError('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-evenly">
      <div className="flex-initial">
        <SplitText
          text="IMAGE UPLOADER URL"
          className="text-4xl font-bold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <p className='text-gray-400 text-center mt-4'>Upload your image and get a shareable URL</p>
      </div>
      <div className="border-dashed border-2 w-96 h-52 rounded-lg flex flex-col items-center justify-center">
        <p className='text-gray-400 text-xl'>Drag and drop or click to select</p>
        <p className='text-gray-400'>Supported formats: JPG, PNG, GIF</p>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded mt-10'
          onClick={handleBrowseClick}
        >
          Browse Files
        </button>
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      {previewUrl && (
        <div className="relative group mt-4">
          <span
            className='w-72 h-40 rounded-sm flex items-center justify-center bg-center bg-cover bg-no-repeat relative'
            style={{ backgroundImage: `url(${previewUrl})` }}
          >
            {!uploading && (
              <button
                className='bg-blue-500 text-white py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                onClick={handleUpload}
              >
                Upload
              </button>
            )}
            {uploading && (
              <div className="spiro">
                <div className="spiro">
                  <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
              </div>
            )}
          </span>
        </div>
      )}
      <div>
        <p className='text-gray-400 mt-4'>Uploaded image URL</p>
        <input
          type="text"
          value={imageUrl}
          readOnly
          placeholder='Copy image url'
          className='border border-gray-300 rounded-lg p-2 w-80 mt-2'
        />
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded mt-4 ml-3'
          onClick={handleCopy}
          disabled={!imageUrl}
        >
          Copy
        </button>
        {copied && <span className="ml-2 text-green-500">Copied!</span>}
      </div>
    </div>
  );
}

export default Page;
