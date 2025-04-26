import { useState, useRef } from 'react';
import './Register.css';
import lock from './assets/checkout-lock-icon.png';
import user from './assets/fluent_person-48-regular.png';
import google from './assets/Google.png';
import group from './assets/Group.png';
import icon from './assets/icon.png';
import view from './assets/view.png';
import apple from './assets/devicon_apple.png';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [showPassword, setShowPassword] = useState([false, false]);
    const eyeRefs = [useRef(null), useRef(null)];
    const pupilRefs = [useRef(null), useRef(null)];
    const navigate = useNavigate();

    const handleMouseMove = (e, index) => {
        const eye = eyeRefs[index].current;
        const pupil = pupilRefs[index].current;
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

    const handleMouseLeave = (index) => {
        const pupil = pupilRefs[index].current;
        if (pupil) {
            pupil.style.left = '8px';
            pupil.style.top = '8px';
        }
    };

    const togglePassword = (index) => {
        const newShowPassword = [...showPassword];
        newShowPassword[index] = !newShowPassword[index];
        setShowPassword(newShowPassword);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Add your signup logic here
        // After successful signup, navigate to verify page
        navigate('/verify');
    };

    return (
        <div className='R-main'>
        <div className='R-page'>
            <div className="winking-emoji">
                <h1>Join Us Now</h1>
                <span className="emoji-face"></span>
            </div>
            <form onSubmit={handleSignUp}>
                <div className='R-input-fields'>
                    <span>
                        <img src={user} className='icons' alt="User icon"/>
                        <input type='text' placeholder='Full name' required/>
                    </span>
                </div>
                <div className='R-input-fields'>
                    <span>
                        <img src={icon} className='R-icons' alt="Email icon"/>
                        <input type='email' placeholder='Email' required/>
                    </span>
                </div>
                <div className='R-input-fields'>
                    <span>
                        <img src={lock} className='R-icons' alt="Lock icon"/>
                        <input 
                            type={showPassword[0] ? "text" : "password"} 
                            placeholder='Enter password' 
                            required
                        />
                    </span>
                    <span 
                        className='R-password-view-container'
                        onClick={() => togglePassword(0)}
                        onMouseMove={(e) => handleMouseMove(e, 0)}
                        onMouseLeave={() => handleMouseLeave(0)}
                        ref={eyeRefs[0]}
                    >
                        <div className="R-eye">
                            <div className={`R-eyelid ${showPassword[0] ? 'R-closed' : 'open'}`}>
                                <div className="R-pupil" ref={pupilRefs[0]}></div>
                            </div>
                        </div>
                    </span>
                </div>
                <div className='R-input-fields'>
                    <span>
                        <img src={group} className='R-icons' alt="Group icon"/>
                        <input
                            type={showPassword[1] ? "text" : "password"}
                            placeholder='Re-enter password'
                            required
                        />
                    </span>
                    <span 
                        className='R-password-view-container'
                        onClick={() => togglePassword(1)}
                        onMouseMove={(e) => handleMouseMove(e, 1)}
                        onMouseLeave={() => handleMouseLeave(1)}
                        ref={eyeRefs[1]}
                    >
                        <div className="R-eye">
                            <div className={`R-eyelid ${showPassword[1] ? 'closed' : 'open'}`}>
                                <div className="R-pupil" ref={pupilRefs[1]}></div>
                            </div>
                        </div>
                    </span>
                </div>
                <div className='R-sign-side'>
                    <Link to="/Home">
                    <button type="submit" className='R-signup-button'>Sign Up</button>
                    </Link>
                    <span className='R-or'><h3>_____ OR _____</h3></span>
                    <span className='R-buttons-container'>
                        <button type="button" className='R-sign-buttons'>
                            <img src={google} alt="Google"/> Google
                        </button>
                        <button type="button" className='R-sign-buttons'>
                            <img src={apple} alt="Apple"/> Apple
                        </button>
                    </span>
                    <span className='R-question-container'>
                        <h3 className='R-question'>Already have an account?🧐</h3>
                        <Link to="/login" className='R-yes-button-link'>
                            <button className='R-yes-button'>👍</button>
                            <h5 className='R-yes'>Yes</h5>
                        </Link>
                    </span>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Register;