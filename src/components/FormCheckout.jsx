import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FormCheckout extends Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    payment: '',
    messageInvalidFields: false,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  onClickButton = () => {
    const { history } = this.props;
    const {
      name,
      email,
      cpf,
      phone,
      address,
      payment,
    } = this.state;
    if (!name || !email || !cpf || !phone || !address || !payment) {
      this.setState({
        messageInvalidFields: true,
      });
    } else {
      history.push('./');
      localStorage.clear();
    }
  };

  render() {
    const { messageInvalidFields } = this.state;
    return (
      <div>
        <h1>
          Formulário Checkout
        </h1>
        <form>
          <input
            name="name"
            data-testid="checkout-fullname"
            placeholder="Nome Completo"
            onChange={ this.handleChange }
          />
          <input
            name="email"
            data-testid="checkout-email"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
          <input
            name="cpf"
            data-testid="checkout-cpf"
            placeholder="CPF"
            onChange={ this.handleChange }
          />
          <input
            name="phone"
            data-testid="checkout-phone"
            placeholder="Telefone"
            onChange={ this.handleChange }
          />
          <input
            name="cep"
            data-testid="checkout-cep"
            placeholder="CEP"
            onChange={ this.handleChange }
          />
          <input
            name="address"
            data-testid="checkout-address"
            placeholder="Endereço"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            name="payment"
            data-testid="ticket-payment"
            onChange={ this.handleChange }
          />
          {' '}
          Boleto
          <input
            type="radio"
            name="payment"
            data-testid="visa-payment"
            onChange={ this.handleChange }
          />
          {' '}
          Visa
          <input
            type="radio"
            name="payment"
            data-testid="master-payment"
            onChange={ this.handleChange }
          />
          {' '}
          MasterCard
          <input
            type="radio"
            name="payment"
            data-testid="elo-payment"
            onChange={ this.handleChange }
          />
          {' '}
          Elo
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ () => this.onClickButton() }
          >
            Enviar dados
          </button>
          { messageInvalidFields && <p data-testid="error-msg"> Campos inválidos</p>}
        </form>
      </div>
    );
  }
}

FormCheckout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
