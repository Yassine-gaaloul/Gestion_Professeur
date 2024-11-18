import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateStudentForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state?.student || {};

  const [name, setName] = useState(student.name || '');
  const [age, setAge] = useState(student.age || '');
  const [subject, setSubject] = useState(student.grade || '');
  const [email, setEmail] = useState(student.email || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/students/${student.name}`,
        {
          name,
          age,
          subject,
          email,
        }
      );
      navigate('/'); // Retourner à la liste après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Modifier les Détails du Professeur</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        {/* Nom */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex : Jean Dupont"
            required
            style={styles.input}
          />
        </div>

        {/* Âge */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Âge :</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ex : 35"
            required
            style={styles.input}
          />
        </div>

        {/* Matière */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Matière :</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex : Mathématiques"
            required
            style={styles.input}
          />
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex : jean.dupont@example.com"
            required
            style={styles.input}
          />
        </div>

        {/* Bouton de soumission */}
        <button type="submit" style={styles.updateButton}>
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '60px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: '"Poppins", sans-serif',
  },
  heading: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  formGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#34495e',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #dfe6e9',
    transition: 'border-color 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  inputFocus: {
    borderColor: '#3498db',
  },
  updateButton: {
    gridColumn: 'span 2',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#0984e3',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
  },
  updateButtonHover: {
    backgroundColor: '#74b9ff',
  },
};

export default UpdateStudentForm;
