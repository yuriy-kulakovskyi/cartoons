import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import './Home.css';
import Main from './Main/Main';

const Home = () => {
  return (
    // Home section
    <section className='home' id="home">
      {/* Header */}
      <Header />

      {/* Main */}
      <Main />

      {/* Footer */}
      <Footer />
    </section>
  );
}

export default Home;