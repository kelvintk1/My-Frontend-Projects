import { useNavigate } from 'react-router-dom';
import './Verify.css';
import lock from './assets/checkout-lock-icon.png';
import user from './assets/fluent_person-48-regular.png';
import google from './assets/Google.png';
import group from './assets/Group.png';
import icon from './assets/icon.png';
import view from './assets/view.png';
import apple from './assets/devicon_apple.png';
import { Link } from 'react-router-dom';

function Verify() {
    const navigate = useNavigate();

    const handleVerification = (e) => {
        e.preventDefault();
        // Add your verification logic here
        // After successful verification, navigate to home/dashboard
        navigate('/');
    };

    const handleResendCode = () => {
        // Add your resend code logic here
        alert('New verification code has been sent!');
    };

    return (
        <div className='main'>
        <div className='page'>
            <div className="winking-emoji">
                <h1>Verify Account🔐</h1>
            </div>
            <form onSubmit={handleVerification}>
                <div className='input-fields'>
                    <span>
                        <input 
                            type='text' 
                            placeholder='Enter verification code' 
                            required
                            pattern="[0-9]{6}"
                            title="Please enter a 6-digit verification code"
                        />
                    </span>
                </div>
                <div className='message'>
                    <h3>Code has been sent to gajm@gmail.com.</h3>
                    <h3>Enter the code to verify your account.</h3>
                </div>
                <div className='resend-container'>
                    <h3 className='resend-message'>Didn't receive code?</h3>
                    <button 
                        type="button" 
                        className='resend-buttons'
                        onClick={handleResendCode}
                    >
                        Resend
                    </button>
                </div>
                <div className='sign-side'>
                    <Link to="/Home">
                    <button type="submit" className='signup-button'>Verify</button>
                    </Link>
                    <div className='back-to-login'>
                        <Link to="/login" className='back-link'>
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Verify;