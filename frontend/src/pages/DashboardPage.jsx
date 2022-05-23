import { useEffect, useState } from "react";
import { fetchBooksApi } from "../helpers/apiCalls";

const DashboardPage = () => {

  const [books, setBooks] = useState([])

  // fetch data on page load
  useEffect(() => {

    // fetch books from API
    const fetchBooks = async () => {

      const result = await fetchBooksApi()

      // if error => show & return here
      if(result.error) {
        return console.log("[OUCH]", result.error)
      }
      // fetched data successfully
      setBooks(result)
    }
    fetchBooks()
    

  }, []) // just on first load!

  return ( 
    <div className="dashboard">
      {
        books.map( book => (
          <div key={book._id}>{book.title} ({book.author})</div>
        ))
      }
    </div>

   );
}
 
export default DashboardPage;