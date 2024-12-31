import { useState } from 'react'
import './App.css'
import prop1pic1Img from './images/prop1pic1small.jpg'
import SearchComponent from './component/SearchComponent'

function App() {

  let properties = [
    {
      "id": "prop1",
      "type": "House",
      "bedrooms": 3,
      "price": 750000,
      "tenure": "Freehold",
      "description": "Attractive three-bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes, and National Trust woodland.",
      "location": "Petts Wood Road, Petts Wood, Orpington BR5",
      "picture": prop1pic1Img,
      "url": "properties/prop1.html",
      "added": {
        "month": "October",
        "day": 12,
        "year": 2022
      }
    },

  ]

  return (
    <div className='app'>
      <SearchComponent/>
      <ul>
        {properties.map((property) =>(
          <li key={property.id}>{property.type} <img style={{"width":"100px"}} src={property.picture} alt="" /></li>
        ))}
      </ul>
    </div>
  )
}

export default App
