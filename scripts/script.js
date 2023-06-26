var form = document.getElementById("the_form");
var copyRight = document.querySelector(".copy_right");
var year = document.querySelector(".year");
var showVerses = document.querySelector(".show_verses");

// Different form option select values
var bibleSelect = form.bible;
var bookSelect = form.book;
var chapterSelect = form.chapter;
var verseSelect = form.verse;

// Bible translations
var BIBLES = [
  "afri",
  "asv",
  "asvs",
  "bishops" ,
  "coverdale",
  "geneva",
  "kjv_strongs",
  "kjv",
  "net",
  // "tyndale", // Has mistakes
  "web"
];

// Async function to fetch json files
async function fetchJSONfile(File) {
  const response = await fetch("/json/" + File + ".json");
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


// Run through
// _______________________
//__ WHEN PAGE LOADS __ //
// _______________________
for (let i = 0; i < BIBLES.length; i++) {
  // iterate through BIBLES array
  fetchJSONfile(BIBLES[i]).then((biblejson) => {
    let bible = biblejson; // fetched bible
    
    // Bible translation options for selection
    bibleSelect.appendChild(newOptionsInit(bible.metadata.name, bible.metadata.module));
       
  });
}


// ______________________________________
//___ BIBLE TRANSLATION INPUT EVENT __ //
// ______________________________________ 
form.bible.addEventListener("input", () => {
  
  // Current condition of the form
  let form1 = document.getElementById("the_form");
  let bibleSelect1 = form1.bible;
  let bookSelect1 = form1.book;
  let chapterSelect1 = form1.chapter;
  
  console.log(bookSelect1.value);
  console.log(chapterSelect1.value);

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
          // Book name options for selection
          bookSelect1.appendChild(newOptionsInit(bookName, bookName));
          
          bookPLUS++
          
        }
    }

  });

})


// _______________________________
//___ BOOK NAME INPUT EVENT ___ //
// _______________________________
form.book.addEventListener("input", () => {
  
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
          
          bookPLUS2++
          
        }
        
      }
      
    });
  }
  
})


// _________________________
//__CHAPTER INPUT EVENT__ //
// _________________________
form.chapter.addEventListener("input", () => {
  
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
          let para = document.createElement("p"); // To contain the verse text
          let div = document.createElement("div"); // To contain both the above
          
          verse.textContent = bible.verses[x].verse // The number
          para.textContent = bible.verses[x].text; // The Text
          
          div.appendChild(verse);
          div.appendChild(para);
          showVerses.appendChild(div);
          
        }
        
      }
      
    });
  }
  
})