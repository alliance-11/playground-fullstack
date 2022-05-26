import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDataContext } from "../contexts/DataProvider"
import { logoutApi } from "../helpers/apiCalls"

const Navbar = () => {
  // grab USER from our context box
  // => so we can determine if we are logged in or not
  const { user, setUser } = useDataContext()

  const navigate = useNavigate() 

  const handleLogout = (e) => {
    e.preventDefault() // prevent forwarding me to another page
    setUser() // clear the user from state

    // schlüssel auch beim backend wieder abgeben! sonst komme ich noch in den Raum rein!
    logoutApi() // will destroy session and invaliates cookie / key

    navigate("/login") // redirect to home
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="signup">Signup</NavLink>
      {!user && <NavLink to="login">Login</NavLink>}
      {user && (
        <NavLink onClick={handleLogout} to="#">
          Logout
        </NavLink>
      )}
      <NavLink to="dashboard">Dashboard</NavLink>
      {user && <span>{user.email}</span>}
    </nav>
  )
}

export default Navbar
