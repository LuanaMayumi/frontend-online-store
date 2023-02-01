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
      <div className="form-container">
        <h2>
          Informações do comprador
        </h2>
        <form>
          <input
            type="text"
            name="name"
            data-testid="checkout-fullname"
            placeholder="Nome Completo"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="email"
            data-testid="checkout-email"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
            placeholder="CPF"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="phone"
            data-testid="checkout-phone"
            placeholder="Telefone"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="cep"
            data-testid="checkout-cep"
            placeholder="CEP"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="address"
            data-testid="checkout-address"
            placeholder="Endereço"
            onChange={ this.handleChange }
          />
          <div className="radio-inputs">
            <label htmlFor="payment" className="radio-input">
              <input
                type="radio"
                name="payment"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
              Boleto
            </label>
            <label htmlFor="payment" className="radio-input">
              <input
                type="radio"
                name="payment"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
              Visa
            </label>
            <label htmlFor="payment" className="radio-input">
              <input
                type="radio"
                name="payment"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
              Mastecard
            </label>
            <label htmlFor="payment" className="radio-input">
              <input
                type="radio"
                name="payment"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
              Elo
            </label>
          </div>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ () => this.onClickButton() }
          >
            Finalizar compra
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
