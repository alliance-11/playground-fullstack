import { createContext, useContext, useEffect, useState } from "react"
import { checkAuthStatusApi } from '../helpers/apiCalls'

// BOX => enthält Daten
export const DataContext = createContext()

// little helper for grabbing data from box
export const useDataContext = () => {
  return useContext( DataContext )
}


// PROVIDER => Daten der Box zur Verfügung stellt
  /**
   * <DataProvider>
   *  <App> // => children
   *</DataProvider>
   */
export const DataProvider = ({ children }) => {

  // STATES

  // stored info about logged in user
  const [user, setUser] = useState() // default: Empty = not logged in
  const [errors, setErrors] = useState("")


  // on app start => or refresh => CHECK login status against backend!
  // whenever we reach out to fetch data => useEffect is our friend!
  useEffect(() => {

    // wrapper function => always necessary in use effect -> sadly :-(
    const checkAuthStatus = async () => {
      const result = await checkAuthStatusApi()

      // error => we are not logged in
      if(!result.error) {
        // no error => we got user back from backend
        setUser( result ) // store user data in state
      }
    }
    checkAuthStatus()

  }, []) // JUST check once on startup!



  // everything from context we want to share with components
  const sharedData = {
    user, setUser,
    errors, setErrors
  }

  // wrap provider around our APP and provide data
  return <DataContext.Provider value={  sharedData }>
    { children }
  </DataContext.Provider>

}