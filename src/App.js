// Minimalist and modern layout injected based on trololol.app design
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
    if (saved) setGallery(JSON.parse(saved));
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
    const link = document.createElement('a');
    link.download = 'newface-meme.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleTweet = () => {
    drawCanvas();
    const tweetUrl = `https://twitter.com/intent/tweet?text=Check+out+my+%23NewFace+meme!&hashtags=NewFace`;
    window.open(tweetUrl, '_blank');
  };

  const handleSaveToGallery = () => {
    drawCanvas();
    const newMeme = canvasRef.current.toDataURL();
    const updatedGallery = [newMeme, ...gallery];
    setGallery(updatedGallery);
    localStorage.setItem('memeGallery', JSON.stringify(updatedGallery));
  };

  const drawCanvas = () => {
    if (!uploadedImage) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      if (faceImage) ctx.drawImage(faceImage, facePosition.x, facePosition.y, faceSize, faceSize);
    };
    img.src = uploadedImage;
  };

  const handleMouseDown = (e) => setDragStartAndDragging(e.clientX, e.clientY);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => handleDragMove(e.clientX, e.clientY);
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    setDragStartAndDragging(t.clientX, t.clientY);
  };
  const handleTouchMove = (e) => {
    const t = e.touches[0];
    handleDragMove(t.clientX, t.clientY);
  };
  const handleTouchEnd = () => setIsDragging(false);

  const setDragStartAndDragging = (x, y) => {
    setIsDragging(true);
    setDragStart({ x, y });
  };
  const handleDragMove = (x, y) => {
    if (!isDragging) return;
    const dx = x - dragStart.x;
    const dy = y - dragStart.y;
    setFacePosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setDragStart({ x, y });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-black'} min-h-screen font-sans`}> 
      <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-700 sticky top-0 z-10 bg-inherit backdrop-blur">
        <h1 className="text-xl font-semibold tracking-tight">NewFace</h1>
        <nav className="flex space-x-6 text-sm">
          <a href="/">Meme Maker</a>
          <a href="https://knowyourmeme.com/memes/newface" target="_blank" rel="noreferrer">Lore</a>
          <a href="https://x.com/search?q=3zaxf282ydBP6CANCQv4bahpPThSUmcGMSVgMdDBpump" target="_blank" rel="noreferrer">X</a>
          <a href="https://dexscreener.com/solana/9dh4ocz8oz6kvzrnofzj7ezkkmsqega54qakyptsxpss" target="_blank" rel="noreferrer">DEX</a>
          <button onClick={toggleTheme}>{darkMode ? '☀️ Light' : '🌙 Dark'}</button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 py-12 space-y-10">
        <section className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">🎭 NewFace Meme Maker</h2>
          <input type="file" accept="image/*" onChange={handleUpload} className="rounded border px-3 py-2 text-black" />
          <button onClick={loadFaceImage} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow">Add New Face</button>

          <div
            ref={containerRef}
            className="relative border border-dashed border-gray-400 rounded mt-4"
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
            className="w-64 mt-4"
          />

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={drawCanvas} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow">Render</button>
            <button onClick={handleDownload} className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded shadow">Download</button>
            <button onClick={handleTweet} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow">Tweet</button>
            <button onClick={handleSaveToGallery} className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded shadow">Save</button>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">🖼 Meme Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((meme, idx) => (
              <img key={idx} src={meme} alt={`meme-${idx}`} className="w-full rounded border" />
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center text-sm py-6 px-4 border-t border-gray-800">
        <p>© 2025 NewFace Meme Maker</p>
        <p className="text-xs mt-1">Contract: <span className="font-mono text-yellow-400">3zaxf282ydBP6CANCQv4bahpPThSUmcGMSVgMdDBpump</span></p>
      </footer>
    </div>
  );
}
