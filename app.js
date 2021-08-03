'use strict';

const textarea = document.querySelector('textarea');
const tags = document.querySelector('#tags');
const container = document.querySelector('.container');

let arrs = [];
let arrsElments = [];
let curr = 0;

function ckMe(e) {
  if (e.key !== 'Enter') {
    const str = textarea.value.trim();
    arrs = str.split(',').filter((arr) => arr !== '');

    tags.innerHTML = arrs
      .map((arr) => `<span class="tag">${arr}</span>`)
      .join(' ');
  }
}

function randomChoose(e) {
  if (e.key === 'Enter') {
    textarea.value = '';
    textarea.blur();

    const allTags = tags.querySelectorAll('.tag');
    let rand = [];

    for (let i = 0; i < allTags.length; i++) {
      rand.push(Math.floor(Math.random() * allTags.length));
    }

    runHighlight(rand);
  }
}

function runHighlight(rand) {
  const allTags = tags.querySelectorAll('.tag');

  const running = setInterval(() => {
    allTags.forEach((tag) => tag.classList.remove('highlight'));
    if (curr < rand.length) {
      allTags[rand[curr]].classList.add('highlight');
      curr++;
    } else {
      clearInterval(running);
      allTags[rand[curr - 1]].classList.add('highlight');
      setTimeout(() => {
        allTags[rand[curr - 1]].style.backgroundColor = 'green';
        curr = 0;
      }, 500);
    }
  }, 400);
}

textarea.addEventListener('keyup', ckMe);
document.addEventListener('keypress', randomChoose);
