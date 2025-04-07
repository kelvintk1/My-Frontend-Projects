
function Card(){
    return(
        <div className="card">
            <img src="src/assets/kevin.jpg" alt="Profile Picture" className="profile_pic"></img>
            <h2 className="card-title">Kelvin Tetteh</h2>
            <p className="card-text">I  am a student from the University of Ghana, Legon persuing my Bachelor's Degree in Information Technology. I love coding</p>
        </div>
    )
}

export default Card

// .card{
//     border: 1px solid rgb(173, 169, 169);
//     border-radius: 10px;
//     box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.568);
//     padding: 20px;
//     margin: 10px;
//     text-align: center;
//     max-width: 250px;
//     display: inline-block;
//   }
//   .profile_pic{
//     max-width: 60%;
//     height: auto;
//     border-radius: 50%;
//     margin-bottom: 10px;
//   }
//   .card-title{
//     font-family: Arial, sans-serif;
//     color: black;
//     margin: 0;
//   }
//   .card-text{
//     font-family: Arial, sans-serif;
//     color: black;
//   }