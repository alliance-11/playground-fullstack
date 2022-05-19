import { NavLink, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="signup">Signup</NavLink>
          <NavLink to="login">Login</NavLink>
          <NavLink to="dashboard">Dashboard</NavLink>
        </nav>
        <h2>Manage your own book list!</h2>
        <Routes>
          <Route path="/" element={ <div>HomePage</div> }></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
        </Routes>
        <form className="form-signup"></form>
      </header>
    </div>
  )
}

export default App
