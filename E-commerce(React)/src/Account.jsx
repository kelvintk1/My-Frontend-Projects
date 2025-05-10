import Header from "./Home/Header";
import cameraIcon from '/assets/camera-icon.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'

function Account({ cartCount, profileImage, updateProfileImage }) {
    const [selectedFileName, setSelectedFileName] = useState('');
    const [tempImage, setTempImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(true);
    const navigate = useNavigate();

    const handleFileInputClick = () => {
        document.getElementById('file-input').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
            const reader = new FileReader();
            reader.onload = () => {
                setTempImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = () => {
        if (tempImage) {
            updateProfileImage(tempImage);
            setTempImage(null);
            setSelectedFileName('');
            alert('Profile image updated successfully!');
        }
    };

    const handleDeleteImage = () => {
        updateProfileImage('https://cdn-icons-png.flaticon.com/512/3135/3135715.png');
        setTempImage(null);
        setSelectedFileName('');
    };

    const handleDone = () => {
        if (name.trim() && email.trim()) {
            setIsEditing(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            navigate('/');
        }
    };

    return (
        <div className='account-main-page'>
            <Header hideSecondHeader={true} cartCount={cartCount} profileImage={profileImage} />
            <div className='account-page'>
                <div className='profile-container_1'>
                    <span className='profile-image-container'>
                        <img src={profileImage} alt='profile' className='profile-image' />
                    </span>
                    <input
                        type='file'
                        accept='image/*'
                        id='file-input'
                        className='profile-image-input'
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <span className='camera-icon-container' onClick={handleFileInputClick}>
                        <img src={cameraIcon} alt='Upload' className='camera-icon' />
                    </span>
                    {selectedFileName && (
                        <p className='file-name'>Selected File: {selectedFileName}</p>
                    )}
                    <span className='profile-btns'>
                        <button
                            className='profile-image-button'
                            onClick={handleUploadImage}
                            disabled={!tempImage}
                        >
                            Upload
                        </button>
                        <button className='profile-image-button' onClick={handleDeleteImage}>
                            Delete
                        </button>
                    </span>
                    <span className='profile-details'>
                        {isEditing ? (
                            <>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    className='profile-name-input'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    className='profile-email-input'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </>
                        ) : (
                            <>
                                <h1 className='profile-name'>UserName: {name}</h1>
                                <h3 className='profile-email'>Email: {email}</h3>
                            </>
                        )}
                    </span>
                    <span className='profile-btns'>
                        {isEditing ? (
                            <button className='profile-details-btn' onClick={handleDone}>
                                Done
                            </button>
                        ) : (
                            <button className='profile-details-btn' onClick={handleEdit}>
                                Edit
                            </button>
                        )}
                    </span>
                </div>
                <div className='logout-container'>
                    <button className='logout-button' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Account;