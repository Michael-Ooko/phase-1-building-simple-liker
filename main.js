// Defining text characters for the empty and full hearts
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Select all elements with the class "like-glyph"
const likeHearts = document.querySelectorAll('.like-glyph');

// Attach event listener to each like heart
likeHearts.forEach(likeHeart => {
  likeHeart.addEventListener('click', (e) => {
    const heart = e.target;
    if (heart.classList.contains('activated-heart')) {
      // Change heart back to empty
      heart.textContent = EMPTY_HEART;
      
      // Remove activated-heart class
      heart.classList.remove('activated-heart');
    } else {
      mimicServerCall()
        .then(() => {
          // Change heart to full and make it red on success
          heart.textContent = FULL_HEART;
          heart.classList.add('activated-heart');
        })
        .catch(() => {
          // Display error modal on failure
          displayError('Server Error');

          // Hide modal after 3 seconds
          setTimeout(() => {
            const errorModal = document.querySelector('.modal');
            errorModal.classList.add('hidden');
          }, 3000);
        });
    }
  });
});

function displayError(errorMessage) {
  // Show the error modal
  const errorModal = document.querySelector('.modal');
  errorModal.classList.remove('hidden');
  
  // Set error message
  const errorMessageElement = document.querySelector('#modal-message');
  errorMessageElement.textContent = errorMessage;
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
