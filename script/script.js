
const slider = (() => {
    const arrImg = ['./image/slider8.jpg', './image/slider9.jpg', './image/slider4.jpg'];
    const slider = document.querySelector('.banner__slider-wrap');
    const paginations = document.querySelector('.banner__slider-pagination');
    let firstClone, lastClone, slideItems, dots, controls, autoShow;
    let index = 1,
        interval = 3000;
    const prev = document.querySelector('.fa-circle-chevron-left');
    const next = document.querySelector('.fa-circle-chevron-right');

    for (let i = 0; i <= arrImg.length - 1; i++) {
        slider.innerHTML += `
        <div class="slide-item">
            <div class="slide-img">
                <img src="${arrImg[i]}" alt="">
            </div>
            <div class="slide-content d-middle-y">
                <div class="slide-text">
                    <h4 class="text__sub-header">Mona Watch</h4>
                    <h1 class="text__header">Đồng hồ Classico</h1>
                    <p class="text__des">Cùng với sự phát triển không ngừng của thời trang thế giới, rất nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…</p>
                </div>
                <button class="slide-btn">XEM SẢN PHẨM</button>
            </div>
        </div>`
        paginations.innerHTML += `
        <div class="dot control"></div>`
    }
    slideItems = slider.querySelectorAll('.slide-item');
    firstClone = slideItems[0].cloneNode(true);
    lastClone = slideItems[1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slider.firstElementChild);
    slideItems = slider.querySelectorAll('.slide-item');
    dots = paginations.querySelectorAll('.dot');
    controls = document.querySelectorAll('.sec-banner .control');

    return {
        removeClass(ele, class__name) {
            if (ele.querySelector('.' + class__name)) {
                ele.querySelector('.' + class__name).classList.remove(class__name);
            }
        },
        plusSlide(x) {
            if (index <= 0 || index >= slideItems.length - 1) return
            index += x;
            this.showSlide(index)
        },
        showSlide(x) {
            index = x; //gán index khi bấm chọn pagination
            slider.style.left = `${-index * 100}%`;
            slider.style.transition = 'all 0.4s ease-out';
            // remove class active
            this.removeClass(paginations, 'active');
            // add class active
            x = x >= slideItems.length - 1 ? 1 : x <= 0 ? slideItems.length - 2 : x;
            dots[x - 1].classList.add('active');
            //remove class visibility
            this.removeClass(slider, 'visibility');
            // add class visibility 
            slideItems[index].querySelector('.slide-content').classList.add('visibility');
        },
        // sau 3s next slide
        startSlideShow() {
            autoShow = setInterval(() => {
                this.plusSlide(1);
            }, interval);
        },

        init() {
            this.showSlide(index);
            for (let i = 0; i <= dots.length - 1; i++) {
                dots[i].onclick = () => {
                    this.showSlide(i + 1);
                }
            }
            next.onclick = () => {
                this.plusSlide(1);

            };
            prev.onclick = () => {
                this.plusSlide(-1);
            };
            // transitionend animationend
            slider.addEventListener('animationend', () => {
                if (index >= slideItems.length - 1) {
                    index = 1;
                    slider.style.transition = 'none';
                    slideItems[index].querySelector('.slide-content').style.opacity = '1';
                    slider.style.left = `${-index * 100}%`;
                }
                if (index <= 0) {
                    index = slideItems.length - 2;
                    slider.style.transition = 'none';
                    slideItems[index].querySelector('.slide-content').style.opacity = '1';
                    slider.style.left = `${-index * 100}%`;
                }
            });
            for (let i = 0; i <= controls.length - 1; i++) {
                // khi mouseenter vào các nút thì dừng autoshow
                controls[i].addEventListener('mouseenter', () => {
                    clearInterval(autoShow);
                });
                // khi mouseleave vào các nút thì kích hoạt chạy tự động
                controls[i].addEventListener('mouseleave', () => {
                    this.startSlideShow();
                });
            }
            // mặc định chạy silde 1
            this.showSlide(index);
            // bắt đầu chạy interval qua slider
            this.startSlideShow();
        }
    }
})();

