import logo from './logo.svg';
import styles from './App.module.scss';
import {useState, useEffect} from 'react';

const App = () => {
  const [places, setPlaces] = useState([])
//1. on component load/mount lets make a call to our api and show some data on the page
  useEffect(()=> {
    fetch('http://localhost:8080').then((res)=> {
      return res.json()
  }).then(res =>{
    const apiplaces = res;
    setPlaces(apiplaces);
      console.log("here is the data");
      console.log(res);
    })
  }, []);
  return (
   <div className="App">

<section className={styles.place}>{places.map(place => <div>country:{place.country}, flighttime: {place.flighttime}, capital:{place.capital}, sights:{place.sights},image:<img src={place.image} alt={place.country}/></div>)}</section>
   </div>
  );
}

export default App;
