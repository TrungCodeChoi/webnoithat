//show db trang chủ
fetch('http://localhost:5100/products?_start=0&_limit=8')
.then((res) => res.json())
.then(products => {
    let htmlHome = '';
    products.forEach(product => {
        htmlHome += `
        <div class="noo-product-grid" >
            <div class="noo-product-item col-md-3 col-sm-6" >
                <div class="noo-product-inner">
                    <h3><a href="shop-detail.html">${product.name}</a></h3>
                    <span class="posted_in"><a href="#">${product.title}</a></span>
                    <span class="onsale">Sale!</span>
                    <div class="noo-product-thumbnail">
                        <div class="noo-product-slider">
                            <a href="shop-detail.html?getId=${product.id}">
                                <img src="images/product/${product.img}.jpg" alt="" /> 
                            </a>
                        </div>
                    </div>
                    <div class="price">
                        <del>&#36;${product.price}</del> 
                        <ins>&#36;${product.sale}</ins>
                    </div>
                    <div class="noo-loop-cart" onclick="addCart(${product.id})">
                        <a class="button add-to-cart"></a>
                    </div>
                </div>
            </div>            
        </div> `
    })
    document.getElementById('renderHome').innerHTML = htmlHome
})

///// Render trang sản phẩm

let renderproductShop = (currentPage, itemsPerPage) => {   
const apiUrl = "http://localhost:5100/products";
    fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
        let html = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = products.slice(startIndex, endIndex);
        currentPageData.forEach(product => {
            html += `
            <div class="noo-product-item col-md-4 col-sm-6">
                <div class="noo-product-inner">
                    <h3><a href="shop-detail.html">${product.name}</a></h3>
                    <span class="posted_in"><a href="#">${product.title}</a></span>
                    <span class="onsale">Sale!</span>
                    <div class="noo-product-thumbnail">
                        <div class="noo-product-slider">
                            <a href="shop-detail.html?getId=${product.id}">
                                <img src="images/product/${product.img}.jpg" alt="" /> 
                            </a>                           
                        </div>
                    </div>
                    <div class="price">
                        <del>&#36;${product.price}</del> 
                        <ins>&#36;${product.sale}</ins>
                    </div>
                    <div class="noo-loop-cart" onclick="addCart(${product.id})">
                        <a class="add-to-cart"></a>
                    </div>
                </div>
            </div>
            `;
        });
        if (document.getElementById('products')) {
        document.getElementById('products').innerHTML = html;
        }
        const totalPages = (products.length / itemsPerPage);
        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<li><a onclick="changePage(${i})">${i}</a></li>`;
        }
        document.getElementById("pagination").innerHTML = paginationHTML;
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi:', error);
        });
        

    }
    function changePage(page) {
        renderproductShop(page, itemsPerPage);
    }    
    const itemsPerPage = 6;
    renderproductShop(1, itemsPerPage);
    

////////////////////////////// Add Cart
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


////////////////////////////// render trang giỏ hàng
let renderCart = (cart)=>{
    let htmlCart = '';
    cart.forEach(product =>{   
  htmlCart += `
        <tr class="cart_item">
            <td class="product-thumbnail">
                <a href="shop-detail.html">
                    <img src="images/product/${product.img}.jpg" alt="" />
                </a>
            </td>
            <td class="product-name">
                <a href="shop-detail.html">${product.name}</a> 
            </td>
            <td class="product-price">
                &#36;${product.price}
            </td>
            <td class="product-quantity">
                <div class="quantity">
                    <div class="noo-quantity-attr">
                        <button class="qty-decrease" onclick="changeNumber('decrease',${product.id})"> - </button>
                        <button class="number">${product.number}</button>    
                        <button class="qty-increase"  onclick="changeNumber('increase',${product.id})"> + </button>
                    </div>
                </div>
            </td>
            <td class="product-subtotal">
                &#36;${product.price * product.number}
            </td>
            <td class="product-remove" onclick="deleteItem(${product.id})">
                <i class="fa fa-trash" style="font-size:20px;"></i>
            </td>
        </tr>
        `;
    })
    
    return htmlCart

}
if (document.getElementById('renderCart')) {
    document.getElementById('renderCart').innerHTML = renderCart(cart)
    }
//////////////////////////////////////////////////////// Calculate = tính toán
const changeNumber = (action, id) =>{
    cart = cart.map((product,index) =>{       
        if(product.id === id){
            let oldNumber = product.number;         
            if(action === "decrease"){
                if (oldNumber <= 1) {
                     product.number  = 1;                  
                }else{
                    // product.number--;      
                    cart[index].number-- 
                    localStorage.setItem('cart', JSON.stringify(cart));         
                }
                document.getElementById('renderCart').innerHTML = renderCart(cart)
            }else if(action === "increase"){
                    cart[index].number++
                localStorage.setItem('cart', JSON.stringify(cart));
            
                // product.number++;
                document.getElementById('renderCart').innerHTML = renderCart(cart)
            }
        }
        return {
            ...product,
        };
    });
    renderTotal('renderTotalPrice');
    renderCart();
}

const renderTotal = (id) =>{
    let totalPrice = 0,
        totalItem = 0 ;
    cart.forEach((product) => {
        totalPrice += product.price * product.number;
        totalItem += product.number;
        //console.log(totalItem);
    })
    document.getElementById('renderTotalPrice').innerHTML = `
    <strong>&#36;${totalPrice}</strong>
    `;
    document.getElementById('countCart').innerHTML = `${totalItem}`;

}
renderTotal('renderTotalPrice');


///////////////////////////// REmove 

const deleteItem = (id) => {  
    const itemIndex = cart.findIndex((product) => product.id === id);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      console.log(cart);
      localStorage.setItem('cart', JSON.stringify(cart));   
      document.getElementById('renderCart').innerHTML = renderCart(cart)
      renderTotal('renderTotalPrice');

    }

    
};

///////////////////// Tìm kiếm

const searchKq = () =>{
    var search = document.querySelector('form');
    search.addEventListener('submit', Event => {
        Event.preventDefault();
        var kq = document.getElementById('name').value;
        var kq1 = products.filter(item => item.name.toLowerCase().includes(kq.toLowerCase()));
        let htmlSearch = ``;
        for (let i = 0; i < kq1.length; i++) {
            htmlSearch += `
            <div class="noo-product-item col-md-4 col-sm-6">
                <div class="noo-product-inner">
                    <h3><a href="shop-detail.html">${kq1[i].name}</a></h3>
                    <span class="posted_in"><a href="#">${kq1[i].title}</a></span>
                    <span class="onsale">Sale!</span>
                    <div class="noo-product-thumbnail">
                        <div class="noo-product-slider">
                            <a href="shop-detail.html">
                                <img src="images/product/${kq1[i].img}.jpg" alt="" /> 
                            </a>                           
                        </div>
                    </div>
                    <div class="price">
                        <del>&#36;${kq1[i].price}</del> 
                        <ins>&#36;${kq1[i].sale}</ins>
                    </div>
                    <div class="noo-loop-cart" onclick="addCart(${kq1[i].id})">
                        <a class="add-to-cart"></a>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById('products').innerHTML = htmlSearch
    });
}
searchKq();




