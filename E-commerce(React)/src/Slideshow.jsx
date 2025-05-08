import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './slideshow.css';
import cover1 from './Gallary/cover_5.png';
import cover2 from './Gallary/cover_2.png';
import cover3 from './Gallary/cover_3.png';
import cover4 from './Gallary/cover_4.jpg';
import planet from './assets/world-market.png';

const Slideshow = () => {
    const navigate = useNavigate();
    const slides = [
        {
            id: 1,
            imageUrl: cover1,
            text: 'WELCOME TO',
        },
        {
            id: 2,
            imageUrl: cover2,
            text: 'WELCOME TO',
        },
        {
            id: 3,
            imageUrl: cover3,
            text: 'WELCOME TO',
        },
        {
            id: 4,
            imageUrl: cover4,
            text: 'WELCOME TO',
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                    <div className="slide-content">
                        {slide.text}<h1 className='brand'>KellyHub</h1><br/><img src={planet} alt="World Market"/>
                        <div className="jumping-emoji">😊</div>
                        <div className="spinning-emoji">🎉</div>
                        <h6 className='tagline'>Your hub for style, innovation, and the latest trends.</h6>
                    </div>
                </div>
            ))}
            <div className='buttons-container'>
                <button 
                    className="buttons"  
                    onClick={handleRegisterClick}
                >
                    Register Now
                </button>
                <button 
                    className="buttons" 
                    onClick={handleLoginClick}
                >
                    Login
                </button>
            </div>

            <div className="dots-container">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;