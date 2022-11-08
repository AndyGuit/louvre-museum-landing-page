import { ticketForm } from './ticket-form.js';

class TicketsSectionCalculator {
  constructor(container) {
    this.container = document.querySelector(container);

    this.ticketsPrice = {
      ticketTypeValue: null,
      ticketTypeText: null,
      ticketBasicPrice: null,
      ticketSeniorPrice: null,
      ticketBasicCount: null,
      ticketSeniorCount: null,
      totalPrice: null
    }

    this.ticketTypes = this.container.querySelectorAll('.radio-button__input');

    this.addTicketBtns = this.container.querySelectorAll('.button--add');
    this.subtractTicketBtns = this.container.querySelectorAll('.button--subtract');

    this.amountBasic = this.container.querySelector('#amount-basic');
    this.amountSenior = this.container.querySelector('#amount-senior');

    this.totalPriceEl = this.container.querySelector('.buy-tickets__total-sum span');

    this.buyNowBtn = this.container.querySelector('.button--buy-now');

    this.handleEvents();
    this.getTicketData();
    this.calculateTotalPrice();
  }

  handleEvents() {
    this.addTicketBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.previousElementSibling.stepUp();

        this.setPriceData();
        this.calculateTotalPrice();
        this.setLocalStorage();
      })
    })

    this.subtractTicketBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.nextElementSibling.stepDown();

        this.setPriceData();
        this.calculateTotalPrice();
        this.setLocalStorage();
      })
    })

    this.ticketTypes.forEach(input => {
      input.addEventListener('change', () => {
        this.setPriceData();
        this.calculateTotalPrice();
        this.setLocalStorage();
      })
    })

    this.buyNowBtn.addEventListener('click', (e) => {
      this.buttonRippleEffect(e);
      ticketForm.setTicketsFromBuy(this.ticketsPrice);

      // Show form
      const form = document.querySelector('.form-buy');
      form.classList.add('active');
    });
  }

  getTicketData = () => {
    const data = JSON.parse(localStorage.getItem('MuseumTickets'));

    if (data) {
      this.ticketsPrice = data;

      this.ticketTypes.forEach(type => {
        if (type.id === this.ticketsPrice.ticketTypeValue) type.checked = true;
      });

      this.amountBasic.value = this.ticketsPrice.ticketBasicCount;
      this.amountSenior.value = this.ticketsPrice.ticketSeniorCount;

      this.setPriceData();
    } else {
      // set default checked input
      this.ticketTypes[0].checked = true;
      this.setPriceData();
      this.setLocalStorage();
    }
  }

  setLocalStorage = () => {
    localStorage.setItem('MuseumTickets', JSON.stringify(this.ticketsPrice));
  }

  setPriceData = () => {
    this.ticketTypes.forEach(input => {
      if (input.checked) {
        this.ticketsPrice.ticketTypeValue = input.id;
        this.ticketsPrice.ticketTypeText = input.closest('label').textContent.trim();
        this.ticketsPrice.ticketBasicPrice = +input.dataset.priceBasic;
        this.ticketsPrice.ticketSeniorPrice = +input.dataset.priceSenior;
      }
    });

    this.ticketsPrice.ticketBasicCount = +this.amountBasic.value;
    this.ticketsPrice.ticketSeniorCount = +this.amountSenior.value;
  }

  calculateTotalPrice = () => {
    const totalPrice =
      (this.ticketsPrice.ticketBasicCount * this.ticketsPrice.ticketBasicPrice) +
      (this.ticketsPrice.ticketSeniorCount * this.ticketsPrice.ticketSeniorPrice);

    this.ticketsPrice.totalPrice = totalPrice;
    this.totalPriceEl.textContent = totalPrice;
  }

  buttonRippleEffect = (e) => {
    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = e.offsetY + 'px';
    circle.style.left = e.offsetX + 'px';

    e.target.appendChild(circle);

    e.target.addEventListener('animationend', () => circle.remove());
  }
}

export const ticketsSectionCalculator = new TicketsSectionCalculator('.buy-tickets__tickets');