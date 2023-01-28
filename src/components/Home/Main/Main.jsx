import React from 'react';
import Typed from 'react-typed';
import './Main.scss';

const Main = () => {
  return (
    <main className="main">
      <div className="main__container container">
        <h3 className="main__container__title">
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
        <a href='#' className="main__container__button">Get started</a>
      </div>
    </main>
  );
}

export default Main;