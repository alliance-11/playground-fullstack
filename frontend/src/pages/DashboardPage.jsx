import { useEffect, useState } from "react"
import { useDataContext } from "../contexts/DataProvider"
import { fetchBooksApi } from "../helpers/apiCalls"

const DashboardPage = () => {

  const { user } = useDataContext()

  const [books, setBooks] = useState([])

  // fetch data on page load
  // useEffect most of the time is responsible to FETCH DATA from backend
  // and store it in state
  useEffect(() => {

    // fetch books from API
    const fetchBooks = async () => {
      const result = await fetchBooksApi()

      // if error => show & return here
      if (result.error) {
        return console.log("[OUCH]", result.error)
      }
      // fetched data successfully
      setBooks(result)
    }
    
    // if logged in => fetch books!
    if(user) {
      fetchBooks()
    }
    // if not logged in => punish user!
    // else {
    //   setErrors("EY! Ohne Login => nix Daten! Geh weg!")
    // }
  }, [user]) // just on first load!

  return (
    <div className="dashboard">
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book._id}>
            <div>{book.title}</div>
            <div>{book.author}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
