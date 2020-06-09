const buttonSearch = document.querySelector('#page-home main a');
const exitModal = document.querySelector('#modal  a');
const modal = document.querySelector('#modal');

buttonSearch.addEventListener('click', () => {
    modal.classList.remove('hide');
});

exitModal.addEventListener('click', (e) => {
    modal.classList.add('hide');
});