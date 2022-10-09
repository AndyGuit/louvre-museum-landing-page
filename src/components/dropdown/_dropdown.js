class Dropdown {
  constructor(DOMSelector, optionsSelector, dropdownValue) {
    this.element = document.querySelector(DOMSelector);
    this.options = document.querySelectorAll(optionsSelector);
    this.value = document.querySelector(dropdownValue)

    this.toggleDropdown();
    this.setDropdownValue();
  }

  toggleDropdown() {
    this.element.addEventListener('click', () => {
      this.element.classList.toggle('active');
    });
  }

  setDropdownValue() {
    this.options.forEach(option => {
      option.addEventListener('click', () => {
        this.value.dataset.value = option.dataset.option;
        this.value.textContent = option.textContent;
      })
    })
  }

  // TODO
  // set selected value to ticket form
}

export const dropdown = new Dropdown('.dropdown', '.dropdown__option', '.dropdown__value');
