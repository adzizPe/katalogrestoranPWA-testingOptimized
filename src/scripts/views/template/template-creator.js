import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
<div class="detail-resto">
    <h2 class="name-resto">${restaurant.name}</h2>    
    <img class="card-detail lazyload" crossorigin="anonymous" src=${CONFIG.BASE_IMAGE_URL + restaurant.pictureId} alt=${restaurant.name} />
    <div class="detail_rating-city">
        <div class="city">
            <p>Lokasi:  ${restaurant.city}</p>
        </div>
        <div class="rating">
            <p>Rating: </span> ${restaurant.rating}</p>
        </div>
    </div>
    <div class="detail-desc">
        <h3 class="overview">Overview</h3>
        <p>${restaurant.description}</p>
    </div>
</div>
<div class="menu-details">
    <div class="text-center">
        <h3 class="menu-text">Menu Restaurant</h3>
        <h2>Minuman</h2>
    </div>

    <div class="detail-list">
        ${restaurant.menus.drinks.map((minum) => `
        <div class="minuman">
            <p>${minum.name}</p>
        </div>
        `).join('')}
    </div>
    <h2 class="text-center">Makanan</h2>
    <div class="detail-list">
        ${restaurant.menus.foods.map((makan) => `
        <div class="makanan">
            <p>${makan.name}</p>
        </div>
        `).join('')}
    </div>
</div>
    <div class="detail-review">
        <div class="text-center">
        <h2>Review</h2>
        </div>
        ${restaurant.customerReviews.map((review) => `
        <div tabindex="0" class="item-review">
            <p class="review-nama">${review.name}</p>
            <p class="review-tanggal">${review.date}</p>
            <div class="review-body">${review.review}</div>
        </div>
        `).join('')}
    </div>

`;

const createRestaurantItemTemplate = (restaurant) => `
    <div class="card">
        <img class="card_thumb lazyload" crossorigin="anonymous" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}"/>
        <div class="card_city">${restaurant.city}</div>
        <div class="card_content">
            <p class="card_rating">
                Rating :
                <a href="#" class="card_rating_value">${restaurant.rating}</a>
            </p>
            <h1 class="card_title"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h1>
            <div class="card_desc">${restaurant.description.slice(0, 150)}...</div>
        </div>
    </div>
    `;

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
       <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
  `;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
      <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
  `;

export {
  createRestaurantItemTemplate, createRestaurantDetailTemplate, createLikeButtonTemplate,
  createLikedButtonTemplate,
};
