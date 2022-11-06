import { dropdown } from '../../components/dropdown/_dropdown.js';
import { creditCard } from '../../components/credit-card/_credit-card.js';
import { datepicker } from '../../components/datepicker/_datepicker.js';
import { timepicker } from '../../components/timepicker/_timepicker.js';

class TicketForm {
  ticketData = {
    name: null,
    email: null,
    phone: null,
    ticket: {
      typeValue: null,
      typeText: null,
      numOfBasic: null,
      numOfSenior: null,
      priceBasic: null,
      priceSenior: null,
      totalPrice: null
    },
    dateAndTime: new Date(),
    creditCard: null
  }

  constructor(container) {
    this.container = document.querySelector(container);

    this.ticketType = this.container.querySelector('.form-buy__ticket-type');

    this.basicTicketPrice = this.container.querySelector('span.basic-price');
    this.seniorTicketPrice = this.container.querySelector('span.senior-price');
    this.basicTicketCount = this.container.querySelector('#count-basic');
    this.seniorTicketCount = this.container.querySelector('#count-senior');

    this.ticketOverview = this.container.querySelector('.form-buy__overview');

    this.ticketCountBasic = this.container.querySelector('#count-basic');
    this.ticketCountSenior = this.container.querySelector('#count-senior');

    this.addTicketBtns = this.container.querySelectorAll('.form-buy__tickets-count-select .button--add');
    this.subtractTicketBtns = this.container.querySelectorAll('.form-buy__tickets-count-select .button--subtract');

    this.inputName = this.container.querySelector('.form-buy__name input');
    this.inputEmail = this.container.querySelector('.form-buy__email input');
    this.inputPhone = this.container.querySelector('.form-buy__phone input');

    this.closeFormBtn = this.container.querySelector('.form-buy__close');

    this.form = this.container.querySelector('form');

    this.handleEvents();
  }

