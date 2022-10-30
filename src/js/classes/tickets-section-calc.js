class TicketsSectionCalculator {
  constructor(container) {
    this.container = document.querySelector(container);

    this.ticketsPrice = {
      ticketBasicPrice: null,
      ticketSeniorPrice: null,
      ticketBasicCount: null,
      ticketSeniorCount: null,
      totalPrice: null
    }

    this.ticketTypes = this.container.querySelectorAll('.radio-button__input');

    this.addTicketBtns = this.container.querySelectorAll('.button--add');
    this.subtractTicketBtns = this.container.querySelectorAll('.button--subtract');

    this.totalPriceEl = this.container.querySelector('.buy-tickets__total-sum span');

    this.buyNowBtn = this.container.querySelector('.button--buy-now');

    // set default checked input
    this.ticketTypes[0].checked = true;

    this.handleEvents();
    this.setPriceData();
    this.calculateTotalPrice();
  }

  handleEvents() {
    this.addTicketBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.previousElementSibling.stepUp();

        this.setPriceData();
        this.calculateTotalPrice();
      })
    })

    this.subtractTicketBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.nextElementSibling.stepDown();

        this.setPriceData();
        this.calculateTotalPrice();
      })
    })

    this.ticketTypes.forEach(input => {
      input.addEventListener('change', () => {
        this.setPriceData();
        this.calculateTotalPrice();
      })
    })
  }

  setPriceData = () => {
    this.ticketTypes.forEach(input => {
      if (input.checked) {
        this.ticketsPrice.ticketBasicPrice = +input.dataset.priceBasic;
        this.ticketsPrice.ticketSeniorPrice = +input.dataset.priceSenior;
      }
    });

    const amountBasic = this.container.querySelector('#amount-basic').value;
    const amountSenior = this.container.querySelector('#amount-senior').value;

    this.ticketsPrice.ticketBasicCount = +amountBasic;
    this.ticketsPrice.ticketSeniorCount = +amountSenior;
  }

  calculateTotalPrice = () => {
    const totalPrice =
      (this.ticketsPrice.ticketBasicCount * this.ticketsPrice.ticketBasicPrice) +
      (this.ticketsPrice.ticketSeniorCount * this.ticketsPrice.ticketSeniorPrice);

    this.ticketsPrice.totalPrice = totalPrice;
    this.totalPriceEl.textContent = totalPrice;
  }
}

export const ticketsSectionCalculator = new TicketsSectionCalculator('.buy-tickets__tickets');