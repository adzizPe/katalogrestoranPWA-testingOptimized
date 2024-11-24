class Bar extends HTMLElement {
  connectedCallback() {
    this.render();
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#mainContent');

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  }

  render() {
    this.innerHTML = `
    <a href="#mainContent" class="skip-link">Skip to content ?</a>
    <header>
      <nav>
        <div class="logo">
          <h4>Nusa Kuliner</h4>
        </div>

        <button id="Menu" class="menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        <ul id="drawer">
          <li><a href="#/home">Home</a></li>
          <li><a href="#/like">Favorite</a></li>
          <li><a rel="noreferrer" target="_blank" href="https://github.com/adzizPe">About Us</a></li>
        </ul>
      </nav>
      `;
  }
}

customElements.define('custom-bar', Bar);