// BEST SALE
const bestSale = (() => {
    let bestSaleProducts = [{
        src: './image/img1.jpg',
        quantity: 1,
        name: 'Classico 1',
        price: 800000,
        sale: 0,
        id_product: 'id_1'
    }, {
        src: './image/img3.jpg',
        quantity: 1,
        name: 'Classico 3',
        price: 600000,
        sale: 0,
        id_product: 'id_3'
    }, {
        src: './image/img9.jpg',
        quantity: 1,
        name: 'Classico 9',
        price: 89000,
        sale: 10,
        id_product: 'id_9'
    }, {
        src: './image/img11.jpg',
        quantity: 1,
        name: 'Classico 11',
        price: 450000,
        sale: 0,
        id_product: 'id_11'
    }, {
        src: './image/img10.jpg',
        quantity: 1,
        name: 'Classico 10',
        price: 1000000,
        sale: 20,
        id_product: 'id_10'
    }];
    const bestSaleInner = document.querySelector('.best-sale__inner');
    const controlNext = document.querySelector('.best-sale--control .next');
    const controlPrev = document.querySelector('.best-sale--control .prev');
    let index = 0;
    let numCol, numCol_init, numProduct, numHide;
    let colWidth, rowWidth;
    let itemCol;
    let checkClick = false;
    numProduct = bestSaleProducts.length;
    return {
        next() {
            index++;
            // console.log(index)
            if (index > bestSaleProducts.length - numCol) {
                index = bestSaleProducts.length - numCol;
                // controlNext.classList.replace('zoom-out', 'zoom-in');
                return;
            };
            // if (index >= 0) {
            //     controlPrev.classList.replace('zoom-in', 'zoom-out');
            // }
            bestSaleInner.style.transform = `translateX(${-index * colWidth}px)`;
        },
        prev() {
            index--;
            // console.log(index)
            if (index < 0) {
                index = 0;
                // controlPrev.classList.replace('zoom-out', 'zoom-in');
                return;
            }
            // if (index <= bestSaleProducts.length - numCol) {
            //     controlNext.classList.replace('zoom-in', 'zoom-out');
            // }
            bestSaleInner.style.transform = `translateX(${-index * colWidth}px)`;
        },
        start(x) {
            rowWidth = document.querySelector('.sec-best-sale').clientWidth;
            colWidth = document.querySelector('.sec-best-sale .col').clientWidth;
            numCol = Math.round(rowWidth / colWidth);
            numHide = numProduct - numCol;
            // thay đổi index khi touch
            if (x > numHide) {
                index = numHide;
            } else if (x < 0) {
                index = 0;
            } else {
                index = x;
            }
            bestSaleInner.style.transform = `translateX(${-index * colWidth}px)`;
        },
        dektop_mouse() {
            itemCol = document.querySelectorAll('.best-sale__inner .item');
            let x1, x2, x, z, colW = itemCol[0].clientWidth;

            bestSaleInner.addEventListener('mousedown', (e) => {
                let image = e.target.closest('.best-sale__product-bg');
                // e.stopPropagation();
                if (image) {
                    // ngăn k cho kéo ảnh trên window
                    // console.log(image)
                    image.ondragstart = () => {
                        return false;
                    }
                }
                bestSaleInner.style.cursor = 'grabbing';
                checkClick = true;
                x1 = e.pageX;
                // console.log('mousedown x1',x1)
                z = bestSaleInner.style.transform.replace('translateX(', '');
                z = Number(z.replace('px)', ''));

            });
            bestSaleInner.addEventListener('mousemove', (e) => {
                if (checkClick == true) {
                    bestSaleInner.style.cursor = 'grabbing';
                    x2 = e.clientX;
                    x = x2 - x1;
                    // console.log(x2, x)
                    if (x) {
                        // transform trong khi vuốt
                        bestSaleInner.style.transform = `translateX(${z + x}px)`;
                        bestSaleInner.style.transition = `0s`;
                    }
                } else {
                    bestSaleInner.style.cursor = 'grab';
                }
            });
            bestSaleInner.addEventListener('mouseup', (e) => {
                // console.log('mouseUp')
                checkClick = false;
                bestSaleInner.style.cursor = 'grab';
                bestSaleInner.style.transition = `0.4s`;
                if ((index >= numHide && x < 0) || (index <= 0 && x > 0)) {
                    bestSaleInner.style.transform = `translateX(${-index * colWidth}px)`;
                    return;
                }
                let y;
                x = (x / colW).toFixed() * 1;
                y = ((z + x * colW) / colW).toFixed() * 1;
                this.start(-y);
            });
            // trường hợp vuốt mạnh tay kéo quá thì bị tính LEAVE thì sẽ bị giới hạn
            bestSaleInner.addEventListener('mouseleave', (e) => {
                if (checkClick == true) {
                    // console.log('mouse Leave');
                    bestSaleInner.style.cursor = 'default';
                    checkClick = false;
                    bestSaleInner.style.transition = `0.4s`;
                    if ((index >= numHide && x < 0) || (index <= 0 && x > 0)) {
                        bestSaleInner.style.transform = `translateX(${-index * colWidth}px)`;
                        return;
                    }
                    let y;
                    x = (x / colW).toFixed() * 1;
                    y = ((z + x * colW) / colW).toFixed() * 1;
                    this.start(-y);
                }
            });

        },
        mobile_touch() {
            itemCol = document.querySelectorAll('.best-sale__inner .item');
            let x1, x2, x, z, colW = itemCol[0].clientWidth;
            bestSaleInner.ontouchstart = (e) => {
                x1 = e.touches[0].clientX;
                // console.log('x1 touch start', x1)
                z = bestSaleInner.style.transform.replace('translateX(', '');
                z = Number(z.replace('px)', ''));
            }
            bestSaleInner.ontouchmove = (e) => {
                x2 = e.touches[0].clientX;
                x = x2 - x1;
                if (x) {
                    // transform trong khi vuốt
                    bestSaleInner.style.transition = `0s`;
                    bestSaleInner.style.transform = `translateX(${z + x}px)`;
                    // console.log('touchMove',x)
                }
            }
            bestSaleInner.ontouchend = (e) => {
                bestSaleInner.style.transition = `0.4s`;
                // Nếu vuốt quá sẽ k vuốt được
                // console.log('touch end')
                if ((index >= numHide && x < 0) || (index <= 0 && x > 0)) {
                    bestSaleInner.style.transform = `translateX(${-index * colWidth}px)`;
                    return;
                }
                let y;
                x = (x / colW).toFixed() * 1;
                y = ((z + x * colW) / colW).toFixed() * 1;
                this.start(-y);
            }

        },


        init() {
            allProducts.render_products.call(allProducts, bestSaleProducts, bestSaleInner);
            controlNext.onclick = this.next;
            controlPrev.onclick = this.prev;

            this.start(index);
            window.onresize = () => {
                // console.log('resize')
                this.start(index)
            };
            this.mobile_touch();
            this.dektop_mouse();

        }
    }
})();

