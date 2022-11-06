import { ticketForm } from '../../js/classes/ticket-form.js';

class Dropdown {
  constructor(DOMSelector, optionsSelector, dropdownValue) {
    this.element = document.querySelector(DOMSelector);
    this.options = document.querySelectorAll(optionsSelector);
    this.value = document.querySelector(dropdownValue)

    this.toggleDropdown();
    this.chooseOption();
  }

  toggleDropdown() {
    this.element.addEventListener('click', () => {
      this.element.classList.toggle('active');
    });
  }

  chooseOption() {
    this.options.forEach(option => {
      option.addEventListener('click', () => {
        this.setDropdownValue(option.dataset.option, option.textContent);
        ticketForm.setTicketType(option.dataset.option, option.textContent);
        ticketForm.setTicketPrice(option.dataset.priceBasic, option.dataset.priceSenior);
        ticketForm.setTotalPrice();
        ticketForm.displayTicketsPrice();
        ticketForm.displayOverview();
      })
    })
  }

  setDropdownValue(value, text) {
    this.value.dataset.value = value;
    this.value.textContent = text;
  }
}

export const dropdown = new Dropdown('.dropdown', '.dropdown__option', '.dropdown__value');
