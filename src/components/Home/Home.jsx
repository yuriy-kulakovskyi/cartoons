import React from 'react';
import Header from './Header/Header';
import './Home.scss';

const Home = () => {
  return (
    // Home section
    <section className='home'>
      {/* Background image  */}
      <img src={process.env.PUBLIC_URL + './img/background.webp'} alt="Background" className='home__background' />
      <Header />
    </section>
  );
}

export default Home;