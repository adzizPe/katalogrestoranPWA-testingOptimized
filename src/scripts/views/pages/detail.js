import Swal from 'sweetalert2';
import TheRestaurantDbSorce from '../../data/restaurantdb-sorce';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../template/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';

const Detail = {
  async render() {
    return `
      <section class="content detail">
        <div id="detail-resto" class="resto-detail"></div>
        </div>
        <!-- Input untuk menambahkan review -->
        <input type="text" id="inputName" placeholder="Nama Anda">
        <input type="text" id="inputReview" placeholder="Tambahkan review Anda">
        <button id="submitReviewButton">Submit</button>
      </div>
      </section>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSorce.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detail-resto');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });
    const displayReviews = (reviews) => {
      const reviewContainer = document.querySelector('.detail-review');
      reviewContainer.innerHTML = reviews.map((review) => `
        <div tabindex="0" class="item-review">
          <p class="review-nama">${review.name}</p>
          <p class="review-tanggal">${review.date}</p>
          <div class="review-body">${review.review}</div>
        </div>
      `).join('');
    };

    displayReviews(restaurant.customerReviews);

    // Tambahkan event listener untuk tombol "Submit" review
    const submitReviewButton = document.getElementById('submitReviewButton');
    submitReviewButton.addEventListener('click', async () => {
      const inputName = document.getElementById('inputName');
      const inputReview = document.getElementById('inputReview');
      const name = inputName.value;
      const review = inputReview.value;

      if (!name || !review) {
        Swal.fire('Error', 'Nama dan review tidak boleh kosong!', 'error');
        return;
      }

      try {
        Swal.fire({
          title: 'Loading...',
          text: 'Sedang menambahkan review',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await fetch('https://restaurant-api.dicoding.dev/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: restaurant.id,
            name,
            review,
          }),
        });

        const result = await response.json();
        Swal.close();
        if (result.error) {
          throw new Error(result.message);
        }

        Swal.fire('Success', 'Review berhasil ditambahkan!', 'success');
        displayReviews(result.customerReviews);
        inputName.value = '';
        inputReview.value = '';
      } catch (error) {
        Swal.fire('Error', 'Gagal menambahkan review!', 'error');
      }
    });
  },
};

export default Detail;
