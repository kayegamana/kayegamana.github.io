var total = 0;

function loadCategories() {
  var categoriesContainer = document.getElementById("categories");

  products.forEach((product, index) => {
    categoriesContainer.innerHTML += `
    <div onclick="loadProducts('`+ index + `')" class="card mx-2 custom-button p-2 d-flex justify-content-center align-items-center">
      <div class="product-category d-inline-flex align-items-center gap-2">
        <img src="` + product.image + `" style="width: 4.5vh;">
        ` + product.category + `
      </div>
    </div>
  `;
  });
}

function loadProducts(categoryIndex) {
  var maincontainer = document.getElementById("maincontainer");
  maincontainer.innerHTML = "";

  products[categoryIndex].contents.forEach(content => {

    if (content.available == true) {
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

      content.weights.forEach(weight => {
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
    } else if (content.available == false) {
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

loadCategories();

function completeOrder() {
  document.getElementById('receipt').innerHTML = '';
  total = 0;
  document.getElementById('totalValue').innerText = total;
}
