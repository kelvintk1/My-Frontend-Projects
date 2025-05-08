import { useState } from 'react';
import './Main_page.css';
import { Link, useNavigate } from 'react-router-dom';
 
function Main_page() {
  const [leftImages, setLeftImages] = useState([
    { id: 1, src: './src/choose/guy_13.jpg' },
    { id: 2, src: './src/choose/guy_12.jpg' },
    { id: 3, src: './src/choose/guy_10.jpg' }
  ]);  
   
  const [rightImages, setRightImages] = useState([
    { id: 1, src: './src/choose/lady_5.jpg' },
    { id: 2, src: './src/choose/lady_2.jpg' },
    { id: 3, src: './src/choose/lady_7.jpg' }
  ]);

  // Track which image is being hovered to prevent flickering
  const [hoveredLeft, setHoveredLeft] = useState(null);
  const [hoveredRight, setHoveredRight] = useState(null);

  const handleHover = (images, setImages, setHovered, index) => {
    if (index === 1 || hoveredLeft === index || hoveredRight === index) return;
    
    setHovered(index);
    const newImages = [...images];
    [newImages[1], newImages[index]] = [newImages[index], newImages[1]];
    setImages(newImages);
    
    // Reset hover state after a short delay
    setTimeout(() => {
      setHovered(null);
    }, 500);
  };

  return (
    <div className="P-main-page">
      <Link to="/products/men" className='link-side'>
        <div className='main_part_1'>
            <h2 className='gender-labels'>Gentlemen</h2>
          <div className='main_1'>
            <div className="image-row">
              {leftImages.map((image, index) => (
                <div 
                  key={`left-${image.id}-${index}`}
                  className={`image-container ${index === 1 ? 'middle' : ''}`}
                  onMouseEnter={() => handleHover(leftImages, setLeftImages, setHoveredLeft, index)}
                >
                  <img src={image.src} alt={image.name} className="hover-image" />
                </div>
              ))}
            </div>
          </div>
          </div>
      </Link>
      <Link to="/products/ladies" className='link-side'>
        <div className='main_part_2'>
          <h2 className='gender-labels'>Ladies</h2>
        <div className='main_2'>
          <div className="image-row">
            {rightImages.map((image, index) => (
              <div 
                key={`right-${image.id}-${index}`}
                className={`image-container ${index === 1 ? 'middle' : ''}`}
                onMouseEnter={() => handleHover(rightImages, setRightImages, setHoveredRight, index)}
              >
                <img src={image.src} alt={image.name} className="hover-image" />
              </div>
            ))}
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
}

export default Main_page;