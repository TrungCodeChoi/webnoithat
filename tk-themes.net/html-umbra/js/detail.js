//////////////// render chi tiết sản phẩm
fetch('http://localhost:5100/products')
.then((res) => res.json())
.then(products =>{
    console.log(products);
    const urlParams = new URLSearchParams(window.location.search);
    const getId = urlParams.get('getId');
    let htmlDetail = '';
    products.forEach(product => {
        if(getId==product.id){
        htmlDetail = `
        <div class="images">
            <div class="single-product-slider">
                <div id="product-detail-slider">
                    <div class="item"> 
                        <a href="images/product/${product.img}.jpg">
                            <img src="images/product/${product.img}.jpg" alt="" /> 
                        </a>
                    </div>
                  
                </div>
            </div>
        </div>
        <div class="summary">
            <h1 class="product-title">${product.name}</h1>
            <div class="price">
                <del>&#36;${product.sale}</del>
                <ins>&#36;${product.price}</ins>
            </div>
            <div class="description">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae tortor urna. Mauris non tincidunt ipsum, vel dignissim ipsum. Morbi erat sapien, hendrerit ut convallis eu, pretium eleifend sapien</p>
            </div>
            <p class="stock in-stock">In stock</p>
            <form class="cart">
                <div class="quantity">
                    <span>QTY</span>
                    <div class="noo-quantity-attr">
                        <button class="qty-decrease" onclick="var qty_el = document.getElementById('qty'); var qty = qty_el.value; if( !isNaN( qty ) && qty > 1 ) qty_el.value--;return false;" type="button">-</button>
                        <input id="qty" type="text" name="quantity" value="1" class="input-text qty text" size="4" />
                        <button class="qty-increase" onclick="var qty_el = document.getElementById('qty'); var qty = qty_el.value; if( !isNaN( qty )) qty_el.value++;return false;" type="button">+</button>
                    </div>
                </div>
                <div class="add-to-cart" onclick="addCart(${product.id})">Thêm vào giỏ hàng</div>
            </form>
            <div class="compare-button">
                <a href="#">Compare</a>
            </div>
            <div class="wishlist-button">
                <a href="#">Wishlist</a>
            </div>
            <div class="product-meta">
                <span class="posted_in">
                    Categories: <a href="#">Decor</a>, <a href="#">Dining Table</a>
                </span>
                <span class="tagged_as">
                    Tags: <a href="#">dining table</a>, <a href="#">modern</a>
                </span>
            </div>
            <div class="noo-social-share">
                <span class="share-name">Chia sẻ:</span>
                <a href="#" class="noo-share"><i class="fa fa-facebook"></i></a>
                <a href="#" class="noo-share"><i class="fa fa-twitter"></i></a>
                <a href="#" class="noo-share"><i class="fa fa-google-plus"></i></a>
                <a href="#" class="noo-share"><i class="fa fa-pinterest"></i></a>
            </div>
        </div> `;
        }
    })
    document.getElementById('renderDetail').innerHTML = htmlDetail
})////////////////////////////// Add Cart
let cart = [];
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    
}

const addCart = (id) =>{
    fetch('http://localhost:5100/products')
    .then((res)=>res.json())
    .then((products)=>{
        if(cart.some((products) => products.id === id)){
            changeNumber("increase", id)
        }else{
            const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            number: 1,
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        }      
    })   
}