const navToggle = document.querySelector('.nav-toggle');

const navLinks = document.querySelectorAll('.header_nav-item')

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
})

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  })
})