import React, { useEffect, useState } from 'react';
import './Episodes.css';

// AOS
import aos from 'aos';
import 'aos/dist/aos.css';

// Pagination import
import Pagination from '@mui/material/Pagination';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  
  const PaginationChange = (event, page) => setPage(page);

  useEffect(() => {
    // AOS initialization
    aos.init();

    fetch(`https://rickandmortyapi.com/api/episode/?name=${name}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      setPagesCount(data.info.pages);
      setEpisodes(data.results);
    })
  }, [name, page]);

  const itemClickHandler = e => {
    setName(e.target.textContent);
    setIsOpen(!isOpen);
  }

  const inputClickHandler = () => {
    setIsOpen(true);
  }

  return (
    <section className="episodes" id="episodes">

      {/* Container */}
      <div className="episodes__container container">
        {/* Title */}
        <h1 className="container__title">Episodes</h1>

        {/* Wrapper for the input and dropdown menu */}
        <div className="form">
          {/* Search element */}
          <input 
            type="text" 
            className='container__input'
            value={name}
            onChange={e => {setName(e.target.value)}}
            onClick={inputClickHandler}
            placeholder="Search by the name"
          />

          {/* Dropdown menu */}
          <ul className="container__dropdown">

            {/* Dropdown menu items */}
            {name && isOpen ? episodes.map((episode, key) => {
              return (
                <li 
                  key={key}
                  className="dropdown__item" 
                  onClick={itemClickHandler}
                >
                  {episode.name}
                </li>
              );
              })
              : null
            }
          </ul>
        </div>

        <div className="container__episodes-wrap">
          {episodes.map((episode, key) => {
            return (
              <div data-aos="fade-up" className="episodes-wrap__episode" key={key}>
                <h3 className="episodes-wrap__episode__number">{episode.episode}</h3>
                <h3 className="episodes-wrap__episode__name">Name: <span>{episode.name}</span></h3>
                <p className="episodes-wrap__episode__airDate">Air Date: <span>{episode.air_date}</span></p>
                <p className="episodes-wrap__episode__url">Watch the <a target="_blank" rel="noreferrer" href={episode.url}>episode</a></p>
              </div>
            )
          })}
        </div>

        <Pagination
          className='characters__container__navigation container__navigation'
          count={pagesCount}
          page={page}
          onChange={PaginationChange}
        />
      </div>
    </section>
  );
}

export default Episodes;
