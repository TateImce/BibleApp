// The following script obviously deals with our links

// var path = "http://bibleapp/"
var path = "https://tateimce.github.io/bibleapp/"
// var path = "";

var head = document.head;
var body = document.body;

// ____________
// __STYLE__ //
// ____________
// Bootstrap link
var cssLink1 = document.createElement("link");
cssLink1.rel = "stylesheet";
cssLink1.href = `${path}style/bootstrap.min.css`;
console.log(cssLink1.href);

// Main css link
var cssLink2 = document.createElement("link");
cssLink2.rel = "stylesheet";
cssLink2.href = `${path}style/main.css`;

// ______________
// __SCRIPTS__ //
// ______________
// Bootstrapjs link
var scrptLin1 = document.createElement("script");
scrptLin1.src = `${path}scripts/bootstrap.bundle.min.js`;
scrptLin1.async = false;

// Customjs link
var scrptLin2 = document.createElement("script");
scrptLin2.src = `${path}scripts/script.js`;
scrptLin2.async = false;
/* Dynamically inserted scripts (using document.createElement()) 
load asynchronously by default, so to turn on synchronous loading 
(i.e. scripts load in the order they were inserted) set async="false". */

// Append only after DOM is loaded
document.addEventListener("DOMContentLoaded", ()=> {

    head.appendChild(cssLink1);
    head.appendChild(cssLink2);
    body.appendChild(scrptLin1);
    body.appendChild(scrptLin2);

});
