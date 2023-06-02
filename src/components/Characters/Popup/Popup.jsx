import React from 'react';

// Popup button
import Button from 'react-bootstrap/Button';

const Popup = ({ isOpen, info, handleClose }) => {
  console.log(info);

  if (isOpen) {
    return (
      <div className='popup'>
        <div className='popup__wrapper'>
          <ul>
            <img src={info.image} alt={"character avatar"} />
            <li>
              Name: <span>{info.name}</span>
            </li>
            <li>
              Watch the <a target="_blank" rel="noreferrer" href={info.episode}>episode</a>
            </li>
            <li>
              Gender: <span>{info.gender}</span>
            </li>
            <li>
              Location: <span>{info.location}</span>
            </li>
            <li>
              Species: <span>{info.species}</span>
            </li>
            <li>
              Status: <span>{info.status}</span>
            </li>
          </ul>
        </div>

        <div className="row">
          <Button className='popup__close' autoFocus onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }
}

export default Popup;
