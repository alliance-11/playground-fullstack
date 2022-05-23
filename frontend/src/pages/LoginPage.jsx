import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../helpers/apiCalls"

// CRA way of loading env
// const API_URL = process.env.REACT_APP_API_URL
const API_URL = import.meta.env.VITE_API_URL //"http://localhost:5000"

console.log( API_URL )

const LoginPage = () => {

  // STATES

  // errors STATE
  const [errors, setErrors] = useState("")

  // form STATE
  const nameRef = useRef()
  const emailRef = useRef()
  const pwRef = useRef()

  // navigate hook (to navigate between pages using JavaScript!)
  const navigate = useNavigate()

  const onLoginSubmit = async (e) => {

    e.preventDefault() // stop browser from forwarding me to other page

    console.log("Submitted")

    // make LOGIN call to frntend
    const result = await loginApi(emailRef.current.value, pwRef.current.value)

    // ERROR => login not successful!
    if(result.error) {
      return setErrors(result.error)
    }

    // ON SUCCESSFUL LOGIN
    console.log(result)
    setErrors("") // clear error message

    // REDIRECT to dashboard page (route "dashboard")
    navigate("/dashboard", { replace: true })
  }

  return (
    <form onSubmit={onLoginSubmit}>
      <div>
        <input type="text" ref={emailRef} placeholder="Email..." />
      </div>
      <div>
        <input type="password" ref={pwRef} placeholder="Password..." />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div className="errors" style={{ color: 'red', fontWeight: "bold" }}>
        { errors }
      </div>
    </form>
  )
}

export default LoginPage
