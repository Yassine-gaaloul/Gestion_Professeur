import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddStudentForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/students`, { name, age, grade, email });
      setName('');
      setAge('');
      setGrade('');
      setEmail('');
      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.error || "Erreur lors de l'ajout de professeur");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Ajouter un Professeur</h2>
      <form onSubmit={addStudent} style={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Matière"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button
          type="submit"
          style={{ ...styles.button, ...styles.buttonHover }}
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '40px',
    backgroundColor: '#eaf6ff', // Bleu clair
    borderRadius: '10px',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Poppins", sans-serif',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2c3e50', // Bleu marine
    marginBottom: '30px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '15px 0',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #d1d1d1',
    fontSize: '18px',
    outline: 'none',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  inputFocus: {
    borderColor: '#3498db', // Bleu clair en focus
  },
  button: {
    marginTop: '20px',
    padding: '15px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#27ae60', // Vert vif
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    '&:hover': {
      backgroundColor: '#1e8449', // Vert sombre en hover
    },
  },
};

export default AddStudentForm;
