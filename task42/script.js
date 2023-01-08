// "use strict";

// GLOBAL SELECTORS / VARIABLES
// Templates for query selector and query selector all
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// SAVED ITEMS SECTION
const articleBtns = $$(".article-btn"); // Nodelist of save article buttons
const imageBtns = $$(".image-btn"); // Nodelist of save image buttons
const articlesContainer = $("#articles-container"); // Container to display saved articles
const imagesContainer = $("#images-container"); // Container to display saved images

// COMMENTS SECTION
const commentBtn = $("#comment-btn"); // Submit button on comments page
const commentsList = $("#comments-list");
const headingText = $("#comment-heading"); // Heading text for blog subject chosen
let ratingDiv = $("#comment-rating");
let selectedBlog = $("#blog-list"); // List of blogs

// CONTACT FORM SECTION
const contactBtn = $("#contact-btn");
const userName = $("#user-name");
const userMessage = $("#user-message");
const contactForm = $("#contact");

// ARRAYS FOR SAVED ITEMS PAGE
// Array to hold all article headings
const headingsArray = [];
// Array to hold all arcticles
const allArticles = [];
// Array for images
const allImages = [];

// SAVE ARTICLE CODE SECTION
// Set up a saved articles array in local storage if it does not exist
let savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

// Select all headings using article heading class and save each heading inside the headingsArray
const headings = Array.from($$(".article-heading"));
headings.forEach((heading) => {
  headingsArray[headingsArray.length] = heading.innerHTML;
});

// Select all articles using article heading class and save each heading inside the allArticles array
const articles = Array.from($$(".article"));
articles.forEach((article) => {
  allArticles[allArticles.length] = article.innerHTML;
});

// Find index of article button that has been clicked
articleBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.parentElement.closest(".article-with-image")) {
      const itemHeading = e.target.parentElement
        .closest(".article-with-image")
        .querySelector("h2").innerHTML;
      const index = headingsArray.indexOf(itemHeading);
      const obj = {
        heading: headingsArray[index],
        article: allArticles[index],
      };
      // Store selected item in local storage
      storeSavedArticle(obj);
    }
  });
});

// SAVE SELECTED ARTICLES TO LOCAL STORAGE
function storeSavedArticle(article) {
  // Check if the article is already stored in local storage.  If is not stored, add it, else let the user know it has already been stored
  const index = savedArticles.findIndex(
    (object) => object.heading === article.heading
  );
  if (index === -1) {
    savedArticles.push(article);
    const articleCount = savedArticles.length;
    alert(`You have saved ${articleCount} article(s) for review`);
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  } else {
    alert("Article has already been saved!");
  }
}

// SAVE IMAGE CODE SECTION
// Find index of image button that has been clicked
imageBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    const image = e.target.parentElement.children[0].getAttribute("src");
    storeImgToLocalStorage(image);
  });
});

function storeImgToLocalStorage(image) {
  // Check if selection exists by call it. If not, create an empty array
  let existingEntries = JSON.parse(localStorage.getItem("images"));
  if (existingEntries === null) existingEntries = [];
  // If images folder exists, get it and and the new image
  localStorage.setItem("images", JSON.stringify(image));
  // Check if image is already stored in folder prior to adding it
  if (!existingEntries.includes(image)) {
    // Add the image to the image folder and let the user know how many images are currently saved
    existingEntries.push(image);
    const imageCount = existingEntries.length;
    alert(`You have saved ${imageCount} image(s) for review`);
  } else {
    // Notify the user if image has been previously saved
    alert("Image has already been saved!");
  }

  // Update the images key in local storage
  localStorage.setItem("images", JSON.stringify(existingEntries));
}

// DISPLAY SAVED ARTICLES
// Function to display saved items on the saved items page
function displaySavedArticles() {
  // Do nothing if local storage is empty
  if (localStorage.savedArticles === undefined) return;
  // If there are records stored, retrieve them from local storage and parse with JSON
  let savedArticles = JSON.parse(localStorage.savedArticles);

  // Display all articles stored in local storage
  savedArticles.forEach((article) => {
    const saveDiv = document.createElement("div");
    const displayItem = `
      <div class="container saved-articles">
        <div class="split">
          <div>
            <h2>${article.heading}</h2>
            <p>${article.article}</p>
          </div>
        </div>
      </div>
    `;
    saveDiv.innerHTML = displayItem;
    if (articlesContainer !== null) {
      articlesContainer.appendChild(saveDiv);
    }
  });
}

// Run display saved items function
displaySavedArticles();

// DISPLAY SAVED IMAGES
// Function to display saved items on the saved items page
function displaySavedImages() {
  // Do nothing if local storage is empty
  if (localStorage.images === undefined) return;
  // If there are records stored, retrieve them from local storage and parse with JSON
  let savedImages = JSON.parse(localStorage.images);

  // Display all articles stored in local storage
  savedImages.forEach((image) => {
    const saveDiv = document.createElement("div");
    const displayItem = `
      <div class="container saved-images">
        <div class="split">
          <div>
            <img src=${image} />
          </div>
        </div>
      </div>
    `;
    saveDiv.innerHTML = displayItem;
    if (imagesContainer !== null) {
      imagesContainer.appendChild(saveDiv);
    }
  });
}

