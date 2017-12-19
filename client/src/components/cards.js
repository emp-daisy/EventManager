import React, { LabelHTMLAttributes } from 'react';
import event from '../assets/event.jpg';

const CardBlock = () => (
  <div className="card">
    <img className="card-img-top" src={event} alt="Card image cap" />
    <div className="card-body">
      <h4 className="card-title">Card title</h4>
      <p className="card-text">Some quick example text to build on the card title and
        make up the bulk of the card's content.
      </p>
      <a
        href="events.html"
        className="btn btn-dark btn-block border-1 text-white py-3"
      >Check events
      </a>
    </div>
  </div>
);

export default CardBlock;
