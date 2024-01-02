import React, { useState } from 'react';
import MapContainer from './MapContainer';
import myImage from '../../assets/image-beer.png';
import myImage2 from '../../assets/signimage.png';

export const SearchPlace = () => {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
  };

  return (
    <>
      <img
        id='myImage'
        src={myImage}
        style={{ position: 'absolute', top: 340, left: 180, zIndex: 10 }}
      />
      <img
        id='myImage2'
        src={myImage2}
        style={{ position: 'absolute', top: 130, left: 10, zIndex: 10 }}
      />
      <form
        className='inputForm'
        onSubmit={handleSubmit}
      >
        <input
          style={{ position: 'absolute', top: 380, left: 10, zIndex: 10 }}
          placeholder='Search Place'
          onChange={onChange}
          value={inputText}
        />
        <button
          type='submit'
          style={{ position: 'absolute', top: 379, left: 190, zIndex: 10 }}
        >
          검색
        </button>
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
};

export default SearchPlace;
