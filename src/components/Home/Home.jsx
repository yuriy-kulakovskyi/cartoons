import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import './Home.scss';
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