// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Active Nav Link
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-link');
menuItem.forEach(item => {
  if (item.href === currentLocation) {
    item.classList.add('active');
  }
});