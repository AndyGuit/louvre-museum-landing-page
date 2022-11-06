import { ticketForm } from '../../js/classes/ticket-form.js';

class CreditCardValidation {
  #creditCardData;

  constructor(container) {
    this.#creditCardData = {
      cardholderName: null,
      cardNumber: null,
      expirationDate: {
        month: null,
        year: null
      },
      cvv: null
    }

    this.container = document.querySelector(container);
    this.number = this.container.querySelector('input.card-number');
    this.name = this.container.querySelector('input.card-name');
    this.cvv = this.container.querySelector('.cvv input');
    this.dateMonth = this.container.querySelector('input.date-month');
    this.dateYear = this.container.querySelector('input.date-year');

    this.handleEvents();
  }

  get creditCardData() {
    return this.#creditCardData;
  }

  handleEvents = () => {
    this.number.addEventListener('input', (e) => {
      this.numberMasking(e);

      const valueNoSpaces = e.target.value.replace(/\s/g, '');

      this.numberValidation(valueNoSpaces);
    });

    this.name.addEventListener('input', this.nameValidation);
    this.cvv.addEventListener('input', this.cvvValidation);
    this.dateMonth.addEventListener('input', this.expirationDateValidation);
    this.dateYear.addEventListener('input', this.expirationDateValidation);
  };

  numberValidation = (number) => {
    if (number.length < 16) {
      this.number.classList.remove('valid', 'invalid');
      return;
    };
    const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCardRegEx = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;

    const isVisa = number.match(visaRegEx);
    const isMaster = number.match(masterCardRegEx);

    if (isVisa) {
      this.number.classList.add('valid');

      this.#creditCardData.cardNumber = number;
    } else if (isMaster) {
      this.number.classList.add('valid');

      this.#creditCardData.cardNumber = number;
    } else {
      this.number.classList.add('invalid');
    }
  }

  numberMasking = (e) => {
    // filter only numbers with max length 16
    const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, 16);
    const maskValue = onlyNumbers.split('').map((val, i) => {
      // add space to every 4th digit
      return !((i + 1) % 4) ? val + ' ' : val;
    }).join('').trimEnd();

    e.target.value = maskValue;
  }

  nameValidation = (e) => {
    const value = e.target.value;

    if (value.length === 0) {
      this.name.classList.remove('valid', 'invalid');
      return;
    }

    const regex = /[a-zA-Z][a-zA-Z ]{2,}/;

    if (value.match(regex)) {
      this.name.classList.add('valid');

      this.#creditCardData.cardholderName = value;
    } else {
      this.name.classList.add('invalid');
    }
  }

  cvvValidation = (e) => {
    const value = e.target.value;

    if (value.length < 3) {
      this.cvv.classList.remove('valid', 'invalid');
      return;
    }

    const regex = /^[0-9]+$/;

    if (value.match(regex)) {
      this.cvv.classList.add('valid')

      this.#creditCardData.cvv = value;
    } else {
      this.cvv.classList.add('invalid');
    }
  }

  expirationDateValidation = () => {
    const month = this.dateMonth.value;
    const year = this.dateYear.value;
    const today = new Date();
    const cardDates = new Date(year, (month - 1));

    this.dateMonth.classList.remove('valid', 'invalid');
    this.dateYear.classList.remove('valid', 'invalid');

    if (today.getTime() < cardDates.getTime()) {
      this.dateMonth.classList.add('valid');
      this.dateYear.classList.add('valid');
    } else {
      this.dateMonth.classList.add('invalid');
      this.dateYear.classList.add('invalid');
    }

    this.#creditCardData.expirationDate.month = month;
    this.#creditCardData.expirationDate.year = year;
  }

  validateCard = () => {
    const inputs = Array.from(this.container.querySelectorAll('input'));

    const allValid = inputs.every(el => el.classList.contains('valid'));

    if (allValid) {
      ticketForm.setCreditCardData(this.#creditCardData);
      return true;
    } else {
      inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
          input.classList.add('invalid');
        }
      })
    }
  }
}

export const creditCard = new CreditCardValidation('.credit-card');