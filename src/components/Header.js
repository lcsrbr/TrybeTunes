import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Navigation from './Navigation';

class Header extends Component {
  state = {
    name: '',
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const data = await getUser();
    this.setState({ name: data.name });
  };

  render() {
    const { name } = this.state;
    return (
      <header
        data-testid="header-component"
        className=" shadow-lg p-3 mb-5 rounded"
      >
        <div className="headerPs">
          <p className="fs-2">🎧 TrybeTunes 🎶</p>
          <div
            data-testid="header-user-name"
            className="fst-italic"
          >
            { name === '' && <Loading />}
            {name}
          </div>
        </div>
        <Navigation />
      </header>
    );
  }
}

export default Header;
