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
    }
  array of all Image Objects == DONE


function to randomnly display image { == DONE
  must be 3 unique images (no duplicates) == DONE
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

// var resultsContainer = document.getElementById('results');

var clickCount =  0;
var maxClicks = 25;

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

// Math.random() from MDN; see README for URL reference
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// Helper function to select only non-duplicate & previous images
var pickUniqueNonRepeating = function (currentPicks) {
  var index, product;
  do {
    index = getRandomIntInclusive(0, Product.allProducts.length - 1);
    product = Product.allProducts[index];

  } while(Product.previousProducts.includes(product) || currentPicks.includes(product));

  return product;
};

// Display 3 Product images using Math.random() to select them in Products.allProducts[]
var selectRandomProduct = function () {
  var currentPicks = [];

  // Pick left image
  var leftImage = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(leftImage);
  // Pick center image
  var centerImage = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(centerImage);
  // Pick right image
  var rightImage = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(rightImage);

  // Set HTML img sources
  leftProductImageEl.src = leftImage.imgSource;
  centerProductImageEl.src = centerImage.imgSource;
  rightProductImageEl.src = rightImage.imgSource;

  // Add current Products to Product.previousProducts array
  Product.previousProducts = currentPicks;


};

// Function to handle user click action.
var handleProductClick = function (event) {
  clickCount++;
  if(event.target.id === 'left-product-image'){
    Product.previousProducts[0].timesClicked++;
  }
  if (event.target.id === 'center-product-image') {
    Product.previousProducts[1].timesClicked++;
  }
  if (event.target.id === 'right-product-image') {
    Product.previousProducts[2].timesClicked++;
  }
  // Increment Product's timesShown counter
  for (var i = 0; i < Product.previousProducts.length; i++) {
    Product.previousProducts[i].timesShown++;
  }
  // var productUserClicked = event.target;
  // var id = productUserClicked.id;
  // console.log('User clicked on section: ' + id);
  // Conditional statement to handle one off issue to not render new images after 5th user click.
    
  if (clickCount < maxClicks) {
    selectRandomProduct();
  } else {
    productSectionEl.removeEventListener('click', handleProductClick);
    //Display chart.js
    createChart();
  }
};



// Instantiate Product Objects
var buildProducts = function() {
  new Product('./img/bag.jpg', 'bag');
  new Product('./img/banana.jpg', 'banana');
  new Product('./img/bathroom.jpg', 'bathroom');
  new Product('./img/boots.jpg', 'boots');
  new Product('./img/breakfast.jpg', 'breakfast');
  new Product('./img/bubblegum.jpg', 'bubblegum');
  new Product('./img/chair.jpg', 'chair');
  new Product('./img/cthulhu.jpg', 'cthulhu');
  new Product('./img/dog-duck.jpg', 'dog-duck');
  new Product('./img/dragon.jpg', 'dragon');
  new Product('./img/pen.jpg', 'pen');
  new Product('./img/pet-sweep.jpg', 'pet-sweep');
  new Product('./img/scissors.jpg', 'scissors');
  new Product('./img/shark.jpg', 'shark');
  new Product('./img/sweep.png', 'sweep');
  new Product('./img/tauntaun.jpg', 'tauntaun');
  new Product('./img/unicorn.jpg', 'unicorn');
  new Product('./img/usb.gif', 'usb');
  new Product('./img/water-can.jpg', 'water-can');
  new Product('./img/wine-glass.jpg', 'wine-glass');
};

// To start page
var initPage = function() {
  buildProducts();
  selectRandomProduct();
  // Adding event listener to image section
  productSectionEl.addEventListener('click', handleProductClick);
};

initPage();

function createChart() {
  var chartCanvasEl = document.getElementById('analysis-chart');

  var percents = [];
  var names = [];

  for (var i = 0; i < Product.allProducts.length; i++) {
    var p = Math.floor((Product.allProducts[i].timesClicked / Product.allProducts[i].timesShown) * 100);
    names.push(Product.allProducts[i].name);
    percents.push(p);
  }

  var chartData = {
    labels: names,
    datasets: [{
      label: '% of Selected vs Displayed',
      data: percents,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(231, 26, 209, 0.2)',
        'rgba(20, 137, 196, 0.8)',
        'rgba(137, 148, 134, 0.2)',
        'rgba(6, 30, 69, 0.8)',
        'rgba(12, 254, 122, 0.2)',
        'rgba(110, 114, 155, 0.8)',
        'rgba(184, 50, 180, 0.2)',
        'rgba(199, 247, 139, 0.8)',
        'rgba(217, 194, 48, 0.2)',
        'rgba(74, 43, 210, 0.8)',
        'rgba(238, 207, 41, 0.2)',
        'rgba(169, 6, 51, 0.8)',
        'rgba(31, 58, 123, 0.2)',
        'rgba(32, 205, 173, 0.8)',
      ],
      borderWidth: 1
    }]

  };

  var busChartObject = {
    type: 'bar',
    data : chartData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  var analysisChart = new Chart(chartCanvasEl, busChartObject);

}

