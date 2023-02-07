import React, { useState, useEffect } from 'react';
import './Characters.scss';
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

  const handleClickOpen = props => {
    setOpen(true);
    setInfo(props.target.nextSibling.firstChild.innerHTML);
    document.body.style.overflow = 'hidden';
    document.querySelector(".hide").style.opacity = '.4';
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
        <h1 className="characters__container__title">Characters</h1>

        {/* Filter */}
        <Filter
          species={speciesOptUpd}
          status={statusOptUpd}
          gender={genderOptUpd}

          setSpecies={setSpecies}
          setStatus={setStatus}
          setGender={setGender}
        />

        <Stack spacing={2} className="characters__container__pagination hide">
          {characters.map((item, key) => {
            return (
              <div data-aos="fade-right" className='characters__container__pagination__character' key={key}>
                <button variant="outlined" className='characters__container__pagination__character__button' onClick={handleClickOpen}></button>
                <div className="characters__container__pagination__character__allInfo" style={{ display: "none" }}>
                  <ul>
                    <img src={item.image} alt={key + "image"} />
                    <li>
                      Name: <span>{item.name}</span>
                    </li>
                    <li>
                      Watch the <a target="_blank" rel="noreferrer" href={item.episode[0]}>episode</a>
                    </li>
                    <li>
                      Gender: <span>{item.gender}</span>
                    </li>
                    <li>
                      Location: <span>{item.location.name}</span>
                    </li>
                    <li>
                      Species: <span>{item.species}</span>
                    </li>
                    <li>
                      Status: <span>{item.status}</span>
                    </li>
                  </ul>
                </div>

                <img src={item.image} alt={"image" + key} className="characters__container__pagination__character__image" />
                <div className="characters__container__pagination__character__addInfo">
                  <h2 className="characters__container__pagination__character__addInfo__name">{item.name}</h2>
                  <h3 className="characters__container__pagination__character__addInfo__location">From <span>{item.location.name}</span></h3>
                  <p className="characters__container__pagination__character__addInfo__species">Species <span>{item.species}</span></p>
                  <p className="characters__container__pagination__character__addInfo__status">Status <span>{item.status}</span></p>
                  <p className="characters__container__pagination__character__addInfo__gender">Gender <span>{item.gender}</span></p>
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
