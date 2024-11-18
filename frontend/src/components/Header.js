import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img 
          src="image.jpg" // Remplacez par le chemin de votre logo
          alt="App Logo" 
          style={styles.logo} 
        />
        <Link to="/" style={styles.iconLink}>
          <span style={styles.appName}>Gestion de Professeur</span>
        </Link>
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          <FaHome style={styles.icon} />
          <span style={styles.navText}>Accueil</span>
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#34495e', // Bleu marine foncé
    padding: '15px 25px',
    color: '#ffffff',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    fontFamily: '"Poppins", sans-serif',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  appName: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#ffffff',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    gap: '8px',
  },
  navLinkHover: {
    color: '#1abc9c', // Vert clair pour hover
  },
  icon: {
    fontSize: '24px',
  },
  navText: {
    fontSize: '16px',
  },
};

export default Header;
