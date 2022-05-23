import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5000"

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

    // prepare Login OBJECT => with all data
    const userLogin = {
      email: emailRef.current.value,
      password: pwRef.current.value,
    }

    console.log(userLogin)

    // make LOGIN call to frntend
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(userLogin), // convert JS object to JSON string,
      headers: {
        "Content-Type": "application/json",        
      },
      // 1. STORE cookies we receive from backend => in browser
      // 2. SEND cookies we HAVE to backend
      credentials: 'include'
    })

    // parse response BODY
    const result = await response.json()

    // ERROR => login not successful!
    if(response.status !== 200) {
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
