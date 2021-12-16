
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter,Route } from 'react-router-dom';
import CreateProject from './Components/CreateProject';
import CreateUser from './Components/CreateUser';
import ProjectList from './Components/ProjectList';
import EditProject from './Components/EditProject';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'

class App extends Component {
  render(){
  return (
  <div>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<ProjectList/> }/>
      <Route path='/edit/:id' element={<EditProject/> }/>
      <Route path='/create' element={<CreateProject/>} />
      <Route path='/user' element={<CreateUser/>} />
     
    </Routes>
    </div>
  );
}
}

export default App;
