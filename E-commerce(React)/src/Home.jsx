import Header from "./Home/Header.jsx";
import Main_page from "./Home/Main_page.jsx";
import './Home.css'

function Home({cartCount, profileImage}) {

    return (
        <div className="home-page">
            {/* Pass prop to hide second header */}
            <Header hideSecondHeader={true} cartCount={cartCount} profileImage={profileImage} />
            <Main_page />
        </div>
    );
}

export default Home;
