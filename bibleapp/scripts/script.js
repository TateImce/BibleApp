var form = document.getElementById("the_form");
var copyRight = document.querySelector(".copy_right");
var year = document.querySelector(".year");

var showVerses = document.querySelector(".show_verses");
var dinaye = document.querySelector(".dinaye");

// Different form option select values
var bibleSelect = form.bible;
var bookSelect = form.book;
var chapterSelect = form.chapter;
var verseSelect = form.verse;

// Bible translations
var BIBLES = [
  "afri",
  "kjv",
  "asv",
  "asvs",
  "bishops" ,
  "coverdale",
  "geneva",
  "kjv_strongs",
  "net",
  // "tyndale", // Has mistakes
  "web"
];

// Async function to fetch json files
async function fetchJSONfile(File) {
  const response = await fetch(`http://tateimce.github.io/bibleapp/json/${File}.json`);
  // Same as but better than:
  // const response = await fetch("http://bibleapp/json/" + File + ".json");
  const bibleFile = await response.json();
  return bibleFile;
}

// New Options initialisation Function
function newOptionsInit(textContent, value) {
  let option = document.createElement("option");
  option.textContent = textContent;
  option.value = value;
  return option;
}

// New Options initialisation Function for selected option
function newOptionsInitSelected(textContent, value) {
  let option = document.createElement("option");
  option.textContent = textContent;
  option.value = value;
  option.selected = true;
  return option;
}

