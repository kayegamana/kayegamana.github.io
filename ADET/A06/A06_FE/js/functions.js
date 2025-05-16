var total = 0;
var categories = [];
var products = [];

const getAllCategories = async () => {
  fetch(
    'http://localhost/kayegamana.github.io/ADET/A06/A06_BE/categories.php'
  )
    .then(response => response.json())
    .then(data => {
      categories = data;
      loadCategories();
    });
}

const getAllProducts = async (categoryID, categoryName) => {
  const categoryData = {
    categoryID: categoryID
  };

  fetch(
    'http://localhost/kayegamana.github.io/ADET/A06/A06_BE/products.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoryData)
  })
    .then(response => response.json())
    .then(data => {
      products = data;
      loadProducts(categoryName);
    });
}

getAllCategories();

function loadCategories() {
  var categoriesContainer = document.getElementById("categories");

  categories.forEach(function (category, index) {
    categoriesContainer.innerHTML += `
    <div onclick="getAllProducts('`+ category.categoryID + `')" class="card mx-2 custom-button p-2 d-flex justify-content-center align-items-center">
      <div class="product-category d-inline-flex align-items-center gap-2">
        <img src="` + category.image + `" style="width: 4.5vh;">
        ` + category.name + `
      </div>
    </div>
  `;
  });
}

function loadProducts(categoryName) {
  var maincontainer = document.getElementById("maincontainer");
  maincontainer.innerHTML = "";

  products.forEach(function (content) {
    if (content.isAvailable == true) {
      var cardHTML = `
        <div class="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-12"> 
          <div class="card mx-2 my-2 custom-button-products content p-3">
            <div class="card-body">
              <h5 class="card-title text-center">`+ content.name + `</h5>
              <div class="mb-2"> 
                <img src="` + content.image + `" class="img-fluid" /> 
              </div>
              <div class="row text-center">
      `;

      content.weights.forEach(function (weight) {
        cardHTML += `
          <div class="col-4 px-1 my-1">
            <button onclick="addToReceipt('`+ weight.price + `','` + content.code + weight.code + `')" class="btn btn-outline-success w-100">
              `+ weight.name + `
            </button>
          </div>
        `;
      });

      cardHTML += `
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (content.isAvailable == false) {
      var cardHTML = `
        <div class="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div class="card mx-2 my-2 custom-button-products-unavailable content p-3">
            <div class="card-body">
              <h5 class="card-title text-center">`+ content.name + `</h5>
              <div class="mb-2">
                <div style="position: relative;">
                  <img src="` + content.image + `" class="img-fluid" style="display: block;">
                  <div class="product-unavailable"></div>
                </div>
              </div>
              <div class="row text-center">
                <div class="col-12">
                  <p class="text-danger fw-bold" style="font-size:20px">[UNAVAILABLE]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    maincontainer.innerHTML += cardHTML;
  });
}

function addToReceipt(price, code) {
  var receiptContainer = document.getElementById("receipt");
  total = parseFloat(total) + parseFloat(price);

  totalValueElement = document.getElementById("totalValue");
  totalValueElement.innerHTML = "₱" + total;

  receiptContainer.innerHTML += `
  <div class="d-flex flex-row justify-content-between">
    <div>`+ code + `</div>
    <div>₱`+ price + `</div>
  </div>
`;
}

function completeOrder() {
  document.getElementById('receipt').innerHTML = '';
  total = 0;
  document.getElementById('totalValue').innerText = total;
}
