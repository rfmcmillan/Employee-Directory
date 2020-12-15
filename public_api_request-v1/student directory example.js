/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// create a span to hold the 'No Results' message. This message will have it's text content changed depending on whether there are results or not.
const wholePage = document.querySelector('.page');
   let noResultsMsg = document.createElement('span');
   noResultsMsg.className = 'no-results';
   wholePage.appendChild(noResultsMsg);

// give two parameters to the function: list (from data.js file) and page 
function showPage (list, page) {
   const itemsPerPage = 9;
   // create startIdx variable = (page parameter * items per page) - items per page
   let startIdx = (page * itemsPerPage) - itemsPerPage;
   // create endIdx variable = page parameter * items per page
   let endIdx = (page * itemsPerPage);
   // create new variable and assign to it the UL element with a class of 'student-list'
   let studentList = document.querySelector('.student-list');
   // set the innerHTML of the above variable to an empty string to remove the previously displayed students from being displayed at page reload
   studentList.innerHTML = '';
   // for loop that loops over the list that is passed in as an argument
   for (let i = 0; i < list.length; i++) {
   //    if statement: check if the i is greater than startIdx and less than EndIdx
      if (i >= startIdx && i < endIdx) {
   //       run the insertStudent helper function that is defined below
         let currStudent = list[i]; 
         insertStudent(currStudent)
      // end if
      }
   // end for
   }

   // Create the insertStudent helper function that will be included in the showPage function.
   function insertStudent (student) {
   // create li and give a className of "student-item cf"
      const studentLI = document.createElement('li');
      studentLI.className = 'student-item cf';
   // append the li in the ul in the html file
      studentList.appendChild(studentLI);
   // create div and give a className of "student-details"
      const studentDetails = document.createElement('div');
      studentDetails.className = 'student-details';
   // append the div in the li
      studentLI.appendChild(studentDetails);
   // create an img and give className of "avatar", give it a src and alt as well
      const studentImage = document.createElement('img');
      studentImage.className = 'avatar';
      studentImage.src = student.picture.medium
      studentImage.alt = 'Picture of Student'
   // append img in the div
      studentDetails.appendChild(studentImage);
   // create h3 and change text content to be a student name
      const studentName = document.createElement('h3');
      studentName.textContent = `${student.name.title} ${student.name.first} ${student.name.last}`
   // append to the div
      studentDetails.appendChild(studentName); 
   // create a span and set text content to student's email address 
      const studentEmail = document.createElement('span');
      studentEmail.textContent = student.email;
   // append the span to the div
      studentDetails.appendChild(studentEmail);

   // create another div to contain the 'joined' info
      const joinedDate = document.createElement('div'); 
   // give div a class of "joined-details"
      joinedDate.className = 'joined-details';
   // append the div in the li
      studentLI.appendChild(joinedDate);
   // create span
      const joinedSpan = document.createElement('span');
   // give span a class of "date"
      joinedSpan.className = 'date';
   // change span's textContent to the student's join date
      joinedSpan.textContent = student.registered.date;
   // append span in div
      joinedDate.appendChild(joinedSpan);
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
// function accepts an array as the only argument
function addPagination (list) {
   // create variable to hold the number of students you want to display
   const itemsPerPage = 9;
   //create variable to store number of pagination buttons needed
   const numberOfButtons = Math.ceil(list.length/itemsPerPage);
   // create variable to store UL with classname 'link-list'
   const paginationList = document.querySelector('.link-list');
   // set innerHTML to empty string to clear out any previous pagination buttons
   paginationList.innerHTML = '';
   // for loop that creates the pagination buttons
   for (let i = 0; i < numberOfButtons; i++) {
   //    create li
      const buttonLI = document.createElement('li');
   //    append the li to the ul
      paginationList.appendChild(buttonLI);
   //    create button
      const paginationButton = document.createElement('button');
   //    set button type to 'button'
      paginationButton.type = 'button';
   //    set button textContent to i
      paginationButton.textContent = i+1;
   //    append button to the li
      buttonLI.appendChild(paginationButton);
   // end for
   }
   // select first button
   let firstButton = document.querySelector('button');
   // give className of 'active'
   firstButton.className = 'active';
   // create eventListener to listen for clicks on any of the pagination buttons
   
   // for loop that adds event listener to each pagination button
   for (let i = 0; i < paginationList.children.length; i++) {
      let currButton = paginationList.children[i].firstElementChild;
      currButton.addEventListener('click', (e) => {
         for (let j = 0; j < paginationList.children.length; j++) {
            // removes 'active' className from all buttons
            paginationList.children[j].firstElementChild.className = ''
            // end for
            }
         // add 'active' class to click target
         e.target.className = 'active';
         // to show the selected page, call the showPage function passing 'data' as the list argument and the button's corresponding page number as the page argument
         showPage(list,e.target.textContent)
      // end event listener
      });
   // end for
   }
}

// Create addSearch function to add the search bar at the top of the page
function addSearch () {
   // create variable to hold header
   const header = document.querySelector('header');
   // function adds a label to the header in the html file after the 'Student' h2   
   const searchLabel = document.createElement('label');
   // add label inside the header
   header.appendChild(searchLabel);
   // give it a 'for' of 'search'
   searchLabel.htmlFor = 'search';
   // give it a className of 'student-search'
   searchLabel.className = 'student-search';
   // inside the label, append an input for the search
   const searchInput = document.createElement('input');
   searchInput.type = 'text';
   searchInput.id = 'search';
   searchInput.placeholder = 'Search by name...';
   searchLabel.appendChild(searchInput);
   // also inside the label, append a button
   const searchButton = document.createElement('button');
   searchButton.type = 'button';
   searchButton.id = 'submit';
   searchButton.innerHTML = '<img src="img/icn-search.svg" alt="Search icon"></img>';
   searchLabel.appendChild(searchButton);
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

// Call functions for the initial page load. These load the students, the page buttons and the search bar. 
showPage(data, 1)
addPagination(data);
addSearch();
   
// create variables to use in the event listeners 
// variable to hold the search input
const search = document.querySelector('#search');
// variable to hold the search button
const submit = document.querySelector('#submit');
   
// call the search function in the callbacks of the event listeners below; pass in search and data as the arguments
submit.addEventListener('click', (e) => {
   e.preventDefault();
   searchFunc(search, data);
});

search.addEventListener('keyup', (e) => {
   searchFunc(search, data);
});