// Run display saved images function
displaySavedImages();

// STORE COMMENTS TO LOCAL STORAGE
// Save comments function
function saveComments() {
  const userComments = $("#message"); // Text area for comments
  let rating = $("#rating-options"); // Ratings variable

  // Remind user to enter a value if not chosen
  while (rating.value === "") {
    alert("Please choose a rating");
    break;
  }

  // Remind user to enter a comment if not entered
  while (userComments.value === "") {
    alert("Please enter comments");
    break;
  }
  // Check value of comment added
  // Take the values entered by the user and pass it to the switch statement
  const obj = { comment: userComments.value, rating: rating.value };
  let chosenBlog = selectedBlog.value;
  // If any of user comments, rating, or chosen blog are not valid do not pass the value to local storage
  if (
    userComments.value === "" ||
    rating.value === "" ||
    rating.value < "1" ||
    rating.value > "5" ||
    isNaN(rating.value) ||
    chosenBlog === ""
  )
    return;
  switch (chosenBlog) {
    // Save the blog value and user comment into local storage
    case "brain":
      saveToLocalStorage(chosenBlog, obj);
      // Reset user comments and rating values to blank after saving to local storage
      userComments.value = "";
      rating.value = "";
      break;
    case "competition":
      saveToLocalStorage(chosenBlog, obj);
      userComments.value = "";
      rating.value = "";
      break;
    case "thought":
      saveToLocalStorage(chosenBlog, obj);
      userComments.value = "";
      rating.value = "";
      break;
    case "exercise":
      saveToLocalStorage(chosenBlog, obj);
      userComments.value = "";
      rating.value = "";
      break;
    case "buzan":
      saveToLocalStorage(chosenBlog, obj);
      userComments.value = "";
      rating.value = "";
      break;
    default:
      console.log("Invalid choice");
  }
}

// Function to save comments and ratings to local storage
function saveToLocalStorage(selection, commentRating) {
  // Check if selection exists by call it. If not, create an empty array
  let existingEntries = JSON.parse(localStorage.getItem(selection));
  if (existingEntries === null) existingEntries = [];
  // If selection exists, get it and and the new comment
  localStorage.setItem(selection, JSON.stringify(commentRating));
  existingEntries.push(commentRating);
  // Save the selection and new comment to local storage
  localStorage.setItem(selection, JSON.stringify(existingEntries));
}

// Save comments to local storage when user clicks button to submit, and show current comments for that particular blog
if (commentBtn !== null) {
  commentBtn.addEventListener("click", saveComments);
  showComments();
}

// SHOW COMMENTS ON COMMENTS PAGE
// Function to clear current data - is run inside printlist everytime the user adds an item
function clearComments() {
  // Hide visibility of star rating div
  ratingDiv.style.visibility = "hidden";
  headingText.innerHTML = "";
  let ulElement = document.querySelector("#comments-list");
  ulElement.innerHTML = "";
}

// Function to loop through comments and display them inside the UL element on the web page
function printComments() {
  // Empty UL of existing contents
  clearComments();

  // Retrieve an array of comments for the selected blog from local storage
  let comments = JSON.parse(localStorage.getItem(selectedBlog.value));
  // Return if there is no array
  if (comments === null || comments.length < 1) return;
  ratingDiv.display = "block";
  // Show a heading for selected blog item
  headingText.innerHTML = selectedBlog.value + " comments";
  // Show star ratings for the selected blog
  ratingDiv.classList.add(selectedBlog.value);

  // CALCULATION FOR STAR RATINGS
  // Maximum number of stars available
  const MAX_STARS = 5;
  // Sum the total number of stars for that particular blog
  let sum = 0;
  for (let rating in comments) {
    sum += Number(comments[rating].rating);
  }

  // Work out percentage of star given against the maximum
  const starPercentage = (sum / (MAX_STARS * comments.length)) * 100;

  // Round to nearest 10
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  // Make the star ratings div visible
  ratingDiv.style.visibility = "visible";
  // Show the percentage of stars on the web page
  document.querySelector(`.${selectedBlog.value} .stars-inner`).style.width =
    starPercentageRounded;

  // Loop through the comments in the array and display them on the web page
  comments.forEach((item) => {
    // Create li element and store it in a comment variable
    const comment = document.createElement("li");
    // Inside each comment inside a li element
    comment.innerHTML = `${item.comment} - rating of ${item.rating} star(s)`;
    // Add all the li elements to the commentsList UL
    commentsList.appendChild(comment);
  });
}

// Function to show comments on the web page
function showComments() {
  printComments();
}

// CONTACT FORM SECTION
// Event listener for contact form submission
if (contactForm !== null) {
  contactForm.addEventListener("submit", submitForm);
}

// Function to validate user name and message have been added prior to submission
function submitForm(e) {
  e.preventDefault();
  let isValid = true;
  if (userName.value === "") {
    alert("Name is required!");
    isValid = false;
  }

  if (userMessage.value === "") {
    alert("Please enter your message!");
    isValid = false;
  }

  if (isValid === true) {
    // Only submit if user name and message have been added.  Submission is not saved
    $("form").submit();
  }
}

// TO DO LATER - ADD FUNCTIONALITY TO DELETE SAVED ITEMS
