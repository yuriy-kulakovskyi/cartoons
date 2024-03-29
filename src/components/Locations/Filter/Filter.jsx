import React, { useState } from 'react';

const Filter = filters => {
  const [isOpen, setIsOpen] = useState(true);

  const itemClickHandler = e => {
    filters.setName(e.target.textContent);
    setIsOpen(!isOpen);
  }

  const inputClickHandler = () => {
    setIsOpen(true);
  }

  const handleClick = () => {
    filters.setName("");
    filters.setType("");
    filters.setDimension("");
  }

  const handleSelectChange = e => {
    if (e.target.name === "Type") {
      filters.setType(e.target.value);
    }

    if (e.target.name === "Dimension") {
      filters.setDimension(e.target.value);
    }
  }

  return (
    <div className='container__filters'>
      {/* Names filter */}
      <input 
        value={filters.name}
        type="text"
        placeholder='Search by the name'
        className='filters__input'
        onChange={e => filters.setName(e.target.value)}
        onClick={inputClickHandler}
      />

      {/* Dropdown menu */}
      <ul className='filters__dropdown'>
        {filters.name && isOpen ? filters.locations.map((item, key) => {
          return (
              <li
                onClick={itemClickHandler}
                key={key}
                className='dropdown__item'
              >
                {item.name}
              </li>
            )
          })
          : null
        }
      </ul>
      
      {/* Row of the selects */}
      <div className="selects">
        {/* Types filter */}
        <select 
          name="Type" 
          className='filters__select' 
          onChange={handleSelectChange}
        >
          <option 
            selected
            disabled
            value="All"
            className="select__option"
          >
            Type
          </option>
          {filters.type.map((item, key) => {
            return (
              <option 
                key={key}
                value={item} 
                className="select__option"
              >
                {item}
              </option>
            )
          })}
        </select>

        {/* Dimensions filter */}
        <select 
          name="Dimension" 
          className='filters__select'
          onChange={handleSelectChange}
        >
          <option 
            selected
            disabled
            value="All"
            className="select__option"
          >
            Dimension
          </option>
          {filters.dimension.map((item, key) => {
            return (
              <option 
                key={key}
                value={item} 
                className="select__option"
              >
                {item}
              </option>
            )
          })}
        </select>
      </div>

      {/* Show All button */}
      <button 
        className='filters__button'
        onClick={handleClick}
      >
        Show All
      </button>
    </div>
  );
}

export default Filter;
