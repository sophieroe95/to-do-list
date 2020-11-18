import { useEffect, useState } from 'react';
import styles from "./App.module.scss";
import iceland from "./iceland.jpg"

const App = () => {
  // Store our data/collections here for us to show
  const [data, setData] = useState([]);
  // Store the name of the person we are going to create
  // NOTE: this is the value in the form input
  const [country, setCountry] = useState("")
  const [sights, setSights] = useState("")
  useEffect(() => {
    // 1. On component load/mount let's make a call to our API and show some data on the page....
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch('https://node-api-sr.herokuapp.com/').then((res) => {
      return res.json()
    }).then(res => {
      setData(res)
    })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  }

  const handleSubmit = (e) => {
    // Stop our page submitting
    e.preventDefault();

    // *********************************
    // 3. TODO!! Let's make POST request to our API...
    // *********************************
    const fetchOptions = {
      // This is a POST Request
      method: 'POST',
      // We are gonna send JSON
      headers: { 'Content-Type': 'application/json' },
      // Data goes in the body
      body: JSON.stringify({ "country": country, "sights": sights, })
    }
    fetch('https://node-api-sr.herokuapp.com/', fetchOptions)
      .then(res => res.json())
      .then(res => {
        console.log("YAY WE GOT OUR RESPONSE BACK....")
        handleFetch();
      })
  }

  const handleDelete = (doc) => {
    const fetchOptions = {
      // This is a POST Request
      method: 'DELETE',
      // We are gonna send JSON
      headers: { 'Content-Type': 'application/json' },
      // Data goes in the body
      body: JSON.stringify(doc)
    }
    // const fetchOptions = { method: 'DELETE'}
    fetch('https://node-api-sr.herokuapp.com/', fetchOptions)
      .then(() => {
        console.log("sucessfully deleted" + doc.name)
        handleFetch();
      })
  }
  return (
    <div className={styles.page}>
      <h1 >Travel Destinations</h1>
      {/* We'll use this later once we have some information in our database
          to show on the page...... */}
      {data.map(data => (<div><p>Country: {data.country}</p><p>Sights: {data.sights}</p> <button onClick={() => handleDelete(data)}>Done!</button></div>))}
      <form className={styles.form}>
        <h2>Add your dream travel destination!</h2>
        {/* We need to keep track of this textbox so we know what to send */}
        <div><label>Country: </label>
        <input type="text" id="country" onChange={(e) => setCountry(e.target.value)} /></div>
        <div><label>Sights: </label>
        <input type="text" id="sights" onChange={(e) => setSights(e.target.value)} /></div>
        {/* ON CLICK - we need to send some information to the API */}
        <button onClick={handleSubmit}>Add</button>
      </form>
      <img src={iceland} alt=""/>
    </div>
  );
}
export default App;