// Nav JS
 
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

//Carousel JS

const track = document.querySelector('.carousel-track');
const slide = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button--right')
const prevButton = document.querySelector('.carousel-button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

// Project section DOM & Data

const projectData = [
  {
    name: "Heroes of Roshar",
    description: `A game of mix and match based off the book series 'The Stormlight Archive'. The user, through trial and error, selects cards until they match all six images with their indentical counterparts. The amount of turns they take are displayed as well. Starting a new game shuffles the cards and resets the turn counter  `,
    image: "mix-match.png",
    tech: "HTML, CSS, and React",
    github: "https://github.com/umeraziz45/mix-match-game",
    liveLink: "https://heroes-of-roshar.netlify.app/"
  },
  {
    name: "Paper Trail",
    description: `A site where you can input and store financial transactions ofr a unique user account
    by using Firebase Authentication to log in.`,
    image: "large-Sea-Otter-photo.jpg",
    tech: "HTML, CSS, Firebase, and React",
    github: "",
    liveLink: ""
  },
  {
    name: "Speech to Text",
    description: `A site where you can input text that will be converted to audio and played on your computer or phone.
    This site uses an API`,
    tech: "HTML, CSS, and Vanilla JS",
    github: "",
    liveLink: ""
  },
  {
    name: "!sss",
    description: `A mix and match game with a set of flippable cards.
    Users flip a card for a short amount of time before it returns to tis orignial position. 
    The rinse and repeat until they can match each card to its identical counterpart`,
    image: "large-Sea-Otter-photo.jpg",
    tech: "HTML, CSS, and React",
    github: "",
    liveLink: ""
  }
]


const displayProjectData = (projectIndex) => {
  document.querySelector('.project-heading').textContent = projectData[projectIndex].name;
  document.querySelector('.project-description').textContent = projectData[projectIndex].description;
  document.querySelector('.project-tech').textContent = `Built With: ${projectData[projectIndex].tech}`;
  document.querySelector('.project-github').href = projectData[projectIndex].github;
  document.querySelector('.project-demo').href = projectData[projectIndex].liveLink;
}

const slideWidth = slide[0].getBoundingClientRect().width;

//arrange slides next ot one another instead of on top of one another

// slide[0].style.left = slideWidth * 0 + 'px';
// slide[1].style.left = slideWidth * 1 + 'px';
// slide[2].style.left = slideWidth * 2 + 'px';

//Declarative. Create a named funciton to create more legible bode

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}

slide.forEach(setSlidePosition); 

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (slide, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slide.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

//When I click right, move slides to the right

nextButton.addEventListener('click', e  => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slide.findIndex(slide => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide);  
  updateDots(currentDot, nextDot);
  hideShowArrows(slide, prevButton, nextButton, nextIndex);
  displayProjectData(nextIndex);
})

// When i click left, the slides move to the left

prevButton.addEventListener('click', e => {
   const currentSlide = track.querySelector('.current-slide');
   const prevSlide = currentSlide.previousElementSibling;
   const currentDot = dotsNav.querySelector('.current-slide');
   const prevDot = currentDot.previousElementSibling;
   const prevIndex = slide.findIndex(slide => slide === prevSlide);
  //  const currentIndex = slide.findIndex();
  //  console.log(currentIndex);

   moveToSlide(track, currentSlide, prevSlide);
   
   updateDots(currentDot, prevDot);

   hideShowArrows(slide, prevButton, nextButton, prevIndex);

   displayProjectData(prevIndex);


});

dotsNav.addEventListener('click', e => {
  //ensures only the buttons get activated on click
  const targetDot = e.target.closest('button');

  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slide[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);
  hideShowArrows(slide, prevButton, nextButton, targetIndex);
  displayProjectData(targetIndex);

})