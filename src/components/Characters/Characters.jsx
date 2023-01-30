import React, { useState, useEffect, useMemo } from 'react';
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

const Characters = () => {
  const [pages, setPages] = useState(0);
  const [next, setNext] = useState("");
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState("");

  const [selectedSpecy, setSelectedSpecy] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = props => {
    setOpen(true);
    setInfo(props.target.nextSibling.firstChild.innerHTML);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    aos.init();
    fetch("https://rickandmortyapi.com/api/character")
      .then(response => response.json())
      .then(data => {
        setPages(data.info.pages);
        setNext(data.info.next);
        setCharacters(data.results);
      })
  }, [])

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

  const handleSpecyChange = e => {
    setSelectedSpecy(e.target.value);
  }

  const handleStatusChange = e => {
    setSelectedStatus(e.target.value);
  }

  const handleGenderChange = e => {
    setSelectedGender(e.target.value);
  }

  function getFilteredList() {
    if (selectedSpecy === "" && selectedStatus === "" && selectedGender === "") {
      return characters;
    } else if (selectedSpecy === "") {
      return characters.filter((item) => item.status === selectedStatus && item.gender === selectedGender);
    } else if (selectedStatus === "") {
      return characters.filter((item) => item.species === selectedSpecy && item.gender === selectedGender);
    } else if (selectedGender === "") {
      return characters.filter((item) => item.species === selectedSpecy && item.status === selectedStatus);
    }

    return characters.filter((item) => item.species === selectedSpecy && item.status === selectedStatus && item.gender === selectedGender);
  }

  const ShowAll = () => {
    setSelectedSpecy("");
    setSelectedStatus("");
    setSelectedGender("");
  }

  let filteredList = useMemo(getFilteredList, [selectedSpecy, selectedStatus, selectedGender, characters]);

  return (
    <section className="characters" id='characters'>
      <div className="characters__container container">
        <h1 className="characters__container__title">Characters</h1>

        <div className="form">
          <select name="Species" className='form__select' onChange={handleSpecyChange}>
            <option value="Human" selected>Human</option>
            <option value="Alien">Alien</option>
          </select>

          <select name="Status" className='form__select' onChange={handleStatusChange}>
            <option value="Alive" selected>Alive</option>
            <option value="Dead">Dead</option>
          </select>

          <select name="Gender" className='form__select' onChange={handleGenderChange}>
            <option value="Male" selected>Male</option>
            <option value="Female">Female</option>
          </select>

          <button className='form__select' onClick={ShowAll}>Show all</button>
        </div>

        {/* Pagination */}
        <Stack spacing={2} className="characters__container__pagination">
          {filteredList.map((item, key) => {
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
                      Watch <a target="_blank" rel="noreferrer" href={item.episode[0]}>episode</a>
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
          className='characters__container__navigation'
          count={pages}
          page={page}
          onChange={PaginationChange}
        />
      </div>
    </section>
  );
}

export default Characters;
