class NavMenu {
  constructor(container) {
    this.container = document.querySelector(container);
    this.icon = this.container.querySelector('.nav__menu-icon');
    this.menu = this.container.querySelector('.nav__menu');
    this.menuLinks = this.container.querySelectorAll('.nav__list a');

    this.handleEvents();
  }

  handleEvents = () => {
    this.icon.addEventListener('click', this.toggleBurgerMenu);
    this.menuLinks.forEach(link => {
      link.addEventListener('click', this.toggleBurgerMenu);
    })
  }

  toggleBurgerMenu = () => {
    this.icon.classList.toggle('active');
    this.menu.classList.toggle('active');
  }
}

export const navMenu = new NavMenu('.nav--header');