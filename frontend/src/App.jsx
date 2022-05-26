import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useDataContext } from "./contexts/DataProvider"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

function App() {

  // grab any errors from context and display at the top of app
  const { errors } = useDataContext()

  return (
    <div className="App">
      <header>
        {/* ERROR DISPLAY */}
        <div className="errors">{errors}</div>
        <h2>Manage your own book list!</h2>
        <Navbar />
      </header>
      <main>
        {/* PAGES */}
        <Routes>
          <Route path="/" element={<div>HomePage</div>}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
        </Routes>
      </main>

    </div>
  )
}

export default App
