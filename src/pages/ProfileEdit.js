import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
// import ProfileEdit from './ProfileEdit';

class ProfileEdit extends Component {
  state = {
    loading: true,
    loginName: '',
    loginEmail: '',
    loginImage: '',
    loginDescription: '',
    validateButton: true,
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const data = await getUser();
    this.setState({
      loading: false,
      loginName: data.name,
      loginEmail: data.email,
      loginImage: data.image,
      loginDescription: data.description,
    }, this.getButtonInput);
  };

  getButtonInput = () => {
    const { loginName, loginEmail, loginImage, loginDescription } = this.state;
    if (loginName !== ''
    && loginEmail !== ''
    && loginImage !== ''
    && loginDescription !== '') {
      this.setState({ validateButton: false });
    }
  }

  getUserOnAPI = (event) => {
    event.preventDefault();
    const { loginName, loginEmail, loginImage, loginDescription } = this.state;
    const { history } = this.props;
    const teste = { name: loginName,
      image: loginImage,
      email: loginEmail,
      description: loginDescription };
    updateUser(teste);
    history.push('/profile');
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    },
    this.getButtonInput);
  }

  render() {
    const {
      loading,
      loginName,
      loginEmail,
      validateButton,
      loginDescription,
      loginImage } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" className="profileEdit">
          { loading && <Loading />}
          {!loading
        && (
          <>
            <label htmlFor="loginName">
              Name:
              <br />
              <input
                className="form-control"
                data-testid="edit-input-name"
                onChange={ this.handleChange }
                value={ loginName }
                id="loginName"
                name="loginName"
                type="text"
              />
            </label>
            <label htmlFor="loginEmail">
              Email:
              <br />
              <input
                className="form-control"
                data-testid="edit-input-email"
                onChange={ this.handleChange }
                value={ loginEmail }
                id="loginEmail"
                name="loginEmail"
                type="text"
              />
            </label>
            <label htmlFor="loginDescription">
              Description:
              <br />
              <input
                className="form-control"
                data-testid="edit-input-description"
                onChange={ this.handleChange }
                value={ loginDescription }
                id="loginDescription"
                name="loginDescription"
                type="text"
              />
            </label>
            <label htmlFor="loginImage">
              Image:
              <br />
              <input
                className="form-control"
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                value={ loginImage }
                id="loginImage"
                name="loginImage"
                type="text"
              />
            </label>
            <button
              className="btn btn-primary"
              data-testid="edit-button-save"
              disabled={ validateButton }
              onClick={ this.getUserOnAPI }
              id="entrar"
              type="submit"
              value="entrar"
              name="entrar"
            >
              Editar perfil
            </button>
          </>
        )}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default ProfileEdit;
