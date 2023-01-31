import React, { useState, useEffect } from 'react';
import './Characters.scss';
import aos from 'aos';
import 'aos/dist/aos.css';

// Popup links
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

// Pagination links
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Filter from './Filter/Filter';

const Characters = () => {
  const [pages, setPages] = useState(0);
  const [next, setNext] = useState("");
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState("");

  const [open, setOpen] = React.useState(false);

  const [speciesOpt, setSpeciesOpt] = useState([]);
  const [statusOpt, setStatusOpt] = useState([]);
  const [genderOpt, setGenderOpt] = useState([]);

  let [speciesOptUpd, setSpeciesOptUpd] = useState([]);
  let [statusOptUpd, setStatusOptUpd] = useState([]);
  let [genderOptUpd, setGenderOptUpd] = useState([]);

  const [species, setSpecies] = useState([]);
  const [status, setStatus] = useState([]);
  const [gender, setGender] = useState([]);

  const handleClickOpen = props => {
    setOpen(true);
    setInfo(props.target.nextSibling.firstChild.innerHTML);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    aos.init();
    fetch(`https://rickandmortyapi.com/api/character/?species=${species}&status=${status}&gender=${gender}`)
      .then(response => response.json())
      .then(data => {
        setPages(data.info.pages);
        setNext(data.info.next);
        setCharacters(data.results);

        data.results.map((item) => {
          setSpeciesOpt(speciesOpt.push(item.species));
          setStatusOpt(statusOpt.push(item.status));
          setGenderOpt(genderOpt.push(item.gender));
          return item;
        });

        setSpeciesOptUpd([...new Set(speciesOpt)]);
        setStatusOptUpd([...new Set(statusOpt)]);
        setGenderOptUpd([...new Set(genderOpt)]);
      })
  }, [genderOpt, speciesOpt, statusOpt, gender, species, status]);


  const [page, setPage] = useState(1);
  const PaginationChange = (event, page) => {
    setPage(page);

    fetch(next.slice(0, next.indexOf("=") + 1) + page)
      .then(response => response.json())
      .then(data => {
        setPages(data.info.pages);
        setNext(data.info.next);
        setCharacters(data.results);
      })

    if (page === pages) {
      fetch(next.slice(0, next.indexOf("=") + 1) + page)
        .then(response => response.json())
        .then(data => {
          setPages(data.info.pages);
          setNext(data.info.prev);
          setCharacters(data.results);
        })
    }
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

        {/* Pagination */}
        <Stack spacing={2} className="characters__container__pagination">
          {characters.map((item, key) => {
            return (
              <div data-aos="fade-right" className='characters__container__pagination__character' key={key}>
                <button variant="outlined" className='characters__container__pagination__character__button' onClick={handleClickOpen}></button>
                <div className="characters__container__pagination__character__allInfo">
                  <ul style={{display: "none"}}>
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


                {/* Popup */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="draggable-dialog-title"
                  className='popup'
                >
                  <div className='popup__wrapper' dangerouslySetInnerHTML={{ __html: info }} />

                  <DialogActions>
                    <Button className='popup__close' autoFocus onClick={handleClose}>
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )
          })}
        </Stack>

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
