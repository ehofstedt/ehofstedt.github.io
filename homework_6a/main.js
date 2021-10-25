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
