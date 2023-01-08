"use strict";
// Templates for query selector and query selector all
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// COMMENTS SECTION
const commentBtn = $("#comment-btn"); // Submit button on comments page
const deleteBtns = $$(".btnDelete");
const userComments = $("#message"); // Text area for comments
let selectedBlog = $("#blog-list");
// let rating = $("#rating-options").value;
// console.log(rating);

const containers = $$(".container");
const saveBtns = $$(".saveBtn"); // Nodelist of save buttons
const memoryTable = $(".mem-table"); // Memory table in about page

// COMMENTS SECTION

// Save comments function
function saveComments(e) {
  e.preventDefault();

  while (rating === "" || rating < "1" || rating > "5") {
    rating = prompt("Please enter a value between 1 and 5");
    console.log(rating);
  }
  // Check value of comment added
  // Take the value of the blog selected by the user and pass it to the switch statement

  let chosenBlog = selectedBlog.value;
  switch (chosenBlog) {
    // Save the blog value and user comment into local storage
    case "brain":
      saveToLocalStorage(chosenBlog, userComments.value);
      userComments.value = "";
      break;
    case "competition":
      saveToLocalStorage(chosenBlog, userComments.value);
      userComments.value = "";
      break;
    case "thought":
      saveToLocalStorage(chosenBlog, userComments.value);
      userComments.value = "";
      break;
    case "exercise":
      saveToLocalStorage(chosenBlog, userComments.value);
      userComments.value = "";
      break;
    case "buzan":
      saveToLocalStorage(chosenBlog, userComments.value);
      userComments.value = "";
      break;
    default:
      console.log("Invalid choice");
  }
}

function saveToLocalStorage(selection, comment) {
  // Check if selection exists by call it. If not, create an empty array
  let existingEntries = JSON.parse(localStorage.getItem(selection));
  if (existingEntries === null) existingEntries = [];
  // If selection exists, get it and and the new comment
  localStorage.setItem(selection, JSON.stringify(comment));
  existingEntries.push(comment);
  // Save the selection and new comment to local storage
  localStorage.setItem(selection, JSON.stringify(existingEntries));
}

// Save comments to local storage when added on comments page
// commentBtn.addEventListener("click", saveComments);

// ARRAYS FOR SAVED ITEMS PAGE
// Array to hold all article headings
const headingsArray = [];
// Array to hold all arcticles
const allArticles = [];
// Array for images
const allImages = [];

// Set up a saved items array in local storage if it does not exist
let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

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

// Select all images using image class and save each heading inside the allImages array
const images = Array.from($$(".article-img"));
images.forEach((image) => {
  allImages[allImages.length] = image.currentSrc;
});

// Find index of button that has been click
saveBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.parentElement.closest(".article-with-image")) {
      const itemHeading = e.target.parentElement
        .closest(".article-with-image")
        .querySelector("h2").innerHTML;
      const index = headingsArray.indexOf(itemHeading);
      const obj = {
        heading: headingsArray[index],
        article: allArticles[index],
        image: allImages[index],
      };
      // Store selected item in local storage
      storeSavedItem(obj);
    } else {
      const itemHeading = e.target.parentElement
        .closest(".article-with-table")
        .querySelector("h2").innerHTML;
      const index = headingsArray.indexOf(itemHeading);
      const obj = {
        heading: headingsArray[index],
        article: allArticles[index],
        table: tableInfo,
      };
      // Store selected item in local storage
      storeSavedItem(obj);
    }
  });
});

// Function to store selected item
function storeSavedItem(item) {
  // Check if the article is already stored in local storage.  If is not stored, add it, else let the user know it has already been stored
  const index = savedItems.findIndex(
    (object) => object.heading === item.heading
  );
  if (index === -1) {
    savedItems.push(item);
    const count = savedItems.length;
    alert(`You have saved ${count} article(s) for review`);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  } else {
    alert("Article has already been saved!");
  }
}

