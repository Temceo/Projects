// Function to display saved items on the saved items page
export function displaySavedItems() {
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
    const section = document.createElement("section");
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
      section.innerHTML = displayItem;
      savedItemsContainer.appendChild(section);
    } else {
      // Display artilces that have an image
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
      section.innerHTML = displayItem;
      if (savedItemsContainer === null) return;
      savedItemsContainer.appendChild(section);
    }
  });
  deleteSavedItem(deleteBtns);
}

// Run display saved items function
displaySavedItems();
