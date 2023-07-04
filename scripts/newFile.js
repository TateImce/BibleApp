/* The following books options list does not initially load 
alphabetically. What am I doing wrong? */

window.addEventListener("load", () => {

  let form0 = document.getElementById("the_form");
  let bookSelect0 = form0.book;
  let bookSelectWorkWith = bookSelect0;
  // Clear the existing options
  bookSelect0.innerHTML = null;

  let FullLength = bookS.length - 1;
  for (let i = 0; i < bookS.length; i++) {
    // iterate through bookS array
    fetchJSONfile(books[i]).then((bookjson) => {
      let book = bookjson; // fetched book

      // book translation options for selection
      bookSelectWorkWith.appendChild(
        newOptionsInit(book.metadata.name, book.metadata.module)
      );
    
    }).then(() => {
      // Grab Translation options and arrange alphabetically  
      if (i == FullLength) {
        // convert option elements iterable object to array 
        let bookSelect0OptionElements = Array.from(bookSelectWorkWith.options);
        // To be able to apply array methods
        // Sort the options alphabetically
        bookSelect0OptionElements.sort((a, b) => a.textContent.localeCompare(b.textContent)
        );

        // Append the sorted options back to the select element
        bookSelect0OptionElements.forEach((option) => {
          bookSelect0.appendChild(option);
        });
      }
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  }

});


/* You can achieve the same result without using an async 
function by utilizing the fetch API directly and chaining 
promises. Here's an example: */
window.addEventListener("load", () => {
  let form0 = document.getElementById("the_form");
  let bookSelect0 = form0.book;
  let bookSelectWorkWith = bookSelect0;
  // Clear the existing options
  bookSelect0.innerHTML = null;

  let promises = bookS.map((book) => {
    return fetch(book)
      .then((response) => response.json())
      .then((bookjson) => {
        let book = bookjson; // fetched book

        // book translation options for selection
        bookSelectWorkWith.appendChild(
          newOptionsInit(book.metadata.name, book.metadata.module)
        );
      });
  });

  Promise.all(promises)
    .then(() => {
      // Grab Translation options and arrange alphabetically
      let bookSelect0OptionElements = Array.from(bookSelectWorkWith.options);
      bookSelect0OptionElements.sort((a, b) =>
        a.textContent.localeCompare(b.textContent)
      );

      // Append the sorted options back to the select element
      bookSelect0OptionElements.forEach((option) => {
        bookSelect0.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
});
/* In this modified version, instead of using the fetchJSONfile 
function, we directly use the fetch API to retrieve the JSON data 
for each book. We map over the bookS array and create an array of 
promises that resolve when each book is fetched and processed.

The rest of the code remains the same, with the sorting of options 
and appending them back to the select element. The use of 
Promise.all ensures that the sorting and appending steps are 
performed after all the promises are resolved. */