// ______________________________________
//___ WHEN PAGE LOADS __ //
// ______________________________________
window.addEventListener("load", () => {
  let form0 = document.getElementById("the_form");
  let bibleSelect0 = form0.bible;
  // Before clearing put select element in new variable
  let bibleSelectWorkWith = bibleSelect0;
  // Clear the existing options
  bibleSelect0.innerHTML = null;
  
  // We map over the BIBLES array and create an array of 
  // promises that resolve when each bible is fetched and processed
  let promises = BIBLES.map(async (bible) => {
    // url from which to fetch bible
    bible = `http://tateimce.github.io/bibleapp/json/${bible}.json`;

    const response = await fetch(bible);
    const biblejson = await response.json();
    let bible_1 = biblejson; // fetched bible

    // Bible translation options for selection
    bibleSelectWorkWith.appendChild(
      newOptionsInit(bible_1.metadata.name, bible_1.metadata.module)
    );
  });
  // The use of Promise.all ensures that the sorting and appending steps 
  // are only performed after all the promises are resolved
  Promise.all(promises)
    .then(() => {
      // Grab bible translation options
      let bibleSelect0OptionElements = Array.from(bibleSelectWorkWith.options);
      // and arrange alphabetically
      bibleSelect0OptionElements.sort((a, b) => a.textContent.localeCompare(b.textContent));
      
      // Add select option at the head of the array 
      // which must be the first option selected when promises are fulfilled
      bibleSelect0OptionElements.unshift(newOptionsInitSelected("Select", "empty"));
      // Append the sorted options back to the select element
      bibleSelect0OptionElements.forEach((option) => {
        bibleSelect0.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
});

// ______________________________________
//___ BIBLE TRANSLATION INPUT EVENT __ //
// ______________________________________ 
form.bible.addEventListener("input", () => {
  
  // Current condition of the form
  let form1 = document.getElementById("the_form");
  let bibleSelect1 = form1.bible;
  let bookSelect1 = form1.book;
  let previousBook = bookSelect1.value

    // Clear everything before proceeding
    bookSelect1.innerHTML = null;
    // And rebuild again
    bookSelect1.appendChild(newOptionsInit("Select", "empty"));
  
  // Run only through this one selected bible
  fetchJSONfile(bibleSelect1.value).then((biblejson) => {
    
    let bible = biblejson; // fetched bible
    
    // Grab info about translation
    copyRight.textContent = bible.metadata.copyright_statement;
    year.textContent = bible.metadata.year;
    
    // Iterate through entire verse array
    let bookPLUS = 0;
    for (let i = 0; i < bible.verses.length; i++) {

      let bookNumber = bible.verses[i].book;
      let bookName = bible.verses[i].book_name;
      
      // Create and append option element only if 
      if (bookPLUS != bookNumber ) {
          if (previousBook === bookName) {
            // Book name option for selected option
            chapterInput()
            bookSelect1.appendChild(newOptionsInitSelected(bookName, bookName));
            
          } else {
            // Book name options for selection
            bookSelect1.appendChild(newOptionsInit(bookName, bookName));
          }
          
          bookPLUS++
          
        }
    }
  });
})


// _______________________________
//___ BOOK NAME INPUT EVENT ___ //
// _______________________________
form.book.addEventListener("input", () => {
  bookNameInput();

});


// _________________________
//__CHAPTER INPUT EVENT__ //
// _________________________
form.chapter.addEventListener("input", () => {
  chapterInput();

});


// _________________________
//__VERSE INPUT EVENT__ //
// _________________________
form.verse.addEventListener("input", () => {
  verseInput();

});

window.addEventListener("load", ()=> {
  let h6 = document.createElement("h6");
  const pb = "Powered by ";
  const him = "Tuhumbata Immanuel Hamhola ";
  const copy = "&#174; 2023"
  h6.innerHTML = `${pb}${him}${copy}`;
  dinaye.appendChild(h6);
})



function verseInput() {

      // Current condition of the form
      let form4 = document.getElementById("the_form");
      let verseSelect4 = form4.verse;

      let verses = document.querySelector(".verses_paragraph");
      let markIfExists = document.querySelector(".mark")
        
      // If mark elements exists please remove it
      if (markIfExists !== null) {
        // Extract text
        let markText = markIfExists.textContent
        // get previous sibling
        let number = markIfExists.previousSibling

        verses.removeChild(markIfExists);
        
        // reappend text
        number.after(markText);
        number.removeAttribute("class");
      }

      // Get selected index
      let selected = verseSelect4.options.selectedIndex;      
      let verseNumbers = verses.children;
        
        for (let i = 0; i < verseNumbers.length; i++) {
          
          if (Number(verseNumbers[i].textContent) == selected) {
            
            let verseText = verseNumbers[i].nextSibling;

            let mark = document.createElement("mark");
            mark.setAttribute("class", "bg-primary mark");
            mark.append(verseText);

            verseNumbers[i].setAttribute("class", "bg-primary");
      
            // append mark node after verseNumbers[i] node 
            verseNumbers[i].after(mark);

          }
        }
}


// __BOOK INPUT FUNCTION__ //
function bookNameInput() {
  
    // Current condition of the form
    let form2 = document.getElementById("the_form");
    let bibleSelect2 = form2.bible;
    let bookSelect2 = form2.book;
    let chapterSelect2 = form2.chapter;


    // Clear everything before proceeding
    chapterSelect2.innerHTML = null;

    // Rebuild again
    chapterSelect2.appendChild(newOptionsInit("Select", "empty"));

    for (let i = 0; i < 1; i++) {

      // Run only through this one selected bible    
      fetchJSONfile(bibleSelect2.value).then((biblejson) => {
        let bible = biblejson; // fetched bible

        let bookPLUS2 = 1;
        for (let x = 0; x < bible.verses.length; x++) {

          let bookName = bible.verses[x].book_name;
          let bookChapter = bible.verses[x].chapter;

          // Selected book must be identical to a book in the json
          // However to avoid duplication of chapters
          // bookPLUS2 will only change value when it is equal to bookChapter
          if (bookSelect2.value === bookName && bookPLUS2 == bookChapter) {
            // Chapter number options for selection
            chapterSelect.appendChild(newOptionsInit(bookChapter, bookChapter));

            bookPLUS2++;

          }

        }

      });
    }  
  }


  // __CHAPTER INPUT FUNCTION__ //
  function chapterInput() {
  
      // Current condition of the form
      let form3 = document.getElementById("the_form");
      let bibleSelect3 = form3.bible;
      let bookSelect3 = form3.book;
      let chapterSelect3 = form3.chapter;
      let verseSelect3 = form3.verse;
  
      // Clear everything before proceeding
      verseSelect3.innerHTML = null;
      // And rebuild
      verseSelect3.appendChild(newOptionsInit("Select", "empty"));
  
      // Clear verses text as well
      showVerses.innerHTML = null;
      let para = document.createElement("p"); // To contain the verse text
      para.setAttribute("class", "verses_paragraph")
  
      for (let i = 0; i < 1; i++) {
  
        // Run only through this one selected bible    
        fetchJSONfile(bibleSelect3.value).then((biblejson) => {
          let bible = biblejson; // fetched bible
  
          for (let x = 0; x < bible.verses.length; x++) {
  
            let bookName2 = bible.verses[x].book_name;
            let bookChapter2 = bible.verses[x].chapter;
            let chapterVerse = bible.verses[x].verse;
  
            // If the selected book is identical to a book in the json
            // And the selected chapter is equal to a chapter in that book  
            if (bookSelect3.value === bookName2 && chapterSelect3.value == bookChapter2) {
              // verse number options for selection
              verseSelect.appendChild(newOptionsInit(chapterVerse, chapterVerse));
  
              // Verse text and number
              let verse = document.createElement("strong"); // To enclose the verse number
  
  
              // let div = document.createElement("div"); // To contain both the above
              verse.textContent = bible.verses[x].verse; // The number
  
              // para.textContent = bible.verses[x].text; // The Text
              let text = document.createTextNode(" " + bible.verses[x].text);
  
              // div.appendChild(verse);
              // div.appendChild(para);
              para.appendChild(text);
              para.insertBefore(verse, text);
  
              showVerses.appendChild(para);
            }
  
          }
  
        });
      }  
  }

  
