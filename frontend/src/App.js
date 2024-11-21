import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddprofesseurForm from './components/AddProfesseurForm'; 
import UpdateProfesseurForm from './components/UpdateProfesseurForm';
import StudentList from './components/ProfesseurList'; // Liste principale

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '70px' }}> 
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddprofesseurForm />} />
          <Route path="/update" element={<UpdateProfesseurForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
