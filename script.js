'use strict';

const buttonsOpenModal = document.querySelectorAll('button.show-modal');
const modal = document.querySelector('.modal').classList;
const overlay = document.querySelector('.overlay');

const buttonCloseModal = document.querySelector('button.close-modal');

const openModal = function() {
  modal.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < buttonsOpenModal.length; i++) {
  buttonsOpenModal[i].addEventListener('click', openModal);
}

buttonCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.contains('hidden')) {
    closeModal();
  }
});
