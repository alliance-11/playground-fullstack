import { useRef } from "react"
import { useNavigate, } from "react-router-dom"
import { signupApi } from "../helpers/apiCalls"


const SignupPage = () => {

  const nameRef = useRef()
  const emailRef = useRef()
  const pwRef = useRef()

  const navigate = useNavigate()

  // collect data
  // forward data to API function
  const onSignupSubmit = async (e) => {

    e.preventDefault() // stop browser from forwarding me to other page

    // forward data to API function
    const result = await signupApi(nameRef.current.value, emailRef.current.value, pwRef.current.value)

    // error on signup?
    if(result.error) {
      return console.log(result.error)
    }

    // signup worked => forward me!
    navigate("/")
  }

  return (
    <form onSubmit={onSignupSubmit}>
      <div>
        <input type="text" ref={nameRef} placeholder="Username..." />
      </div>
      <div>
        <input type="text" ref={emailRef} placeholder="Email..." />
      </div>
      <div>
        <input type="password" ref={pwRef} placeholder="Password..." />
      </div>
      <div>
        <button type="submit">Signup</button>
      </div>
    </form>
  )
}

export default SignupPage
