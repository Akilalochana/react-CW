import { useState } from 'react'
import SearchComponent from './component/SearchComponent'
import MyNavbar from './component/MyNavbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'



function App() {


  return (
    <div className='app'>
    
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/propertydetails/:id' element={<PropertyDetails/>}></Route>
            
          </Routes>
        </BrowserRouter>
      </div>
    
    </div>
  )
}

export default App
