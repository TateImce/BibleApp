// The following script obviously deals with our links

// var path = "http://bibleapp/"
var path = "https://tateimce.github.io/bibleapp/"
// var path = "";

var head = document.head;

// Bootstrap link
var cssLink1 = document.createElement("link");
cssLink1.rel = "stylesheet";
cssLink1.href = `${path}style/bootstrap.min.css`;
console.log(cssLink1.href);

// Main css link
var cssLink2 = document.createElement("link");
cssLink2.rel = "stylesheet";
cssLink2.href = `${path}style/main.css`;

head.appendChild(cssLink1);
head.appendChild(cssLink2);

var body = document.body;

// Bootstrapjs link
var scrptLin1 = document.createElement("script");
scrptLin1.src = `${path}scripts/bootstrap.bundle.min.js`;
console.log(scrptLin1.src);

// Customjs link
var scrptLin2 = document.createElement("script");
scrptLin2.src = `${path}scripts/script.js`;

body.appendChild(scrptLin1);
body.appendChild(scrptLin2);