// Function to display saved items on the saved items page
function displaySavedItems() {
  const savedItemsContainer = $("#save-container"); // Container to display saved items
  // Do nothing if local storage is empty
  if (localStorage.savedItems === undefined) return;
  // If there are records stored, retrieve them from local storage and parse with JSON
  let savedItems = JSON.parse(localStorage.savedItems);
  const index = savedItems.findIndex((object) =>
    object.hasOwnProperty("table")
  );
  const tableArticle = savedItems[index];
  // Display all items stored in local storage
  savedItems.forEach((item) => {
    const saveDiv = document.createElement("div");
    // Display article which has a table
    if (item === tableArticle) {
      const displayItem = `
      <div class="container">
        <div class="split">
          <div>
            <h2>${tableArticle.heading}</h2>
            <p>${tableArticle.article}</p>
            <button class="btnDelete">Delete saved article</button>
          </div>
          <div>
            <table class="mem-table">
              <thead><th>${tableArticle.table[0].content}</th>
              <th>${tableArticle.table[1].content}</th>
              <th>${tableArticle.table[2].content}</th>
              </thead>
              <tbody>
              <tr>
                <td>${tableArticle.table[3].content}</td>
                <td>${tableArticle.table[4].content}</td>
                <td>${tableArticle.table[5].content}</td>
              </tr>
              <tr>
                <td>${tableArticle.table[6].content}</td>
                <td>${tableArticle.table[7].content}</td>
                <td>${tableArticle.table[8].content}</td>
              </tr>
              <tr>
                <td>${tableArticle.table[9].content}</td>
                <td>${tableArticle.table[10].content}</td>
                <td>${tableArticle.table[11].content}</td>
              </tr>
              <tr>
                <td>${tableArticle.table[12].content}</td>
                <td>${tableArticle.table[13].content}</td>
                <td>${tableArticle.table[14].content}</td>
              </tr>
              <tr>
                <td>${tableArticle.table[15].content}</td>
                <td>${tableArticle.table[16].content}</td>
                <td>${tableArticle.table[17].content}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
      saveDiv.innerHTML = displayItem;
      if (savedItemsContainer !== null) {
        savedItemsContainer.appendChild(saveDiv);
      }
    } else {
      // Display articles that have an image
      const displayItem = `
      <div class="container">
        <div class="split">
          <div>
            <h2>${item.heading}</h2>
            <p>${item.article}</p>
            <button class="btnDelete">Delete saved article</button>
          </div>
          <div>
            <img src="${item.image}" />
          </div>
        </div>
      </div>
    `;
      saveDiv.innerHTML = displayItem;
      if (savedItemsContainer !== null) {
        savedItemsContainer.appendChild(saveDiv);
      }
    }
  });
  // deleteSavedItem(deleteBtns);
}

// Run display saved items function
displaySavedItems();

// Function to extract table header data from table
function buildTableHeaders() {
  const elements = [...document.querySelectorAll("th")];
  return elements.map((x) => {
    return { content: x.innerHTML };
  });
}

// Function to extract table rows data from table
function buildTableData() {
  const elements = [...document.querySelectorAll("td")];
  return elements.map((x) => {
    return { content: x.innerHTML };
  });
}
// Table header and table body data merged into a single tableInfo Array prior to sending to local storage
const tableInfo = [...buildTableHeaders(), ...buildTableData()];

// DELETE BUTTON SECTION
// function deleteSavedItem(deleteBtns) {
//   deleteBtns.forEach((deleteBtn) => {
//     deleteBtn.addEventListener("click", (e) => {
//       const target = e.target.closest("div").querySelector("h2").innerHTML;
//       console.log(target);
//       // Check if the article is already stored in local storage.  If is not stored, add it, else let the user know it has already been stored
//       console.log(savedItems);
//       const index = savedItems.indexOf(
//         (object) => object.heading == target.heading
//       );
//       console.log(index);
//     });
//   });
// }

// deleteSavedItem(deleteBtns);
