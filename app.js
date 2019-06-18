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

var resultsContainer = document.getElementById('results');

var clickCount =  0;
var maxClicks = 25;


// Store current Objects displayed
var leftImage = null;
var centerImage = null;
var rightImage = null;

// CONSTRUCTOR
var Product = function(imgSource = 'default.jpg', name, timesClicked, timesShown) {
  this.imgSource = imgSource;
  this.name = name;
  this.timesClicked = timesClicked ? timesClicked : 0;
  this.timesShown = timesShown || 0;

  Product.allProducts.push(this);
};

Product.allProducts = [];
Product.previousProducts = [];

// Function to change images of new products to display
// var displayNewProducts = function(indexLeft, indexCenter, indexRight) {
//   leftProductImageEl.src = Product.allProducts[indexLeft].imgSource;
//   centerProductImageEl.src = Product.allProducts[indexCenter].imgSource;
//   rightProductImageEl.src = Product.allProducts[indexRight].imgSource;
// };


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

var pickUniqueNonRepeating = function (currentPicks) {
  var index, product;
  do {
    index = getRandomIntInclusive(0, Product.allProducts.length - 1);
    product = Product.allProducts[index];

  } while(Product.previousProducts.includes(product) || currentPicks.includes(product));
  return product;
};

// Using Math.random() to select any 3 Products in allProducts[]
var selectRandomProduct = function () {
  var currentPicks = [];

  leftImage = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(leftImage);
  centerImage = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(centerImage);
  rightImage = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(rightImage);

  leftProductImageEl.src = leftImage.imgSource;
  centerProductImageEl.src = centerImage.imgSource;
  rightProductImageEl.src = rightImage.imgSource;

  // displayNewProducts(leftIndex, centerIndex, rightIndex);
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
var buildProducts = function() {
  new Product('./img/bag.jpg', 'bag');
  new Product('./img/banana.jpg', 'banana');
  new Product('./img/bathroom.jpg', 'bathroom');
  new Product('./img/boots.jpg', 'boots');
  new Product('./img/breakfast.jpg', 'breakfast');
  new Product('./img/bubblegum.jpg', 'bubblegum');
  // new Product('./img/chair.jpg', 'chair');
  // new Product('./img/cthulhu.jpg', 'cthulhu');
  // new Product('./img/dog-duck.jpg', 'dog-duck');
  // new Product('./img/dragon.jpg', 'dragon');
  // new Product('./img/pen.jpg', 'pen');
  // new Product('./img/pet-sweep.jpg', 'pet-sweep');
  // new Product('./img/scissors.jpg', 'scissors');
  // new Product('./img/shark.jpg', 'shark');
  // new Product('./img/sweep.png', 'sweep');
  // new Product('./img/tauntaun.jpg', 'tauntaun');
  // new Product('./img/unicorn.jpg', 'unicorn');
  // new Product('./img/usb.gif', 'usb');
  // new Product('./img/water-can.jpg', 'water-can');
  // new Product('./img/wine-glass.jpg', 'wine-glass');
};

// To start page
var initPage = function() {
  buildProducts();
  selectRandomProduct();
};
  
initPage();

// TESTING
// centerProduct.src = Product.allProducts[2].imgSource;
