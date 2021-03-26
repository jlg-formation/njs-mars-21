/* eslint-disable no-undef */
console.log('main start');

window.getDetails = function (id) {
  console.log('id: ', id);
  window.location = `/details/${id}`;
};

const selectedArticleIds = new Set();

window.toggle = function (id) {
  console.log('toggle id: ', id);
  if (selectedArticleIds.has(id)) {
    selectedArticleIds.delete(id);
  } else {
    selectedArticleIds.add(id);
  }
  refreshArticles();
};

function refreshArticles() {
  const trs = document.querySelectorAll('table tbody tr');
  trs.forEach(tr => {
    if (selectedArticleIds.has(tr.id)) {
      tr.classList.add('selected');
    } else {
      tr.classList.remove('selected');
    }
  });
}
