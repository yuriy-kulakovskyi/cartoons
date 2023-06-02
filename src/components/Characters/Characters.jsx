import React, { useState, useEffect } from 'react';
import './Characters.css';
import aos from 'aos';
import 'aos/dist/aos.css';

// Pagination links
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Filter from './Filter/Filter';
import Popup from './Popup/Popup';

// API link
const API = "https://rickandmortyapi.com/api/character/"

const Characters = () => {
  const [pages, setPages] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState("");

  const [isOpen, setOpen] = useState(false);

  let [speciesOptUpd, setSpeciesOptUpd] = useState([]);
  let [statusOptUpd, setStatusOptUpd] = useState([]);
  let [genderOptUpd, setGenderOptUpd] = useState([]);

  const [species, setSpecies] = useState([]);
  const [status, setStatus] = useState([]);
  const [gender, setGender] = useState([]);
  
  const [page, setPage] = useState(1);

  const handleClickOpen = character => {
    setOpen(true);

    setInfo(
      {
        image: character.image,
        name: character.name,
        episode: character.episode[0],
        gender: character.gender,
        location: character.location.name,
        species: character.species,
        status: character.status,
      }
    );

    document.body.style.overflow = 'hidden';
    document.querySelector(".hide").style.opacity = '.5';
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = 'scroll';
    document.querySelector(".hide").style.opacity = '1';
  };

  useEffect(() => {
    aos.init();
    fetch(API + `?page=${page}&species=${species}&status=${status}&gender=${gender}`)
      .then(response => response.json())
      .then(data => {
        setPages(data.info.pages);
        setCharacters(data.results);

        const speciesOpt = [];
        const statusOpt = [];
        const genderOpt = [];

        data.results.map((item) => {
          speciesOpt.push(item.species);
          statusOpt.push(item.status);
          genderOpt.push(item.gender);
          return item;
        });

        setSpeciesOptUpd([...new Set(speciesOpt)]);
        setStatusOptUpd([...new Set(statusOpt)]);
        setGenderOptUpd([...new Set(genderOpt)]);
      })
  }, [gender, species, status, page]);


  const PaginationChange = (event, page) => {
    setPage(page);
  
    fetch(API + `?page=${page}&species=${species}&status=${status}&gender=${gender}`)
    .then(response => response.json())
    .then(data => {
      setPages(data.info.pages);
      setCharacters(data.results);
    })
  }

  return (
    <section className="characters" id='characters'>
      <div className="characters__container container">
        <h1 className="container__title">Characters</h1>

        {/* Filter */}
        <Filter
          species={speciesOptUpd}
          status={statusOptUpd}
          gender={genderOptUpd}

          setSpecies={setSpecies}
          setStatus={setStatus}
          setGender={setGender}
        />

        <Stack spacing={2} className="container__pagination hide">
          {characters.map((item, key) => {
            return (
              <div data-aos="fade-right" className='pagination__character' key={key}>
                <button variant="outlined" className='character__button' onClick={() => handleClickOpen(item)}></button>

                <img src={item.image} alt={"image" + key} className="character__image" />
                <div className="character__addInfo">
                  <h2 className="addInfo__name">{item.name}</h2>
                  <h3 className="addInfo__location">From <span>{item.location.name}</span></h3>
                  <p className="addInfo__species">Species <span>{item.species}</span></p>
                  <p className="addInfo__status">Status <span>{item.status}</span></p>
                  <p className="addInfo__gender">Gender <span>{item.gender}</span></p>
                </div>
              </div>
            )
          })}
        </Stack>



        {/* Popup */}
        <Popup
          isOpen={isOpen}
          info={info}
          handleClose={handleClose}
        />

        {/* Pagination */}
        <Pagination
          className='characters__container__navigation container__navigation'
          count={pages}
          page={page}
          onChange={PaginationChange}
        />
      </div>
    </section>
  );
}

export default Characters;
