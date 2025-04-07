import propTypes from 'prop-types'

function Student({
    name = "Guest",
    age = 0,
    isStudent = false
  }){
    return(
        <div className="student">
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Student: {isStudent ? "Yes" : "No"}</p>
        </div>
    )
}

Student.propTypes = {
    name: propTypes.string,
    age: propTypes.number,
    isStudent: propTypes.bool
}

export default Student