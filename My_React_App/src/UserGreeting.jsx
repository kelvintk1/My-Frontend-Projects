import propTypes from "prop-types";

function UserGreeting({
    isLoggedIn= false,
    username= "Guest"
}){

    return(isLoggedIn ? 
    <h2 className="welcome_message">Welcome {username}</h2>
    : <h2 className="login-prompt">Please log in to continue</h2>);
}
UserGreeting.propTypes = {
    isLoggedIn: propTypes.bool,
    username: propTypes.string
}
UserGreeting.defaultProps = {
    isLoggedIn: false,
    username: "Guest"
}

export default UserGreeting