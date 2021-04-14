'use strict';

// get the div element
let divElement = document.getElementById('all-Images');

//get the left image element by id
let leftImageElement = document.getElementById('left-Image');
let midImageElement = document.getElementById('mid-Image');
let rightImageElement = document.getElementById('right-Image');

let leftImageIndex;
let midImageIndex;
let rightImageIndex;
let allProducts = [];

let namesArr=[];
let votesArr=[];
let shownArr=[];

let maxTries = 25;
let userTriesCounter = 0;

// creat construction function for the products
function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shows = 0;
  namesArr.push(this.name);
  Product.allProducts.push(this);
}

Product.allProducts = [];


// creat the instensess of the product
new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen (1).jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

// console.log(Product.allProducts)

// creat the function for generate random Number
function generateRandomIndex() {
  // 0 => 20
  return Math.floor(Math.random() * Product.allProducts.length);
}
//   console.log(generateRandomIndex());

// creat the function just to check that the three imgs not equal

// creat a shown pics array
let shownProductsArray=[];


function renderThreeProducts() {
console.log('before',shownProductsArray); 

  leftImageIndex=generateRandomIndex();
  midImageIndex=generateRandomIndex();
  rightImageIndex=generateRandomIndex();

  while (leftImageIndex===rightImageIndex ||leftImageIndex===midImageIndex || midImageIndex === rightImageIndex || shownProductsArray.includes(leftImageIndex || shownProductsArray.includes(rightImageIndex))) {
    leftImageIndex=generateRandomIndex();
    rightImageIndex=generateRandomIndex();
    midImageIndex=generateRandomIndex();
  }
  // console.log(Product.allProducts[leftImageIndex].name);
  // console.log(Product.allProducts[midImageIndex].name);
  // console.log(Product.allProducts[rightImageIndex].source);

  shownProductsArray=[leftImageIndex,rightImageIndex,midImageIndex];
  console.log('after',shownProductsArray);


  leftImageElement.src = Product.allProducts[leftImageIndex].source;
  Product.allProducts[leftImageIndex].shows++;

  
  rightImageElement.src = Product.allProducts[rightImageIndex].source;
  Product.allProducts[rightImageIndex].shows++;

  midImageElement.src = Product.allProducts[midImageIndex].source;
  Product.allProducts[midImageIndex].shows++;

}

renderThreeProducts();

// handle clicking by adding event listener1
divElement.addEventListener('click', handleClick);

function handleClick(event) {
  console.log(event.target.id);

  // add to attempts
  userTriesCounter++;

  // console.log(userTriesCounter);

  // if the attempts is lower than the max tries

  
  if (userTriesCounter <= maxTries) {

    if (event.target.id === 'left-Image') {

      Product.allProducts[leftImageIndex].votes++;

    } else if (event.target.id === 'right-Image') {

      Product.allProducts[rightImageIndex].votes++;

    } else if (event.target.id === 'mid-Image'){

      Product.allProducts[midImageIndex].votes++;
    }
    else {
        alert ('please click just on the pic');
        userTriesCounter--;


    }

} else {
     

  for (let i = 0; i < Product.allProducts.length; i++) {
    votesArr.push(Product.allProducts[i].votes);
    shownArr.push(Product.allProducts[i].shows);
    
  }

  let list=document.getElementById('productResults');

  let button=document.getElementById('button');
  button.addEventListener('click',showingList);

  button.hidden=false;

  function showingList() {
    
    let productResult;
  
    for (let i = 0; i < Product.allProducts.length; i++) {
      productResult=document.createElement('li');
      list.appendChild(productResult);
  
      productResult.textContent=`${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes and was shown ${Product.allProducts[i].shows}`
  }
    button.removeEventListener('click',showingList);
    
  }
      //  remove event listener
      divElement.removeEventListener('click',handleClick);
      chartgenerator();

    }
  // console.log(Product.allProducts);
  renderThreeProducts();
  

}
// Chart function
function chartgenerator() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArr,
      datasets: [
        {
          label: '# of Votes',
          data: votesArr,
          backgroundColor: 'red',
          borderColor: 'orange',
          borderWidth: 2
        },
        {
          label: '# of Shown',
          data: shownArr,
          backgroundColor: 'black',
          borderColor: 'orange',
          borderWidth: 2
        }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}