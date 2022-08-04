import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link
          className="nav-link active nav-item fs-5"
          data-testid="link-to-search"
          to="/search"
        >
          Search
        </Link>
        <Link
          className="nav-link active nav-item fs-5"
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favorites
        </Link>
        <Link
          className="nav-link active nav-item fs-5"
          data-testid="link-to-profile"
          to="/profile"
        >
          Profile
        </Link>
      </nav>
    );
  }
}

export default Navigation;
