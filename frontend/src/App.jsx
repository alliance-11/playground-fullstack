import { NavLink, Route, Routes } from "react-router-dom"

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
          <Route path="/" element={<div>HomePage</div>}></Route>
          <Route path="/signup" element={<div>Signup Form</div>}></Route>
          <Route path="/login" element={<div>Login Form</div>}></Route>
          <Route path="/dashboard" element={<div>Dashboard</div>}></Route>
        </Routes>
        <form className="form-signup"></form>
      </header>
    </div>
  )
}

export default App
