import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
// import ProfileEdit from './ProfileEdit';

class Profile extends Component {
  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    this.getName();
  }

  componentWillUnmount() {
    this.getName();
  }

  getName = async () => {
    const data = await getUser();
    this.setState({ data, loading: false });
  };

  render() {
    const { data, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading />}
        {!loading
        && (
          <div className="profile p-3 mb-2 bg-transparent">
            <img
              data-testid="profile-image"
              src={ data.image }
              alt={ data.name }
            />
            <div className="profileText">
              <p className="fs-6">
                Nome:
                {' '}
                <span data-testid="profile-user-name" className="fs-5 fst-italic">
                  {data.name}
                </span>
              </p>
              <p className="fs-6">
                E-mail:
                {' '}
                <span data-testid="profile-user-email" className="fs-5 fst-italic">
                  {data.email}
                </span>
              </p>
              <p className="fs-6">
                Descrição:
                {' '}
                <span data-testid="profile-user-description" className="fs-5 fst-italic">
                  {data.description}
                </span>
              </p>

              <Link to="/profile/edit" id={ data.name }>
                <button type="button" className="btn btn-primary"> Editar perfil</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
