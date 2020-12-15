const gallery = document.querySelector('#gallery');
const card = document.querySelector('.card');
const imageContainer = document.querySelector('.card-img')

// --------------------------------------
// FETCH FUNCTIONS
// --------------------------------------

function fetchData(url) {
   return fetch(url)
      .then(checkStatus)
      .then(result => result.json())
      .catch(error => console.log('Looks like something went wrong', error))     
      
   }

let employeeData = fetchData('https://randomuser.me/api/?results=12&nat=us')
employeeData
   .then(data => {
      const employeeInfo = data.results;
      for (let i = 0; i < data.results.length; i++) {
         generateCard(employeeInfo[i]);
         generateModal(employeeInfo[i]);
      }
   })
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
   if (response.ok) {
      return Promise.resolve(response);
   } else {
      return Promise.reject(new Error (response.statusText));
   }
}

// generateCard function generates the employee info card to be displayed
function generateCard(input) {
   const newDiv = document.createElement("div");
   newDiv.className = 'card'; 
   newDiv.innerHTML = `
      <div class="card-img-container">
         <img class="card-img" src="${input.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
         <h3 id="name" class="card-name cap">${input.name.first} ${input.name.last}</h3>
         <p class="card-text">${input.email}</p>
         <p class="card-text cap">${input.location.city}, ${input.location.state}</p>
      </div>`
   
   gallery.appendChild(newDiv)
   newDiv.addEventListener('click', (event) => {
      let modal = document.querySelector(`#${input.name.first}-${input.name.last}`)
      modal.style.display = 'block'
   })
}

// generateModal function generates the modal for each employee.
// the modal is initially hidden, but there is an eventlistener on each card that will display
// the corresponding modal with a click 
// each modal includes a close button that has an event listener that re-hides the modal when it is clicked 
function generateModal(input) {
   const newModal = document.createElement('div');
   newModal.style.display = 'none';
   newModal.className = 'modal-container';
   newModal.id = `${input.name.first}-${input.name.last}`
   newModal.innerHTML = `
   <div class="modal">
   <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
         <img class="modal-img" src="${input.picture.large}" alt="profile picture">
         <h3 id="name" class="modal-name cap">${input.name.first} ${input.name.last}</h3>
         <p class="modal-text">${input.email}</p>
         <p class="modal-text cap">${input.location.city}</p>
         <hr>
         <p class="modal-text">${input.phone}</p>
         <p class="modal-text">${input.location.street.number} ${input.location.street.name}, ${input.location.city}, ${input.location.state} ${input.location.postcode}</p>
         <p class="modal-text">Birthday: ${input.dob.date.slice(5,7)}/${input.dob.date.slice(8,10)}/${input.dob.date.slice(0,4)}</p>
      </div>
   </div>`
   let newBtn = newModal.querySelector('#modal-close-btn');
   
   newBtn.addEventListener('click', (event) => {
      let modal = document.querySelector(`#${input.name.first}-${input.name.last}`)
      modal.style.display = 'none'
   })
   let body = document.querySelector('body')
   gallery.appendChild(newModal)
}

// ------------------------------------------
//  SEARCH FUNCTIONS
// ------------------------------------------

function addSearch () {
   // create variable to hold header
   const searchContainer = document.querySelector('.search-container');
   searchContainer.innerHTML = `
      <form action="#" method="get">
         <input type="search" id="search-input" class="search-input" placeholder="Search...">
         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>
   `
};

// add functionality to the search input
// create function to perform search - two parameters: searchInput and array of student objects
function searchFunc (searchTerm, list) {
   // first make an empty array to be the starting point for a new array of students that meet the search criteria
   let newNamesArray = [];
   // for loop to check the names array
   for (let i = 0; i < list.length; i++) {
      // check to see if the search term's length doesn't equal zero and if it is included in one the student object's name properties
      if (searchTerm.value.length !== 0 && (list[i].name.title.toLowerCase().includes(searchTerm.value.toLowerCase()) || list[i].name.first.toLowerCase().includes(searchTerm.value.toLowerCase()) || list[i].name.last.toLowerCase().includes(searchTerm.value.toLowerCase()))) {
         // if it passes those tests, push the object to the new array
         newNamesArray.push(list[i]);
      // end if
      } else if (searchTerm.value.length === 0) {
         newNamesArray = data;
      }
  
   // end for
   }
   // call showPage and addPaginationFunctions with the new array as the list argument
   showPage(newNamesArray, 1)
   addPagination(newNamesArray);

   // if there are no search results, change the text content of the NoResultMsg to equal 'No results found'.
   if (newNamesArray.length === 0) {
      noResultsMsg.textContent = 'No results found';
   } else {
      noResultsMsg.textContent = ''
   }
}
addSearch()
showPage(employeeData, 1)

// test