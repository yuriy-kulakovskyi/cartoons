import React from 'react';

// Popup button
import Button from 'react-bootstrap/Button';

const Popup = ({isOpen, info, handleClose}) => {
  if (isOpen) {
    return (
      <div className='popup'>
        <div className='popup__wrapper' dangerouslySetInnerHTML={{ __html: info }} />
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
