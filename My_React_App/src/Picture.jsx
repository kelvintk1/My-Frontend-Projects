// import Kevin from './assets/kevin.jpg';

function Picture() {

    const kevin_url = './src/assets/kevin.jpg'
    const handleClick = (e) => e.target.style.display = "none";
    return (<img onClick={(e) => handleClick(e)} src={kevin_url} alt="Kevin" className="kevin_pic"></img>);
}

export default Picture;