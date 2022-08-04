import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    loginName: '',
    validateLogin: true,
    loading: false,
  }

  getLoginInput = () => {
    const three = 3;
    const { loginName } = this.state;
    this.setState({ validateLogin: loginName.length < three });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    },
    this.getLoginInput);
  }

  getUserOnAPI = (event) => {
    event.preventDefault();
    const { loginName } = this.state;
    const { history } = this.props;
    this.setState({ loading: true },
      async () => {
        await createUser({ name: loginName });
        history.push('/search');
      });
  }

  render() {
    const { loginName, validateLogin, loading } = this.state;

    return (
      <div
        data-testid="page-login"
        className="loginPage shadow p-3 mb-5 rounded"
      >
        <p className="h2">🎧 TrybeTunes 🎶</p>
        <label htmlFor="loginName">
          usuário
          <br />
          <input
            className="form-control"
            data-testid="login-name-input"
            onChange={ this.handleChange }
            value={ loginName }
            id="loginName"
            name="loginName"
            type="text"
          />
        </label>
        <p />
        <button
          data-testid="login-submit-button"
          className="btn btn-primary"
          disabled={ validateLogin }
          onClick={ this.getUserOnAPI }
          id="entrar"
          type="submit"
          value="entrar"
          name="entrar"
        >
          Entrar
        </button>
        {loading && <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Login;
