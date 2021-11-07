/* ----------Select Color from drop-down and images change ----------*/
function updateColor() {
    /*Get value of what the user selected in the drop down
    Use value and apply it to title of the item on the page */
        var colorDropdown = document.getElementById("colorOptions")
        var selectedColor = colorDropdown.value 
        var imagePath = "Assets/pluto_straighton_" + selectedColor.toLowerCase() + ".png"
        var imageNode = document.getElementById("productImage")
        imageNode.src = imagePath
    }

/* ----------Select size from drop-down ----------*/
function updatePage() {
/*Get value of what the user selected in the drop down
Use value and apply it to title of the item on the page */
    var sizeDropdown = document.getElementById("sizeOptions")
    var selectedSize = sizeDropdown.value 
    var productTitle = document.getElementById("productTitle")
    var currentTitle = productTitle.innerText
    if (currentTitle.includes("-")) {
        var currentTitleSplit = currentTitle.split("-")
        currentTitle = currentTitleSplit[0]
    }
    var updatedTitle = currentTitle + '-' + selectedSize
    productTitle.innerText = updatedTitle
}


/* ----------Add to cart - pop up over lay ---------- */
function addToCart() {
    alert("Item successfully added to cart!")
}

/* -------------------- Homework 6b -------------------- */

// function that removes a particular item (obj) from the shopping cart
function removeItem(obj) {
    // retrieve the stored value of the cart items so that we can modify it
    var cartItemsString = localStorage.getItem("cartItems")
    if (cartItemsString !== null) {
      var cartItems = JSON.parse(cartItemsString) // successfully loaded in the cart items
      
      // find the index of the input object in the list
      var ind = cartItems.findIndex(function (item) {
        return item.glaze === obj.glaze && item.quantity === obj.quantity
      })
      console.log("ind " + ind)
      if (ind !== -1) {
        // remove item from the list
        cartItems.splice(ind, 1)
        // update the stored value
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        // re-render the page to reflect changes
        updatePage()
      }
    }
  }
  
  // ad the currently selected product to the local storage data
  function addItem() {
    // get stored value of cart items
    var cartItemsString = localStorage.getItem("cartItems")
    // check if item exists in storage, if so, parse it
    if (cartItemsString === null) { // first time, we have to create the cartItems list
      var cartItems = []
    } else { // we've been here before, load the value
      var cartItems = JSON.parse(cartItemsString)
    }
    
    // retrieve value of relevant inputs
    var colorValue = document.getElementById("colorOptions").value
    var sizeValue = document.getElementById("sizeOptions").value
    var quantityValue = document.getElementById("quantityOptions").value
    // create json object based on selected values
    var itemObject = {color: colorValue, size: sizeValue, quantity: quantityValue}
    // add this newly selected item to the cart
    cartItems.push(itemObject)
    // save the new value of the list
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  function addButtonClicked() {
      addItem()
      addToCart()
  }
  
  // updates the value of the list element
  function updatePage2() {
    // get value of local storage
    var cartItemsString = localStorage.getItem("cartItems")
    // check if value exists in local storage
    if (cartItemsString !== null) {
      var cartItems = JSON.parse(cartItemsString) // converting stored string to object
      // update the cart # element
      var counterNode = document.getElementById("cart-number")
      counterNode.innerText = cartItems.length
      // for every item in our cart, create a new list item under cart-list
      var cartList = document.getElementById("cart-list")
      cartList.innerHTML = ""
      if (cartItems.length === 0) {
        // if nothing is in the cart, let's show the placeholder text
        document.getElementById("placeholder-text").style.visibility = "visible"
      } else {
        // items are in the cart, hide the placeholder text
        document.getElementById("placeholder-text").style.visibility = "hidden"
        // iterate through cart and for each item, add it to the list
        for (var i = 0; i < cartItems.length; i++) {
          var cartItem = cartItems[i]
          var itemNode = document.createElement("li")
          itemNode.innerText = cartItem.glaze + " (" + cartItem.quantity + ")"
          
          // we have to get the cartItem eagerly, but return a function that executes lazily
          itemNode.onclick = (function (cartItem) {
            return function() {
              removeItem(cartItem)
            }
           }(cartItem))
          
          // itemNode.onclick = removeItem(cartItem) // this is wrong because the computer eagerly evaluates removeItem function and does not attach the function to the onclick listner
          
          // this won't work because it is too lazy - it checks what the value of cartItem is when the button is clicked. the side effect is that the last element always gets removed no matter what you click on
          // itemNode.onclick = function() {
          //   removeItem(cartItem)
          // }
          
          cartList.appendChild(itemNode)
        }
      }
    }
  }
  
  function addButton() {
    addItem()
    updatePage2()
  }
  
//   updatePage2()