// bestSale.init();
const allProducts = (() => {
    const productInner = document.querySelector('.all-product__inner');
    // mảng chứa toàn bộ item
    let arr_all_products = [{
        src: './image/img1.jpg',
        quantity: 1,
        name: 'Classico 1',
        price: 800000,
        sale: 0,
        id_product: 'id_1'
    }, {
        src: './image/img2.jpg',
        quantity: 1,
        name: 'Classico 2',
        price: 700000,
        sale: 0,
        id_product: 'id_2'
    }, {
        src: './image/img3.jpg',
        quantity: 1,
        name: 'Classico 3',
        price: 600000,
        sale: 0,
        id_product: 'id_3'
    }, {
        src: './image/img4.jpg',
        quantity: 1,
        name: 'Classico 4',
        price: 500000,
        sale: 0,
        id_product: 'id_4'
    }, {
        src: './image/img5.jpg',
        quantity: 1,
        name: 'Classico 5',
        price: 500000,
        sale: 0,
        id_product: 'id_5'
    }, {
        src: './image/img6.jpg',
        quantity: 1,
        name: 'Classico 6',
        price: 800000,
        sale: 10,
        id_product: 'id_6'
    }, {
        src: './image/img7.jpg',
        quantity: 1,
        name: 'Classico 7',
        price: 700000,
        sale: 15,
        id_product: 'id_7'
    }, {
        src: './image/img8.jpg',
        quantity: 1,
        name: 'Classico 8',
        price: 880000,
        sale: 20,
        id_product: 'id_8'
    }, {
        src: './image/img9.jpg',
        quantity: 1,
        name: 'Classico 9',
        price: 89000,
        sale: 10,
        id_product: 'id_9'
    }, {
        src: './image/img10.jpg',
        quantity: 1,
        name: 'Classico 10',
        price: 1000000,
        sale: 20,
        id_product: 'id_10'
    }, {
        src: './image/img11.jpg',
        quantity: 1,
        name: 'Classico 11',
        price: 450000,
        sale: 0,
        id_product: 'id_11'
    }, {
        src: './image/img12.jpg',
        quantity: 1,
        name: 'Classico 12',
        price: 550000,
        sale: 0,
        id_product: 'id_12'
    }, {
        src: './image/img13.jpg',
        quantity: 1,
        name: 'Classico 13',
        price: 650000,
        sale: 0,
        id_product: 'id_13'
    }, {
        src: './image/img14.jpg',
        quantity: 1,
        name: 'Classico 14',
        price: 600000,
        sale: 0,
        id_product: 'id_14'
    }, {
        src: './image/img15.jpg',
        quantity: 1,
        name: 'Classico 15',
        price: 990000,
        sale: 0,
        id_product: 'id_15',
    }];
    const controlFilter = document.querySelector('.all-product__nav-list')
    const arr_Id_popular = arr_all_products.slice(0, 5).map(product => product.id_product);
    const arr_Id_sale = arr_all_products.slice(5, 10).map(product => product.id_product);
    const arr_Id_new = arr_all_products.slice(10, 15).map(product => product.id_product);
    let items;
    const proAll = controlFilter.querySelector('.product-all');
    const proPopular = controlFilter.querySelector('.product-popular');
    const proSale = controlFilter.querySelector('.product-sale');
    const proNew = controlFilter.querySelector('.product-new');

    return {
        render_products(arrProduct, eleParent) {
            eleParent.innerHTML = ''
            for (let i = 0; i <= arrProduct.length - 1; i++) {
                let old_price = arrProduct[i].price;
                let saleOff = arrProduct[i].price * arrProduct[i].sale / 100;
                let new_price = old_price - saleOff;
                old_price = this.formatMoney(old_price);
                new_price = this.formatMoney(new_price);
                // let new_price=
                // 
                eleParent.innerHTML += `
                                <div class="col col-quater item">
                                    <div class="best-sale__product text-center">
                                        <div class="best-sale__product-img">
                                            <div class='best-sale__product-bg'>
                                                <img src="${arrProduct[i].src}" alt="">
                                            </div>
                                            <p class="sale-percent text-white">${arrProduct[i].sale}</p>
                                            <div class="sale-heart text-white" data-index='${arrProduct[i].id_product}'><i class="fa-solid fa-heart"></i></div>
                                            <div class='desc text-white'>
                                                <p class='hide selected'> Thêm yêu thích</p>
                                                <p class='hide'>Đã thêm yêu thích</p>
                                            </div>    
                                        </div>
                                        <div class="best-sale__product-info">
                                            <h4 class="best-sale__info--name">${arrProduct[i].name}</h4>
                                            <div class="best-sale__info--price">
                                                <span class="old-price format-price">${old_price}</span>
                                                <span class="new-price format-price">${new_price}</span>
                                            </div>
                                            <div class="best-sale__btn-add d-flex" data-index='${arrProduct[i].id_product}'>
                                                <button class="hide selected text-white btn__add-cart">THÊM VÀO GIỎ</button>
                                                <button class="hide btn__view-cart">XEM GIỎ HÀNG<i class="fa-solid fa-arrow-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                if (arrProduct[i].sale == 0) {
                    eleParent.querySelectorAll('.sale-percent')[i].classList.add('no-sale');
                    eleParent.querySelectorAll('.new-price')[i].classList.add('no-sale');
                    eleParent.querySelectorAll('.old-price')[i].classList.add('no-sale');
                } else {
                    eleParent.querySelectorAll('.old-price')[i].classList.add('sale');
                    eleParent.querySelectorAll('.sale-percent')[i].innerHTML = '-' + eleParent.querySelectorAll('.sale-percent')[i].innerHTML + '%';
                }
            }
        },
        changeClass(ele, class__old, class__new) {
            let x = ele.querySelectorAll(`.${class__old}`);
            for (let i = 0; i <= x.length - 1; i++) {
                if (class__new) { // replace class
                    x[i].classList.replace(class__old, class__new);
                } else { ////////// remove class
                    x[i].classList.remove(class__old);
                }
            }
        },
        addClass(ele, class__new) {
            ele.parentElement.querySelector('.' + class__new).classList.remove(class__new);
            ele.classList.add(class__new);
        },
        filterProduct(arrCondition) {
            items = productInner.querySelectorAll('.item');
            for (let i = 0; i <= items.length - 1; i++) {
                items[i].classList.add('animate-scale');
                items[i].style.display = 'block';
            }
            if (arrCondition) {
                arr_all_products.forEach((product, index) => {
                    if (!arrCondition.includes(product.id_product)) {
                        items[index].style.display = 'none';
                    }
                });
            }
        },
        filterButton() {
            proAll.onclick = () => {
                this.filterProduct();
                this.addClass(proAll, 'active')
            };
            proPopular.onclick = () => {
                this.filterProduct(arr_Id_popular);
                this.addClass(proPopular, 'active')
            };
            proNew.onclick = () => {
                this.filterProduct(arr_Id_new);
                this.addClass(proNew, 'active')
            };
            proSale.onclick = () => {
                this.filterProduct(arr_Id_sale);
                this.addClass(proSale, 'active')
            };
        },
        createLocalStorage(key) {
            const store = JSON.parse(localStorage.getItem(key)) || {};
            const save = () => {
                localStorage.setItem(key, JSON.stringify(store));
            }
            const storage = {
                getStore() {
                    return store;
                },
                getLengthStore() {
                    return Object.keys(store).length;
                },
                get(key) {
                    return store[key];
                },
                set(key, value) {
                    store[key] = value;
                    save();
                },
                remove(key) {
                    delete store[key];
                    save();
                }
            }
            return storage;
        },

        change_LocalStorage() {
            let JsonFavorite = this.createLocalStorage('favorite');
            let JsonCart = this.createLocalStorage('cart');

            window.addEventListener('click', (e) => {
                const favorite = e.target.closest('.sale-heart');
                const cart = e.target.closest('.best-sale__btn-add');
                const removeItem = e.target.closest('.product-item__remove');
                if (favorite || cart || removeItem) {
                    for (let i = 0; i <= arr_all_products.length - 1; i++) {
                        if (favorite) { //add favorite vào LocalStorage
                            if (arr_all_products[i].id_product === favorite.dataset.index) {
                                JsonFavorite.set(favorite.dataset.index, arr_all_products[i]);
                                this.change_Selected_Heart_Cart(favorite);
                            }
                        }
                        if (cart) { //add cart vào LocalStorage
                            if (arr_all_products[i].id_product === cart.dataset.index) {
                                if (JsonCart.get(cart.dataset.index)) { //đã có thì tăng thêm 1
                                    let quantity = JsonCart.get(cart.dataset.index).quantity;
                                    let newProduct = {
                                        ...JsonCart.get(cart.dataset.index)
                                    };
                                    newProduct.quantity += 1;
                                    JsonCart.set(cart.dataset.index, newProduct);
                                } else { // chưa có thì add
                                    JsonCart.set(cart.dataset.index, arr_all_products[i]);
                                }
                                // thay đổi sang trạng thái selected
                                this.change_Selected_Heart_Cart(cart);
                            }
                            // thay đổi các sp cùng id sang cùng selected
                            this.show_Cart_Selected(cart);
                        }
                        if (removeItem) {
                            // remove product cart
                            JsonCart.remove(removeItem.dataset.index);
                            // các sản phẩm đã remove thì nút ấn quay lại ban đầu
                            this.show_Cart_Selected(removeItem, true);
                        }
                    }
                    // console.log('xx')
                    this.show_Heart_Selected();
                    this.show_NumCart_NumLike();
                    this.render_cart();
                }
            });
        },
        // thay đổi trạng thái selected của favorite và cart
        change_Selected_Heart_Cart(ele, reverse = false) {
            // console.log('thay đổi trạng thái selected của favorite và cart')
            const hides = ele.parentElement.querySelectorAll('.hide');
            if (reverse) { // khi delete item trong cart thì reverse
                hides[1].classList.remove('selected');
                hides[0].classList.add('selected');
            } else {
                hides[0].classList.remove('selected');
                hides[1].classList.add('selected');
            }
        },
        // hiển thị trạng thái đã <3 của all nút <3 đã ấn <3
        show_Heart_Selected() {
            let nodeList_heart = document.querySelectorAll('.sale-heart');
            let Storage_favorite = this.createLocalStorage('favorite');
            let nodeList_btnCart = document.querySelectorAll('.best-sale__btn-add');
            let Storage_cart = this.createLocalStorage('cart');
            for (let i = 0; i <= nodeList_heart.length - 1; i++) {
                if (Storage_favorite.get(nodeList_heart[i].dataset.index)) {
                    this.change_Selected_Heart_Cart(nodeList_heart[i]);
                }
                // không dùng cho cart là vì để có thể add thêm sp vào giỏ khi đã có

                // if (Storage_cart.get(nodeList_btnCart[i].dataset.index)) {
                //     this.change_Selected_Heart_Cart(nodeList_btnCart[i]);
                // }
            }
        },
        // hiển thị trạng thái của các nút cart cùng data-index đã add
        show_Cart_Selected(ele, reverse) {
            let nodeList_btnCart = document.querySelectorAll('.best-sale__btn-add');
            // console.log('nodeList_btnCart.length ', nodeList_btnCart.length)
            for (let i = 0; i <= nodeList_btnCart.length - 1; i++) {
                if (nodeList_btnCart[i].dataset.index == ele.dataset.index) {
                    this.change_Selected_Heart_Cart(nodeList_btnCart[i], reverse);
                }
            }
        },
        // hiển thị số lượng <3 và số lượng trong cart
        show_NumCart_NumLike() {
            let numLike = document.querySelector('.num-like');
            let numCart = document.querySelectorAll('.num-cart');
            let Storage_favorite_length = this.createLocalStorage('favorite').getLengthStore();
            let Storage_cart_length = this.createLocalStorage('cart').getLengthStore();
            numLike.innerHTML = Storage_favorite_length;
            numCart[0].innerHTML = Storage_cart_length;
            numCart[1].innerHTML = Storage_cart_length;
        },
        // render small cart
        render_cart(ele = document) {
            let proList = ele.querySelector('.product-list');
            let totalPay = ele.querySelector('.tolal-pay');
            let proItem, total = 0,
                quatity, price, saleOff;
            let keyCart = this.createLocalStorage('cart');
            let arrKey = Object.keys(keyCart.getStore());
            // nếu k có sản phẩm nào trong cart thì hiện không có sản phẩm
            if (arrKey.length == 0) {
                ele.querySelector('.noproduct').classList.add('selected');
                ele.querySelector('.hasproduct').classList.remove('selected');
                return;
            }
            if (arrKey.length != 0) {
                ele.querySelector('.noproduct').classList.remove('selected');
                ele.querySelector('.hasproduct').classList.add('selected');
            }
            proList.innerHTML = '';
            for (let i = 0; i <= arrKey.length - 1; i++) {
                quatity = keyCart.get(arrKey[i]).quantity;
                price = keyCart.get(arrKey[i]).price;
                saleOff = keyCart.get(arrKey[i]).price * keyCart.get(arrKey[i]).sale / 100;
                total += quatity * (price - saleOff);
                proList.innerHTML += `
                            <div class="product-item d-flex">
                                <div class="item-index text-black">${i + 1}</div>
                                <div class="product-item__img">
                                    <img src="${keyCart.get(arrKey[i]).src}" alt="">
                                </div>
                                <div class="product-item__inner">
                                    <div class="product-item__inner--header-name text-black">
                                        ${keyCart.get(arrKey[i]).name}
                                    </div>
                                    <div class="product-item__inner--quantity-price text-gray">
                                        <span class="quantity">${quatity}</span>
                                        <span>x</span>
                                        <span class="format-price">${this.formatMoney(price - saleOff)}</span>
                                    </div>
                                </div>
                                <div class="product-item__remove  text-gray" data-index='${keyCart.get(arrKey[i]).id_product}'>
                                    <span class=".remove">&times;</span>
                                </div>
                            </div>                    
                            `
            }
            total = this.formatMoney(total);
            totalPay.innerHTML = total;
        },
        formatMoney(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
        },
        init() {
            this.render_products(arr_all_products, productInner);
            this.changeClass(productInner, 'col-quater', 'col-20');
            this.filterButton();
            productInner.addEventListener('animationend', () => {
                this.changeClass(productInner, 'animate-scale', '');
            });
            this.change_LocalStorage();
            this.show_Heart_Selected();
            this.show_NumCart_NumLike();
            this.render_cart();
        }
    }
})();

// ======================================================================
slider.init();
bestSale.init();
allProducts.init();

const animateScroll = (() => {
    // animation onsroll
    let browser_clientHeight = document.documentElement.clientHeight;
    // MENU FIXED
    let header_desktop, header_desktop_offsetTop, header_desktop_height;
    header_desktop = document.querySelector('.header-desktop__nav');
    header_desktop_offsetTop = header_desktop.offsetTop;
    header_desktop_height = header_desktop.clientHeight;
    // TREND 1
    let sec_trend, trend_male, trend_female, trend__offsetTop;
    // BEST SALE
    let bestSale_content, bestSale_offsetTop;
    // TREND 2
    let trend__classic_modern, trend_classic, trend_modern, trend__classic_modern_offsetTop;
    // ALL PRODUCT
    let allProduct_content, allProduct_offsetTop;
    // BLOGS
    let blog_content, blog_offsetTop;
    setTimeout(() => {
        // TREND 1
        sec_trend = document.querySelector('.sec-trend');
        trend_male = document.querySelector('.trend__male');
        trend_female = document.querySelector('.trend__female');
        trend__offsetTop = sec_trend.offsetTop;
        // BEST SALE
        bestSale_content = document.querySelector('.sec-best-sale');
        bestSale_offsetTop = bestSale_content.offsetTop;
        // TREND2
        trend__classic_modern = document.querySelectorAll('.sec-trend')[1];
        trend__classic_modern_offsetTop = trend__classic_modern.offsetTop;
        trend_classic = document.querySelector('.trend__classic');
        trend_modern = document.querySelector('.trend__modern');
        // ALL PRODUCTS
        allProduct_content = document.querySelector('.sec-all-product');
        allProduct_offsetTop = allProduct_content.offsetTop;
        // BLOGS
        blog_content = document.querySelector('.sec-blog');
        blog_offsetTop = blog_content.offsetTop;

    }, 1000);

    return window.onscroll = () => {
        // MENU FIXED
        if (window.pageYOffset >= header_desktop_offsetTop + header_desktop_height) {
            header_desktop.classList.add("d-fixed");
        } else if (window.pageYOffset < header_desktop_offsetTop + header_desktop_height + 20) {
            header_desktop.classList.remove("d-fixed");
        }
        // TREND 1
        if (window.pageYOffset >= trend__offsetTop - browser_clientHeight) {
            trend_male.parentElement.classList.add('trend__male--animate');
            trend_female.parentElement.classList.add('trend__female--animate');
        }
        // BEST SALE
        if (window.pageYOffset >= bestSale_offsetTop - browser_clientHeight) {
            bestSale_content.classList.add('bese-sale--animate');
        }
        // TREND 2
        if (window.pageYOffset >= trend__classic_modern_offsetTop - browser_clientHeight) {
            trend_classic.parentElement.classList.add('trend__classic--animate');
            trend_modern.parentElement.classList.add('trend__modern--animate');
        }
        // ALL PRODUCT
        if (window.pageYOffset >= allProduct_offsetTop - browser_clientHeight) {
            allProduct_content.classList.add('bese-sale--animate');
        }
        // BLOGS
        if (window.pageYOffset >= blog_offsetTop - browser_clientHeight) {
            blog_content.classList.add('blog--animate');
        }
    }
})();
