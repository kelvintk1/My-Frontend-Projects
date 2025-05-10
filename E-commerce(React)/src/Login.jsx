import { useState, useRef } from 'react';
import './Login.css';
import lock from '/assets/checkout-lock-icon.png';
import user from '/assets/fluent_person-48-regular.png';
import google from '/assets/Google.png';
import group from '/assets/Group.png';
import icon from '/assets/icon.png';
import view from '/assets/view.png';
import apple from '/assets/devicon_apple.png';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const eyeRef = useRef(null);
    const pupilRef = useRef(null);
    const navigate = useNavigate();

    const handleMouseMove = (e) => {
        const eye = eyeRef.current;
        const pupil = pupilRef.current;
        if (!eye || !pupil) return;

        const rect = eye.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate pupil position (limited to stay within eye)
        const pupilX = Math.max(4, Math.min(16, x - 4));
        const pupilY = Math.max(4, Math.min(16, y - 4));

        pupil.style.left = `${pupilX}px`;
        pupil.style.top = `${pupilY}px`;
    };

    const handleMouseLeave = () => {
        const pupil = pupilRef.current;
        if (pupil) {
            pupil.style.left = '8px';
            pupil.style.top = '8px';
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here
        // After successful login, navigate to home/dashboard
        navigate('/');
    };

    return (
        <div className='L-main'>
        <div className='L-page'>
            <div className="winking-emoji">
                <h1>Welcome Back</h1>
                <div className="L-jumping-emoji">😊</div>
                <div className="L-spinning-emoji">🎉</div>
            </div>
            <form onSubmit={handleLogin}>
                <div className='L-input-fields'>
                    <span>
                        <img src={icon} className='icons' alt="Email icon"/>
                        <input type='email' placeholder='Email' required/>
                    </span>
                </div>
                <div className='L-input-fields'>
                    <span>
                        <img src={lock} className='L-icons' alt="Lock icon"/>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder='Enter password' 
                            required
                        />
                    </span>
                    <span 
                        className='L-password-view-container'
                        onClick={togglePassword}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        ref={eyeRef}
                    >
                        <div className="L-eye">
                            <div className={`L-eyelid ${showPassword ? 'L-closed' : 'open'}`}>
                                <div className="L-pupil" ref={pupilRef}></div>
                            </div>
                        </div>
                    </span>
                </div>
                <div className='L-forgotten-container'>
                    <h3 className='L-question'>🤥Forgotten your password?🤔</h3>
                    <Link to="/verify" className='L-yes-button-link'>
                        <button className='L-yes-button_1'>👍</button>
                        <h5 className='L-yes_1'>Yes</h5>
                    </Link>
                </div>
                <div className='L-sign-side'>
                    <Link to="/Home">
                    <button type="submit" className='L-signup-button'>Login</button>
                    </Link>
                    <span className='L-or'><h3>_____ OR _____</h3></span>
                    <span className='L-buttons-container'>
                        <button type="button" className='L-sign-buttons'>
                            <img src={google} alt="Google"/> Google
                        </button>
                        <button type="button" className='L-sign-buttons'>
                            <img src={apple} alt="Apple"/> Apple
                        </button>
                    </span>
                    <span className='L-question-container'>
                        <h3 className='L-question'>You have no account?🧐</h3>
                        <Link to="/register" className='L-yes-button-link'>
                            <button className='L-yes-button'>👍</button>
                            <h5 className='L-yes'>Yes</h5>
                        </Link>
                    </span>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Login;