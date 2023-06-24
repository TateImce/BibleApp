var form = document.getElementById("the_form");
var showStuff = document.querySelector(".show_stuff");
var copyRight = document.querySelector(".copy_right");
var year = document.querySelector(".year");

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
  "tyndale",
  "web"
];

// Async function to fetch json files
async function fetchJSONfile(File) {
  const response = await fetch("/json/" + File + ".json");
  const bibleFile = await response.json();
  return bibleFile;
}


// Run through
// _______________________
//__ WHEN PAGE LOADS __ //
// _______________________
for (let i = 0; i < BIBLES.length; i++) {

  fetchJSONfile(BIBLES[i]).then((biblejson) => {
    var bible = biblejson; // fetched bible

    var option = document.createElement("option");
    option.textContent = bible.metadata.name;
    option.value = bible.metadata.module;

    bibleSelect.appendChild(option);
       
  });
}


// ______________________________________
//___ BIBLE TRANSLATION INPUT EVENT __ //
// ______________________________________ 
form.bible.addEventListener("input", () => {
  
  let form1 = document.getElementById("the_form");
  let bibleSelect1 = form1.bible;
  let bookSelect1 = form1.book;

    // Clear everything before proceeding
    let option = document.createElement("option");
    option.textContent = "Select";
    option.value = "empty";
    bookSelect1.innerHTML = "";

    bookSelect1.appendChild(option);
  
  // Run only through this one selected bible
  fetchJSONfile(bibleSelect1.value).then((biblejson) => {
    
    var bible = biblejson; // fetched bible

    copyRight.textContent = bible.metadata.copyright_statement;
    year.textContent = bible.metadata.year;
    
    // Iterate through entire verse array
    let bookPLUS = 0;
    for (let i = 0; i < bible.verses.length; i++) {

      let bookNum = bible.verses[i].book;
      
      // Create and append option element if 
      if (bookPLUS != bookNum ) {
        
          var option = document.createElement("option");
          option.textContent = bible.verses[i].book_name;
          option.value = bible.verses[i].book_name;
  
          bookSelect.appendChild(option);
          
          bookPLUS++
          
        }
    }

  });

})


// _______________________________
//___ BOOK NAME INPUT EVENT ___ //
// _______________________________
form.book.addEventListener("input", () => {

  var form2 = document.getElementById("the_form");
  var bibleSelect2 = form2.bible;
  var bookSelect2 = form2.book;
  var chapterSelect2 = form2.chapter;

  // Clear everything before proceeding
  var option = document.createElement("option");
  option.textContent = "Select";
  option.value = "empty";
  chapterSelect2.innerHTML = "";
  chapterSelect2.appendChild(option);
  
  for (let i = 0; i < 1; i++) {
  
    // Run only through this one selected bible    
    fetchJSONfile(bibleSelect2.value).then((biblejson) => {
      var bible = biblejson; // fetched bible
      
      var bookPLUS2 = 1;
      for (let x = 0; x < bible.verses.length; x++) {
        
        var bookName = bible.verses[x].book_name;
        var bookChapter = bible.verses[x].chapter;
        // console.log(bookName);

        // bookPLUS2 will only change value when it is equal to bookChapter
        if (bookSelect2.value === bookName && bookPLUS2 == bookChapter) {

          var option3 = document.createElement("option");
          option3.textContent = bible.verses[x].chapter;
          option3.value = bible.verses[x].chapter;
  
          chapterSelect.appendChild(option3);
          
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

  var form3 = document.getElementById("the_form");
  var bibleSelect3 = form3.bible;
  var bookSelect3 = form3.book;
  var chapterSelect3 = form3.chapter;
  var verseSelect3 = form3.verse;

    // Clear everything before proceeding
    var option = document.createElement("option");
    option.textContent = "Select";
    option.value = "empty";
    verseSelect3.innerHTML = "";
    verseSelect3.appendChild(option);

    showStuff.innerHTML = "";
   
  for (let i = 0; i < 1; i++) {

    // Run only through this one selected bible    
    fetchJSONfile(bibleSelect3.value).then((biblejson) => {
      var bible = biblejson; // fetched bible
      
      var bookPLUS3 = 1;
      for (let x = 0; x < bible.verses.length; x++) {
        
        var bookChapter2 = bible.verses[x].chapter;
        var chapterVerse = bible.verses[x].verse;
        var bookName2 = bible.verses[x].book_name;
        // console.log(chapterVerse);

        // bookPLUS3 will only change value when it is equal to bookverse
        if (bookSelect3.value === bookName2 && chapterSelect3.value == bookChapter2) {
          // verse number options
          var option4 = document.createElement("option");
          option4.textContent = bible.verses[x].verse;
          option4.value = bible.verses[x].verse;
          
          verseSelect.appendChild(option4);
          
          // Verse text and number
          var verse = document.createElement("strong");
          var para = document.createElement("p");
          var div = document.createElement("div");
          
          verse.textContent = bible.verses[x].verse
          para.textContent = bible.verses[x].text;
          
          div.appendChild(verse);
          div.appendChild(para);
          showStuff.appendChild(div);
          
          bookPLUS3++
          
        }
        
      }
      
    });
  }
  
})