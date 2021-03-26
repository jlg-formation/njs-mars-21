/* eslint-disable no-undef */
console.log('main start');

window.getDetails = function (id) {
  console.log('id: ', id);
  window.location = `/details/${id}`;
};
