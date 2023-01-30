import React, { useEffect, useState } from 'react';
import './Episodes.scss';

// AOS
import aos from 'aos';
import 'aos/dist/aos.css';

// Pagination import
import Pagination from '@mui/material/Pagination';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [next, setNext] = useState("");
  const [inp, setInp] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // AOS initialization
    aos.init();

    fetch("https://rickandmortyapi.com/api/episode")
    .then(res => res.json())
    .then(data => {
      setPagesCount(data.info.pages);
      setEpisodes(data.results);
      setNext(data.info.next);
      console.log(data.results);
    })
  }, []);

  const [page, setPage] = useState(1);
  const PaginationChange = (event, page) => {
    setPage(page);

    fetch(next.slice(0, next.indexOf("=") + 1) + page)
      .then(response => response.json())
      .then(data => {
        setPagesCount(data.info.pages);
        setNext(data.info.next);
        setEpisodes(data.results);
      })

    if (page === pagesCount) {
      fetch(next.slice(0, next.indexOf("=") + 1) + page)
        .then(response => response.json())
        .then(data => {
          setPagesCount(data.info.pages);
          setNext(data.info.prev);
          setEpisodes(data.results);
        })
    }
  }

  const itemClickHandler = e => {
    setInp(e.target.textContent);
    setIsOpen(!isOpen);
  }

  const inputClickHandler = () => {
    setIsOpen(true);
  }

  const filteredNames = episodes.filter(character => {
    return character.name.toLowerCase().includes(inp.toLowerCase());
  })

  return (
    <section className="episodes" id="episodes">

      {/* Container */}
      <div className="episodes__container container">
        {/* Title */}
        <h1 className="episodes__container__title">Episodes</h1>

        {/* Wrapper for the input and dropdown menu */}
        <div className="form">
          {/* Search element */}
          <input 
            type="text" 
            className='episodes__container__input'
            value={inp}
            onChange={e => setInp(e.target.value)}
            onClick={inputClickHandler}
            placeholder="Search by the name"
          />

          {/* Dropdown menu */}
          <ul className="episodes__container__dropdown">

            {/* Dropdown menu items */}
            {inp && isOpen ? filteredNames.map((episode, key) => {
              return (
                <li 
                  key={key}
                  className="episodes__container__dropdown__item" 
                  onClick={itemClickHandler}
                  data-aos="fade-up"
                >
                  {episode.name}
                </li>
              );
              })
              : null
            }
          </ul>
        </div>

        <div className="episodes__container__episodes-wrap">
          {filteredNames.map((episode, key) => {
            return (
              <div data-aos="fade-up" className="episodes__container__episodes-wrap__episode" key={key}>
                <h3 className="episodes__container__episodes-wrap__episode__number">{episode.episode}</h3>
                <h3 className="episodes__container__episodes-wrap__episode__name">Name: <span>{episode.name}</span></h3>
                <p className="episodes__container__episodes-wrap__episode__airDate">Air Date: <span>{episode.air_date}</span></p>
                <p className="episodes__container__episodes-wrap__episode__url">Watch <a target="_blank" rel="noreferrer" href={episode.url}>episode</a></p>
              </div>
            )
          })}
        </div>

        <Pagination
          className='characters__container__navigation'
          count={pagesCount}
          page={page}
          onChange={PaginationChange}
        />
      </div>
    </section>
  );
}

export default Episodes;
