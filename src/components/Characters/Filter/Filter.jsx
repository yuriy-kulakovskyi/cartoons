import React from "react";

const Filter = props => {

  const handleSelectChange = e => {
    const { name, value } = e.target;
  
    switch (name) {
      case "Species":
        props.setSpecies(value);
        break;
  
      case "Status":
        props.setStatus(value);
        break;
  
      case "Gender":
        props.setGender(value);
        break;
  
      default:
        break;
    }
  };
  

  const handleSelectAll = () => {
    props.setSpecies("");
    props.setStatus("");
    props.setGender("");
  }

  return (
    <div className="form">
      <select name="Species" className='form__select' onChange={handleSelectChange}>
        <option value="" selected>Species</option>
        {props.species.map((item, key) => {
          return (
            <option key={key} value={item}>{item}</option>
          )
        })}
      </select>
  
      <select name="Status" className='form__select' onChange={handleSelectChange}>
        <option value="" selected>Status</option>
          {props.status.map((item, key) => {
            return (
              <option key={key} value={item}>{item}</option>
            )
          })}
      </select>
  
      <select name="Gender" className='form__select' onChange={handleSelectChange}>
        <option value="" selected>Gender</option>
          {props.gender.map((item, key) => {
            return (
              <option key={key} value={item}>{item}</option>
            )
          })}
      </select>
  
      <button className="form__button" onClick={handleSelectAll}>Select All</button>
    </div>
  );
}

export default Filter;