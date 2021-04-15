'use strict';

//get the images element by id
let leftImageElement = document.getElementById('left-Image');
let midImageElement = document.getElementById ('mid-Image');
let rightImageElement = document.getElementById('right-Image');


//define the global variable
let userTriesCounter = 0;
let maxTries =25;
let allProducts = [];
let namesArr=[];
let votesArr=[];
let shownArr=[];


// creat construction function for the products
function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shows = 0;

  namesArr.push(this.name);
  allProducts.push(this);
}




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

// console.log(allProducts)



// creat the function for generate random Number
function generateRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}
generateRandomIndex();


//define the images index
let leftImageIndex;
let midImageIndex;
let rightImageIndex;


// creat the function just to check that the three imgs not equal and render them 
function renderThreeProducts() {

  leftImageIndex=generateRandomIndex();
  midImageIndex= generateRandomIndex();
  rightImageIndex=generateRandomIndex();
  
  // define the shown product in an array 
  let shownProductsArray=[];


  // check that the three imgs not equal
  while (leftImageIndex===rightImageIndex ||leftImageIndex===midImageIndex || midImageIndex === rightImageIndex || shownProductsArray.includes(leftImageIndex || shownProductsArray.includes(rightImageIndex))) {
    leftImageIndex=generateRandomIndex();
    rightImageIndex=generateRandomIndex();
    midImageIndex=generateRandomIndex();
  }
  // console.log(allProducts[leftImageIndex].name);
  // console.log (allProducts[rightImageIndex].source);


 //declar the images index into shown array
  shownProductsArray=[leftImageIndex,rightImageIndex,midImageIndex];


  leftImageElement.src = allProducts[leftImageIndex].source;
  allProducts[leftImageIndex].shows++;

  midImageElement.src = allProducts[midImageIndex].source;
  allProducts[midImageIndex].shows++;
  
  rightImageElement.src =allProducts[rightImageIndex].source;
  allProducts[rightImageIndex].shows++;


}

renderThreeProducts();

// get the div element
let divElement = document.getElementById('all-Images');
//  adding event listener for divelement
divElement.addEventListener('click', handleClick);




// if the attempts is lower than the max tries and function to handle it 
function handleClick(event) {

  
  if (userTriesCounter <=maxTries) {

    if (event.target.id === 'left-Image') {
      allProducts[leftImageIndex].votes++;
      renderThreeProducts();
      userTriesCounter++;


    } else if (event.target.id === 'right-Image') {
      allProducts[rightImageIndex].votes++;
      renderThreeProducts();
      userTriesCounter++;

    } else if (event.target.id === 'mid-Image'){
      allProducts[midImageIndex].votes++;
      renderThreeProducts();
      userTriesCounter++;

    }
    else {
        alert ('please click just on the pic');
        userTriesCounter--;
    }

} else {
     
  let button=document.getElementById('button');
  
  divElement.removeEventListener('click',handleClick);
  
  //creat the button and add an event for it click 
  let list=document.getElementById('productResults');
  
  list.appendChild(button);
  

  button.hidden=false;  ;  
  
  
    for (let i = 0; i < allProducts.length; i++) {
      votesArr.push(allProducts[i].votes);
      shownArr.push(allProducts[i].shows);
      
    }
    updateStorage();

    button.addEventListener('click',showingList);
    button.addEventListener('click',chartgenerator);

  }


// Function to storage  products data to the local storage
function updateStorage() {
  let productStringArray = JSON.stringify(allProducts);
  // console.log(stringVotesArray);
  localStorage.setItem('Products', productStringArray);
  }
}




// function for update products before any votes 
// with some friends helping 
function getProductsData() {
  let productString = localStorage.getItem('Products');

  let productArray = JSON.parse(productString);

  if (productArray !== null) {
      allProducts = productArray;
  }
}


    function showingList() {
      
      let productResult;
    
      for (let i = 0; i < Product.allProducts.length; i++) {
        productResult=document.createElement('li');
        list.appendChild(productResult);
    
        productResult.textContent=`${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes and was shown ${Product.allProducts[i].shows}`
    }
      button.removeEventListener('click',showingList);
      
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
getProductsData();