import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';
import { createRestaurantItemTemplate } from '../template/template-creator';

const Like = {
  async render() {
    return `
      <div class="content">
        <h1 class="latest">Restoran Favorit kamu</h1>
        <div id="list-resto" class="list">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const moviesContainer = document.querySelector('#list-resto');

    restaurants.forEach((restaurant) => {
      moviesContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Like;
