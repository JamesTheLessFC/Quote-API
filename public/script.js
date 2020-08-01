const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

// const resetBios = () => {
//   const currentBio = document.getElementById('current-bio');
//   if (currentBio) {
//     currentBio.remove();
//   }
// }

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution" id="${quote.person}">- ${quote.person}</div>
      <div class="year">${quote.year}</div>
      <button id="${quote.person}BioButton" class="show">Read bio</button>
      <div class="bio" id="${quote.person}Bio"></div>`;
      quoteContainer.appendChild(newQuote);
      activateBioButton(`${quote.person}`);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

const renderBio = (bio) => {
  //resetBios();
  const newBio = document.createElement('div');
  const bioContainer = document.getElementById(`${bio.bio.person}Bio`);
  newBio.className = 'bio-text';
  if (bio.bio) {
    newBio.innerHTML = bio.bio.bio;
  } else {
    newBio.innerHTML = 'No bio available';
  }
  bioContainer.appendChild(newBio);
}

const handleBioShowClick = (e) => {
  const person = e.target.id.replace('BioButton', '');
  fetch(`/api/bios/${person}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderBio(response);
    e.target.removeEventListener('click', handleBioShowClick);
    e.target.className = 'hide';
    e.target.textContent = 'Hide bio';
    e.target.addEventListener('click', handleBioHideClick);
  })
}

const handleBioHideClick = (e) => {
  const person = e.target.id.replace('BioButton', '');
  // resetBios();
  document.getElementById(`${person}Bio`).textContent = '';
  e.target.removeEventListener('click', handleBioHideClick);
  e.target.className = 'show';
  e.target.textContent = 'Read bio'
  e.target.addEventListener('click', handleBioShowClick);
}

const activateBioButton = (person) => {
  const bioButton = document.getElementById(`${person}BioButton`);
  if (bioButton.className === 'show') {
    bioButton.addEventListener('click', handleBioShowClick);
  }
  if (bioButton.className === 'hide') {
    bioButton.addEventListener('click', handleBioHideClick)
  }
}

fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetch(`/api/quotes?person=${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});