  handleEvents = () => {
    this.container.addEventListener('click', (e) => {
      if (this.container !== e.target) return;

      this.container.classList.remove('active');
    });

    this.closeFormBtn.addEventListener('click', () => {
      this.container.classList.remove('active');
    });

    this.addTicketBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.previousElementSibling.stepUp();

        this.setNumOfTickets(this.ticketCountBasic.value, this.ticketCountSenior.value);
        this.setTotalPrice();
        this.displayOverview();
      })
    })

    this.subtractTicketBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.nextElementSibling.stepDown();

        this.setNumOfTickets(this.ticketCountBasic.value, this.ticketCountSenior.value);
        this.setTotalPrice();
        this.displayOverview();
      })
    })

    this.inputName.addEventListener('input', (e) => {
      e.target.closest('.form-buy__name').classList.remove('valid', 'invalid');
    })

    this.inputEmail.addEventListener('input', (e) => {
      e.target.closest('.form-buy__email').classList.remove('valid', 'invalid');
    })

    this.inputPhone.addEventListener('input', (e) => {
      e.target.closest('.form-buy__phone').classList.remove('valid', 'invalid');
    })

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isCardValid = creditCard.validateCard();
      const isDateValid = this.isDateTimeSelected('.datepicker', datepicker);
      const isTimeValid = this.isDateTimeSelected('.timepicker', timepicker);
      const isNameValid = this.validateInput(this.setName, '.form-buy__name', /[a-zA-Z][a-zA-Z ]{2,}/);
      const isEmailValid = this.validateInput(this.setEmail, '.form-buy__email', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      const isPhoneValid = this.validateInput(this.setPhone, '.form-buy__phone', /^\d{10}$/);

      const allInputs = [isCardValid, isDateValid, isTimeValid, isNameValid, isEmailValid, isPhoneValid];

      // check if all inputs valid
      if (allInputs.every(el => el)) {
        this.container.classList.remove('active');
        this.clearForm();

        // send ticket data to server
        console.log(this.ticketData);
      }
    })
  }

  clearForm = () => {
    const inputs = this.container.querySelectorAll('input');
    inputs.forEach(input => {
      input.classList.remove('valid', 'invalid');
      input.value = '';
    });

    const date = this.container.querySelector('.datepicker');
    const time = this.container.querySelector('.timepicker');
    const name = this.container.querySelector('.form-buy__name');
    const email = this.container.querySelector('.form-buy__email');
    const phone = this.container.querySelector('.form-buy__phone');
    const overviewDate = this.ticketOverview.querySelector('span.date');
    const overviewTime = this.ticketOverview.querySelector('span.time');

    date.classList.remove('valid', 'invalid');
    time.classList.remove('valid', 'invalid');
    name.classList.remove('valid', 'invalid');
    email.classList.remove('valid', 'invalid');
    phone.classList.remove('valid', 'invalid');

    overviewDate.textContent = 'Select Date';
    overviewTime.textContent = 'Select Time';
  }

  isDateTimeSelected = (selector, obj) => {
    const isDateSelected = obj.selectedDates.length > 0;
    const element = this.container.querySelector(selector);

    if (isDateSelected) {
      element.classList.remove('invalid');
      return isDateSelected
    } else {
      element.classList.add('invalid');
    }
  }

  validateInput = (setFieldCallback, container, regex) => {
    const element = this.container.querySelector(container);
    const value = element.querySelector('input').value;


    if (regex.test(value)) {
      setFieldCallback(value);
      element.classList.remove('invalid');
      element.classList.add('valid');
      return true;
    } else {
      element.classList.remove('valid');
      element.classList.add('invalid');
      return false;
    }
  }

  setName = (name) => {
    this.ticketData.name = name;
  }

  setEmail = (email) => {
    this.ticketData.email = email;
  }

  setPhone = (phone) => {
    this.ticketData.phone = phone;
  }

  setTicketPrice = (basic, senior) => {
    this.ticketData.ticket.priceBasic = basic;
    this.ticketData.ticket.priceSenior = senior;
  }

  setNumOfTickets = (basic, senior) => {
    this.ticketData.ticket.numOfBasic = basic;
    this.ticketData.ticket.numOfSenior = senior;
  }

  setTicketType = (value, text) => {
    this.ticketData.ticket.typeValue = value;
    this.ticketData.ticket.typeText = text;
  }

  setTotalPrice = () => {
    const {
      numOfBasic,
      priceBasic,
      numOfSenior,
      priceSenior,
    } = this.ticketData.ticket;

    const totalPrice =
      (numOfBasic * priceBasic) +
      (numOfSenior * priceSenior)
    ;
    this.ticketData.ticket.totalPrice = totalPrice;
  }

  setTicketDate = ([date]) => {
    const selectedDate = new Date(date);
    this.ticketData.dateAndTime.setFullYear(selectedDate.getFullYear());
    this.ticketData.dateAndTime.setMonth(selectedDate.getMonth());
    this.ticketData.dateAndTime.setDate(selectedDate.getDate());
  }

  setTicketTime = ([time]) => {
    const selectedTime = new Date(time);
    this.ticketData.dateAndTime.setHours(selectedTime.getHours());
    this.ticketData.dateAndTime.setMinutes(selectedTime.getMinutes());
  }

  setCreditCardData = (creditCard) => {
    this.ticketData.creditCard = creditCard;
  }

  displayTicketsPrice = () => {
    this.basicTicketPrice.textContent = this.ticketData.ticket.priceBasic;
    this.seniorTicketPrice.textContent = this.ticketData.ticket.priceSenior;
  }

  displayNumOfTickets = () => {
    this.ticketCountBasic.value = this.ticketData.ticket.numOfBasic
    this.ticketCountSenior.value = this.ticketData.ticket.numOfSenior
  }

  displayTicketType = () => {
    const {
      typeValue,
      typeText
    } = this.ticketData.ticket;
    dropdown.setDropdownValue(typeValue, typeText);
  }

  displayDateOverview = (dateString) => {
    const dateEl = this.ticketOverview.querySelector('.overview__date .date');
    dateEl.textContent = dateString;
  }

  displayTimeOverview = (timeString) => {
    const timeEl = this.ticketOverview.querySelector('.overview__time .time');
    timeEl.textContent = timeString;
  }

  displayOverview = () => {
    const {
      numOfBasic,
      priceBasic,
      numOfSenior,
      priceSenior,
      totalPrice,
      typeText
    } = this.ticketData.ticket;

    const priceBasicEl = this.ticketOverview.querySelector('span.basic-price');
    const priceSeniorEl = this.ticketOverview.querySelector('span.senior-price');
    const totalBasicEl = this.ticketOverview.querySelector('span.basic-total');
    const totalSeniorEl = this.ticketOverview.querySelector('span.senior-total');
    const numOfBasicEl = this.ticketOverview.querySelector('.tickets-count.basic');
    const numOfSeniorEl = this.ticketOverview.querySelector('.tickets-count.senior');
    const totalPriceEl = this.ticketOverview.querySelector('.overview__total span');
    const ticketTypeEl = this.ticketOverview.querySelector('span.ticket-type');

    priceBasicEl.textContent = priceBasic;
    priceSeniorEl.textContent = priceSenior;
    numOfBasicEl.textContent = numOfBasic;
    numOfSeniorEl.textContent = numOfSenior;
    totalBasicEl.textContent = priceBasic * numOfBasic + ' ';
    totalSeniorEl.textContent = priceSenior * numOfSenior + ' ';
    totalPriceEl.textContent = totalPrice + ' €';
    ticketTypeEl.textContent = typeText;
  }

  setTicketsFromBuy = (ticketFromBuySection) => {
    const {
      ticketTypeValue,
      ticketTypeText,
      ticketBasicPrice,
      ticketSeniorPrice,
      ticketBasicCount,
      ticketSeniorCount
    } = ticketFromBuySection;

    this.setTicketPrice(ticketBasicPrice, ticketSeniorPrice);
    this.setNumOfTickets(ticketBasicCount, ticketSeniorCount);
    this.setTicketType(ticketTypeValue, ticketTypeText);
    this.setTotalPrice();

    this.displayTicketsPrice();
    this.displayNumOfTickets();
    this.displayTicketType();

    this.displayOverview();
  }

}

export const ticketForm = new TicketForm('.form-buy');