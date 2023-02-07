import React, { useEffect, useState } from 'react';

// import component styles
import "./Locations.scss";

// Pagination import 
import Pagination from '@mui/material/Pagination';
import Filter from './Filter/Filter';

const Locations = () => {
  const [pagesCount, setPagesCount] = useState(1);
  const [page, setPage] = useState(1);
  const [locations, setLocations] = useState([]);

  let [typeOptUpd, setTypeOptUpd] = useState([]);
  let [dimensionOptUpd, setDimensionOptUpd] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location/?page=${page}name=${name}&type=${type}&dimension=${dimension}`)
    .then(res => res.json())
    .then(data => {
      setPagesCount(data.info.pages);
      setLocations(data.results);

      const typeOpt = [];
      const dimensionOpt = [];

      data.results.map((item) => {
        typeOpt.push(item.type);
        dimensionOpt.push(item.dimension);
        return item;
      });

      setTypeOptUpd([...new Set(typeOpt)]);
      setDimensionOptUpd([...new Set(dimensionOpt)]);
    })
  }, [dimension, name, type, page]);

  const PaginationChange = (event, page) => {
    setPage(page);

    fetch(`https://rickandmortyapi.com/api/location/?page=${page}&name=${name}&type=${type}&dimension=${dimension}`)
      .then(response => response.json())
      .then(data => {
        setPagesCount(data.info.pages);
        setLocations(data.results);
      })
  }

  // HTML
  return (
    <section className="locations" id="locations">

      {/* Container */}
      <div className="locations__container container">

        {/* Title */}
        <h1 className="locations__container__title">Locations</h1>

        {/* Filters */}
        <Filter
          name={name}
          type={typeOptUpd}
          dimension={dimensionOptUpd}
          locations={locations}

          setName={setName}
          setType={setType}
          setDimension={setDimension}
        />

        {/* Render locations */}
        <ul className="locations__container__list">
          {locations.map((item, key) => {
            return (
              <li key={key} className="locations__container__list__item">
                <h1 className="locations__container__list__item__name">{item.name}</h1>
                <h3 className="locations__container__list__item__type">Type: <span>{item.type}</span></h3>
                <h3 className="locations__container__list__item__dimension">Dimension: <span>{item.dimension}</span></h3>
                <p className="locations__container__list__item__url">Watch the <a target="_blank" rel="noreferrer" href={item.url}>location</a></p>
              </li>
            );
          })}
        </ul>

        {/* Pagination */}
        <Pagination
          className='locations__container__pagination container__navigation'
          count={pagesCount}
          page={page}
          onChange={PaginationChange}
        />
      </div>
    </section>
  );
}

export default Locations;
