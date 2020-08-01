const submitButton = document.getElementById('submit-bio');
const newBioContainer = document.getElementById('new-bio');

submitButton.addEventListener('click', () => {
  const person = document.getElementById('person').value;
  const bio = document.getElementById('bio').value;

  fetch(`/api/bios?person=${person}&bio=${bio}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(({bio}) => {
    const newBio = document.createElement('div');
    newBio.innerHTML = `
    <h3>Congrats, your bio was added!</h3>
    <div class="person">- ${bio.person}</div>
    <div class="bio">${bio.bio}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newBioContainer.appendChild(newBio);
  });
});
