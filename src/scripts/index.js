import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import './views/components/custom-bar';
import './views/components/custom-footer';
import './views/components/custom-jumbotron';
import swRegister from './utils/sw-register';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import App from './views/app';

const app = new App({
  button: document.querySelector('#Menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

// off canvas menu
const Menu = document.querySelector('.menu');
const drawer = document.querySelector('nav ul');

Menu.addEventListener('click', () => {
  Menu.classList.toggle('active');
  drawer.classList.toggle('active');
});

document.querySelectorAll('nav ul li a').forEach((n) => n.addEventListener('click', () => {
  Menu.classList.remove('active');
  drawer.classList.remove('active');
}));
document.body.addEventListener('click', (event) => {
  if (!Menu.contains(event.target)) {
    Menu.classList.remove('active');
    drawer.classList.remove('active');
  }
});
window.addEventListener('scroll', () => {
  Menu.classList.remove('active');
  drawer.classList.remove('active');
});
