import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function MemeMaker() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [faceImage, setFaceImage] = useState(null);
  const [faceSize, setFaceSize] = useState(100);
  const [facePosition, setFacePosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('memeGallery');
    if (saved) {
      setGallery(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (uploadedImage) drawCanvas();
  }, [uploadedImage, faceImage, facePosition, faceSize]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const loadFaceImage = () => {
    const image = new Image();
    image.src = '/newface.png';
    image.onload = () => setFaceImage(image);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'newface-meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleTweet = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=Check+out+my+%23NewFace+meme!&hashtags=NewFace`;
    window.open(shareUrl, '_blank');
  };

  const handleSaveToGallery = () => {
    const canvas = canvasRef.current;
    const newMeme = canvas.toDataURL();
    const updatedGallery = [newMeme, ...gallery];
    setGallery(updatedGallery);
    localStorage.setItem('memeGallery', JSON.stringify(updatedGallery));
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      if (faceImage) {
        ctx.drawImage(faceImage, facePosition.x, facePosition.y, faceSize, faceSize);
      }
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setFacePosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center space-y-6">
      <h1 className="text-4xl font-bold mb-4">🎭 NewFace Meme Maker</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4 bg-white text-black rounded px-2 py-1"
      />
      <Button onClick={loadFaceImage}>Add New Face</Button>
      <div
        ref={containerRef}
        className="relative border border-gray-600 mt-6"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="max-w-full" />
        {uploadedImage && faceImage && (
          <img
            src={faceImage.src}
            alt="Overlay"
            style={{
              position: 'absolute',
              top: facePosition.y,
              left: facePosition.x,
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              cursor: 'move'
            }}
            onMouseDown={handleMouseDown}
            draggable={false}
          />
        )}
      </div>
      <input
        type="range"
        min="50"
        max="300"
        value={faceSize}
        onChange={(e) => setFaceSize(parseInt(e.target.value))}
        className="w-64 mt-2"
      />
      <div className="space-x-4 mt-4">
        <Button onClick={drawCanvas}>Render Meme</Button>
        <Button onClick={handleDownload}>Download Meme</Button>
        <Button onClick={handleTweet}>Tweet #NewFace</Button>
        <Button onClick={handleSaveToGallery}>Save to Gallery</Button>
      </div>
      <div className="w-full mt-8">
        <h2 className="text-2xl mb-2">🖼 Meme Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((meme, idx) => (
            <img key={idx} src={meme} alt={`meme-${idx}`} className="w-full border border-white rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
