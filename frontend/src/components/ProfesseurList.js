import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/professeurs`);
      setStudents(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des Professeurs :", error);
    }
  };

  const deleteStudent = async (name) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/professeur-delete/${name}`);
      fetchStudents();
    } catch (error) {
      console.error("Erreur lors de la suppression de professeur :", error);
    }
  };

  const handleEdit = (student) => {
    navigate('/update', { state: { student } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Liste des Professeurs</h2>

      {/* Add Button */}
      <button style={styles.addButton} onClick={() => navigate('/add')}>
        <FaPlus style={styles.icon} /> Ajouter un Professeur
      </button>

      {/* Table */}
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableCell}>Nom</th>
            <th style={styles.tableCell}>Âge</th>
            <th style={styles.tableCell}>Matière</th>
            <th style={styles.tableCell}>Email</th>
            <th style={styles.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>{student.name}</td>
              <td style={styles.tableCell}>{student.age} ans</td>
              <td style={styles.tableCell}>{student.grade}</td>
              <td style={styles.tableCell}>{student.email}</td>
              <td style={styles.actionCell}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(student)}
                >
                  <FaEdit />
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteStudent(student.name)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Poppins", sans-serif',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    marginRight: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#34495e',
    color: '#ffffff',
  },
  tableCell: {
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '16px',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    transition: 'background-color 0.3s',
  },
  tableRowHover: {
    backgroundColor: '#f1f1f1',
  },
  actionCell: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default StudentList;
