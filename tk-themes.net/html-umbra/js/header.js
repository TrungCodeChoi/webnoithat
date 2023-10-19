const html = `
<div class="navbar-wrapper">
    <div class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-logo">
                <a href="home.html" class="custom-logo-link">
                    <img src="images/logo.png" alt="Logo"/>
                </a>
                <button data-target=".nav-collapse" class="btn-navbar noo_icon_menu icon_menu"></button>
            </div>
            <nav class="noo-main-menu">
                <ul class="nav-collapse navbar-nav">
                    <li class="menu-item-has-children">
                        <a href="home.html">Trang chủ</a>
                    </li>
                    <li class="menu-item-has-children">
                        <a href="blog-grid.html">Bài viết</a>
                    </li>
                    <li class="menu-item-has-children">
                        <a href="shop.html">Sản phẩm</a>
                    </li>
                    <li><a href="contact-us.html">Liên hệ</a></li>
                    <li class="menu-item-has-children">
                        <a href="about-us.html">Giới thiệu </a>
                    </li>
                </ul>
            </nav>
            <div class="navbar-meta">
                <ul>
                    <li><a class="noo-search icon_search" href="#"></a></li>
                    <li>
                        <a class="fa fa-user" style="font-size: 22px;" href="index.html"></a>
                    </li>

                    <li class="noo-menu-item-cart minicart">
                        <a class="cart-button" href="cart.html">
                            <span class="cart-item">
                                <i class="icon_bag_alt"></i>
                                <span class="cart-count" id="countCart"></span>                               
                            </span>
                        </a>
                        <div class="minicart-actions clearfix">
                            <a class="button pull-left" href="shop.html"> </a>
                        </div>                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="search-header">
    <div class="remove-form"></div>
    <div class="container">
        <form class="form-horizontal noo-umbra-searchform">
            <label class="note-search">Type and Press Enter to Search</label>
            <input type="search" name="s" class="form-control" value="" placeholder="Enter keyword to search..."/>
            <button type="submit" class="noo-search-submit"><i class="icon_search"></i></button>
        </form>
    </div>
</div>
`

document.getElementById('header').innerHTML = html