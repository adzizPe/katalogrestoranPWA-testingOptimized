import TheRestaurantDbSorce from '../../data/restaurantdb-sorce';
import { createRestaurantItemTemplate } from '../template/template-creator';

const Home = {
  async render() {
    return `
      <div id="mainContent">
        <section class="content">
          <div class="latest">
            <h1>Temukan Restoran Pilihan</h1>
            <div id="loadingIndicator" class="loading">Tunggu..</div>
            <div class="list" id="data-resto"></div>
            <div id="errorMessage" class="errorMessage">Gagal memuat data. Silakan coba lagi nanti.</div>
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    const loadingIndicator = document.querySelector('#loadingIndicator');
    const errorMessage = document.querySelector('#errorMessage');
    const restoContainer = document.querySelector('#data-resto');

    try {
      loadingIndicator.style.display = 'block';
      const LIST = await TheRestaurantDbSorce.listRestaurant();
      loadingIndicator.style.display = 'none';
      LIST.forEach((restaurant) => {
        restoContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      loadingIndicator.style.display = 'none';
      errorMessage.style.display = 'block';
      console.error('Gagal mengambil data restoran:', error);
      // eslint-disable-next-line no-alert
      alert('Gagal memuat data. Silakan coba lagi nanti.');
    }
  },
};

export default Home;
