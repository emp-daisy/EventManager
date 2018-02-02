import React from 'react';
import loader from '../assets/loader.gif';

const Spinner = () => (
  <div className="spinner spinner-block">
    <img src={loader} alt="Loading..." className="mx-auto d-block spinner-img" />
  </div>
);

export default Spinner;
