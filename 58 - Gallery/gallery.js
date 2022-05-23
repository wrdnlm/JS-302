class Gallery {
  constructor(gallery) {
    if (!gallery) throw new Error('No gallery found!');

    this.gallery = gallery;
    this.modal = document.querySelector('.modal');
    this.currentImage = '';
    this.init();
  }

  init = () => {
    let { gallery, showImage, modal } = this;
    let images = [...gallery.querySelectorAll('img')];

    images.forEach(image => {
      image.addEventListener('click', e => showImage(e.currentTarget));
      image.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
          showImage(e.currentTarget);
        }
      });
    });

    modal.addEventListener('click', this.handleOutsideClicks);
  }

  showImage = (img) => {
    if (!img) return;

    this.currentImage = img;
    let { modal } = this;
    let modalImage = modal.querySelector('img');
    let modalTitle = modal.querySelector('h2');
    let modalDesc = modal.querySelector('figure p');
    console.log(img)

    modalImage.src = img.src;
    modalTitle.textContent = img.title;
    modalDesc.textContent = img.dataset.description;
    this.handleModalEvents();
    modal.classList.add('open');
  }

  handleOutsideClicks = (e) => {
    e.target.matches('.open') && this.modal.classList.remove('open');
  }

  handleModalEvents = () => {
    window.addEventListener('keyup', this.handleKeyup);
  } 

  handleKeyup = (e) => {
    let key = e.key;

    switch(key) {
      case 'Escape':
        this.modal.classList.remove('open');
        break;
      case 'ArrowRight':
        this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
        break;
      case 'ArrowLeft':
        this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
        break;
      default:
        console.log(key);
        break;
    }
  }
}

const galleries = [...document.querySelectorAll('.gallery')];

galleries.forEach(gallery => {
  new Gallery(gallery);
});