'use strict';

/* 
user_stories.md
  As X, I want Y, so that Z
  FOCUS GROUP PARTICIPANT
  MARKETING RESEARCH TEAM
  THE DEVELOPER

README.MD

Order of Operations
Instructions
Randomnly display 3 product images.
User selects 1 image
  event listener to fire the event handler
  check if total clicks is 25
    display metrics of each product
    disable event listener
  track which product was selected
    update the object's count and all 3 displayed product's displayed counter



HTML
  Display 3 products side-by-side == DONE
  manage size and aspect ratio == DONE

  Provide instructions to participants

APP.JS

Object for images and properties == DONE
  Constructor == DONE
    var Product = function {
      name
      imageSource
      clicksCounter
      displayedCounter
      doNotShow boolean for previously displayed or selected.
    }
  array of all Image Objects == DONE


function to randomnly display image { == DONE
  must be 3 unique images (no duplicates)
  next round cannot display previously displayed images
}

selecting/clicking image
  id event listener('click', function) { == DONE
    keep track of image that is clicked
    prevent all currently displayed images from being redisplayed next round
  }

*/

// GLOBALS

var productSectionEl = document.getElementById('product-section');
var leftProductImageEl = document.getElementById('left-product-image');
var centerProductImageEl = document.getElementById('center-product-image');
var rightProductImageEl = document.getElementById('right-product-image');

// Store current Objects displayed
var leftImage = null;
var centerImage = null;
var rightImage = null;

// CONSTRUCTOR
var Product = function(imgSource, name) {
  this.imgSource = imgSource;
  this.name = name;
  this.selectedCounter = 0;
  this.shownCounter = 0;
  this.displayable = true;

  Product.allProducts.push(this);
};

Product.allProducts = [];

// Function to change images of new products to display
var displayNewProducts = function(indexLeft, indexCenter, indexRight) {
  leftProductImageEl.src = Product.allProducts[indexLeft].imgSource;
  centerProductImageEl.src = Product.allProducts[indexCenter].imgSource;
  rightProductImageEl.src = Product.allProducts[indexRight].imgSource;
};

// THIS IS BREAKING THE SITE. NEED TO DEBUG
var isDisplayable = function(indexLeft, indexCenter, indexRight) {
  return (Product.allProducts[indexLeft].isDisplayable && Product.allProducts[indexCenter].isDisplayable && Product.allProducts[indexRight].isDisplayable);
};

// Using Math.random() to select any 3 Products in allProducts[]
var selectRandomProduct = function () {
  // Select non-duplicate indexes. 
  do {
    var leftIndex = Math.floor(Math.random() * Product.allProducts.length);
    var centerIndex = Math.floor(Math.random() * Product.allProducts.length);
    var rightIndex = Math.floor(Math.random() * Product.allProducts.length);
    // console.log('leftIndex: ' + leftIndex);

    //TODO: Need to check if displayable is set to false 
  } while(leftIndex === centerIndex || centerIndex === rightIndex || rightIndex === leftIndex || isDisplayable());

  // Object holders for current selection of Products
  leftImage = Product.allProducts[leftIndex];
  centerImage = Product.allProducts[centerIndex];
  rightImage = Product.allProducts[rightIndex];

  // Set each Product Object's displayable to false.
  leftImage.displayable = false;
  centerImage.displayable = false;
  rightImage.displayable = false;

  // console.log(leftImage.name);
  // console.log(centerImage.name);
  // console.log(rightImage.name);

  // console.log(leftIndex);
  // console.log(centerIndex);
  // console.log(rightIndex);

  displayNewProducts(leftIndex, centerIndex, rightIndex);
};


// Function to handle user click action.
var handleProductClick = function (event) {
  var productUserClicked = event.target;
  var id = productUserClicked.id;
  console.log('Target: ' + productUserClicked + ', ID: ' + id);
  selectRandomProduct();
};

// Adding event listener to image section
//TODO: how to exclude margins around images???
productSectionEl.addEventListener('click', handleProductClick);

// Instantiate Product Objects
new Product('./img/bag.jpg', 'bag');
new Product('./img/banana.jpg', 'banana');
new Product('./img/bathroom.jpg', 'bathroom');
new Product('./img/boots.jpg', 'boots');
new Product('./img/breakfast.jpg', 'breakfast');
new Product('./img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');
new Product('img/cthulhu.jpg', 'cthulhu');
new Product('img/dog-duck.jpg', 'dog-duck');
new Product('img/dragon.jpg', 'dragon');
new Product('img/pen.jpg', 'pen');
new Product('img/pet-sweep.jpg', 'pet-sweep');
new Product('img/scissors.jpg', 'scissors');
new Product('img/shark.jpg', 'shark');
new Product('img/sweep.png', 'sweep');
new Product('img/tauntaun.jpg', 'tauntaun');
new Product('img/unicorn.jpg', 'unicorn');
new Product('img/usb.gif', 'usb');
new Product('img/water-can.jpg', 'water-can');
new Product('img/wine-glass.jpg', 'wine-glass');

// Starting project
selectRandomProduct();

// TESTING
// centerProduct.src = Product.allProducts[2].imgSource;
