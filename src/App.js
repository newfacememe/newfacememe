import React, { useRef, useState, useEffect } from 'react';

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
  const [faceLoaded, setFaceLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('memeGallery');
    if (saved) {
      setGallery(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (uploadedImage && faceLoaded) drawCanvas();
  }, [uploadedImage, faceImage, facePosition, faceSize, faceLoaded]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const loadFaceImage = () => {
    if (faceImage) return;
    const image = new Image();
    image.src = '/newface.png';
    image.onload = () => {
      setFaceImage(image);
      setFaceLoaded(true);
    };
  };

  const handleDownload = () => {
    drawCanvas();
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'newface-meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleTweet = () => {
    drawCanvas();
    const tweetUrl = `https://twitter.com/intent/tweet?text=Check+out+my+%23NewFace+meme!&hashtags=NewFace`;
    window.open(tweetUrl, '_blank');
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleSaveToGallery = () => {
    drawCanvas();
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

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;
    setFacePosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen font-retro flex flex-col`}>
      <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">NewFace</h1>
        <ul className="flex space-x-4 items-center">
          <li><a href="/" className="hover:text-yellow-300">Meme Maker</a></li>
          <li><a href="https://knowyourmeme.com/memes/newface" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">Lore</a></li>
          <li><a href="https://x.com/search?q=3zaxf282ydBP6CANCQv4bahpPThSUmcGMSVgMdDBpump" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">X</a></li>
          <li><a href="https://dexscreener.com/solana/9dh4ocz8oz6kvzrnofzj7ezkkmsqega54qakyptsxpss" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">DEXScreener</a></li>
          <li>
            <button onClick={toggleTheme} className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-2 rounded">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </li>
        </ul>
      </nav>

      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-4xl p-6 flex flex-col items-center space-y-6">
          <h2 className="text-3xl font-bold">🎭 NewFace Meme Maker</h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="bg-white text-black rounded px-2 py-1"
          />

          <button onClick={loadFaceImage} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add New Face</button>

          <div
            ref={containerRef}
            className="relative border border-gray-600 mt-4"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
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
            <button onClick={drawCanvas} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Render Meme</button>
            <button onClick={handleDownload} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">Download Meme</button>
            <button onClick={handleTweet} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Tweet #NewFace</button>
            <button onClick={handleSaveToGallery} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">Save to Gallery</button>
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
      </main>

      <footer className="text-center text-sm py-6 px-4 bg-gray-800 text-gray-300">
        <div className="mb-1">© 2025 NewFace Meme Maker</div>
        <div className="mb-1">Contract: <span className="font-mono text-yellow-400">3zaxf282ydBP6CANCQv4bahpPThSUmcGMSVgMdDBpump</span></div>
      </footer>
    </div>
  );
}
