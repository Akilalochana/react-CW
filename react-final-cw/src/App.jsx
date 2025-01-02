import { useState } from 'react'
import './App.css'
import SearchComponent from './component/SearchComponent'
import MyNavbar from './component/MyNavbar'



function App() {


  return (
    <div className='app'>
      <MyNavbar/>
      <SearchComponent/>
    
    </div>
  )
}

export default App
