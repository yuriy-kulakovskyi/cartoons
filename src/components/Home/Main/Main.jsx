import React, { useEffect } from 'react';
import Typed from 'react-typed';
import './Main.scss';
import aos from 'aos';
import 'aos/dist/aos.css';

const Main = () => {
  useEffect(() => {
    aos.init();
  }, []);

  return (
    <main className="main">
      <div className="main__container container">
        <h3 className="main__container__title" data-aos="fade-down">
          Know more about the 
          <br />
          <Typed 
            strings={[
              'cartoon',
              'characters']}
                typeSpeed={100}
                backSpeed={100}
                loop >
            </Typed></h3>
        <a href='#' className="main__container__button" data-aos="fade-up">Get started</a>
      </div>
    </main>
  );
}

export default Main;