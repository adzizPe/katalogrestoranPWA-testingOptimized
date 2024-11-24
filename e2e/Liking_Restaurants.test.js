/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Menyukai dan Tidak Menyukai Restoran'); // Judul fitur dalam Bahasa Indonesia

Scenario('Menyukai dan Tidak Menyukai Satu Restoran', async ({ I }) => {
  // Menyukai Restoran
  I.amOnPage('/');
  I.seeElement('.card_title a');
  const firstResto = locate('.card_title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.waitForElement('.card', 5);
  I.seeElement('.card');
  const likedRestoTitle = await I.grabTextFrom('.card_title');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);

  // Batal menyukai restoran
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.dontSeeElement('.card');
});

Feature('Menambahkan Review pada Restoran');

Scenario('Menambahkan review dengan nama dan review valid', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.card_title a');
  I.click(locate('.card_title a').first());

  I.seeElement('#inputName');
  I.seeElement('#inputReview');
  I.fillField('#inputName', 'Towel');
  I.fillField('#inputReview', 'Lokal Pride');
  I.click('#submitReviewButton');

  I.see('Towel', '.review-nama');
  I.see('Lokal Pride', '.review-body');
});

Scenario('Review baru muncul di halaman tanpa memuat ulang halaman', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.card_title a');
  I.click(locate('.card_title a').first());

  I.seeElement('#inputName');
  I.seeElement('#inputReview');
  I.fillField('#inputName', 'Towel');
  I.fillField('#inputReview', 'Lokal Pride');
  I.click('#submitReviewButton');

  I.see('Towel', '.review-nama');
  I.see('Lokal Pride', '.review-body');
});

Scenario('Menambahkan review dengan nama kosong', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.card_title a');
  I.click(locate('.card_title a').first());

  I.seeElement('#inputName');
  I.seeElement('#inputReview');
  I.fillField('#inputName', '');
  I.fillField('#inputReview', 'Lokal Pride');
  I.click('#submitReviewButton');

  I.see('Nama dan review tidak boleh kosong!', '.swal-modal .swal-text');
});
