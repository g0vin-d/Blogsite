import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <h2 className="brand">
          <Link className="navbar__link" to="/">
            City Blog
          </Link>
        </h2>
      </div>
      <div className="navbar__right">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link" to="/create">
              Create Blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
