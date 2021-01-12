
import './App.css';
import React, { Component } from 'react';
import { render } from 'react-dom';


class App extends Component {
  render() {
    return ( <Register /> );
  }
}
const validPhoneNumberRegex = RegExp(/^(?:\(?\?)?(?:[-\.\(\)\s]*(\d)){9}\)?$/);
const validPasswordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      surname: null,
      email: null,
      password: null,
      secPass: null,
      address: {
        street: null,
        houseNumber: null,
        homeNumber: null,
        postCode: null,
        city: null,
      },
      addressMessage: 'Rozwiń Adres',
      isClicked: false,
      phoneNumber: null,
      checkboxMandatory: false,
      checkboxOptional: false,
      checks: {
        firstNameCheck: false,
        surNameCheck: false,
        emailCheck: false,
        passwordCheck: false,
        secPassCheck: false,
      },
      errors: {
        firstName: '',
        surName: '',
        email: '',
        password: '',
        secPass: '',
        address: '',
        phoneNumber: '',
        checkboxMandatory: 'Musisz Zaznaczyć',
      }
    };
    this.handleCheckboxMandatory = this.handleCheckboxMandatory.bind(this);
    this.handleCheckboxOptional = this.handleCheckboxOptional.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let checks = this.state.checks;
    switch (name) {
      case 'firstName': 
        errors.firstName = 
          value.length < 1
            ? 'Imie musi mieć min 1 znak'
            : '';
        checks.firstNameCheck =
          value.length < 1
            ? false
            : true;
        break;
        case 'surName': 
        errors.surName = 
          value.length < 1
            ? 'Nazwisko musi mieć min. 1 znak'
            : '';
        checks.surNameCheck =
          value.length < 1
            ? false
            : true;
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Niepoprawny email!';
        checks.emailCheck =
          validEmailRegex.test(value)
            ? true
            : false;
        break;
      case 'password': 
        errors.password =
        validPasswordRegex.test(value)
            ? ''
            : 'Hasło wymaga min 8 znaków w tym 1 duża litera, 1 mała litera i jedna cyfra';
        checks.passwordCheck =
          validPasswordRegex.test(value)
            ? true
            : false;
        break;
        case 'secPass': 
        errors.secPass =
        value === this.state.password
            ? ''
            : 'Hasło nie jest takie same!';
        checks.secPassCheck =
          value === this.state.password
            ? true
            : false;
        break;
        case 'phoneNumber': 
        errors.phoneNumber  =
        validPhoneNumberRegex.test(value) || value.length === 0
            ? ''
            : 'Zły numer!';
        break;
      
        default:
        break;
    }

    this.setState({checks, errors, [name]: value});
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }
  handleCheckboxMandatory(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let errors = this.state.errors
    errors.checkboxMandatory = value ?
    '' :
    'Musisz zaznaczyc';
    console.info(errors.checkboxMandatory)

    this.setState({
      [name]: value
    });
  }
  handleClick(event) {
    let message = this.state.isClicked 
    ? 'Rozwiń Adres'
    : 'Zwiń Adres' ;
    let tempIsClicked = this.state.isClicked
    ? false
    : true;

    this.setState({
      isClicked: tempIsClicked,
      addressMessage: message
    });
  }
  handleCheckboxOptional(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmitClick = (event) => {
    event.preventDefault();
 
    alert("Gratulacje! You did it!");
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
    alert("Gratulacje! You did it!");
  }

  render() {
    const {errors} = this.state;
    const {checks} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='firstName'>
              <label htmlFor="firstName">Imie</label>
              <input type='text' name='firstName' onChange={this.handleChange} noValidate />
              {errors.firstName.length > 0 && 
                <span className='error'>{errors.firstName}</span>}
            </div>
            <div className='surName'>
              <label htmlFor="surName">Nazwisko</label>
              <input type='text' name='surName' onChange={this.handleChange} noValidate />
              {errors.surName.length > 0 && 
                <span className='error'>{errors.surName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} noValidate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Hasło</label>
              <input type='password' name='password' onChange={this.handleChange} noValidate />
              {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
            </div>
            
            <div className='secPass'>
              <label htmlFor="secPass">Powtórz hasło</label>
              <input type='password' name='secPass' onChange={this.handleChange} noValidate />
              {errors.secPass.length > 0 && 
                <span className='error'>{errors.secPass}</span>}
            </div>
            <div className='addressContainer'>
            <p className='addressClick' onClick={this.handleClick}>{this.state.addressMessage}</p>
            {this.state.isClicked ?
            <div className='address'>
              <div className='streetRow'>
              <div className='street'>
              <label htmlFor="street">Ulica</label>
              <input type='text' name='street' />
              </div>
              <div className='postCode'>
              <label htmlFor="postCode">Kod Pocztowy</label>
              <input type='text' name='postCode' />
              </div>
              <div className='city'>
              <label htmlFor="city">Miejscowość</label>
              <input type='text' name='city' />
              </div>
              </div>
              
            </div> : ''}</div>
            <div className='phoneNumber'>
              <label htmlFor="phoneNumber">Numer Telefonu</label>
              <input type='tel' name='phoneNumber' onChange={this.handleChange} noValidate />
              {errors.phoneNumber.length > 0 && 
                <span className='error'>{errors.phoneNumber}</span>}
            </div>
            <div className='checkboxMandatory'>
            
            <input name="checkboxMandatory" type="checkbox" checked={this.state.checkboxMandatory} onChange={this.handleCheckboxMandatory} noValidate />
            <label htmlFor="checkboxMandatory">Opcja 1 obowiązkowa i przechodzę pod link</label>
            {errors.checkboxMandatory !== '' ? 
                <span className='error'>{errors.checkboxMandatory}</span>: <div></div> }</div>
            <div className='checkboxOptional'>
            
            <input name="checkboxOptional" type="checkbox" checked={this.state.checkboxOptional} onChange={this.handleCheckboxOptional} noValidate />
            <label htmlFor="checkboxOptional">Opcja 2 nieobowiązkowa</label></div>
            {checks.passwordCheck && checks.emailCheck && checks.firstNameCheck && checks.surNameCheck && checks.secPassCheck && validateForm(this.state.errors) ?
            <div className='submit'>
              <button class="glow-on-hover" type="button" onClick={this.handleSubmitClick} >Zarejestruj</button>
              
            </div>
            
            : <div className='submitDisabled'>
            <button>Zarejestruj</button>
          </div>}
          </form>
        </div>
      </div>
    );
  }
}




render(<App />, document.getElementById('root'));

export default App;
