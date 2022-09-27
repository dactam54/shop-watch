// DESKTEP NAV
const desktop_nav = (() => {
    window.addEventListener('click', (e) => {
        const nav_item = e.target.closest('.nav-item');
        if (nav_item) {
            const nav_list = document.querySelector('.header-desktop__nav .nav-list');
            nav_list.querySelector('.active').classList.remove('active');
            nav_item.querySelector('a').classList.add('active');
        }
    })
})();

//Show mobile nav
function openMobileNav(x) {
    x.classList.toggle("change");
    document.querySelector('.over-lay').classList.toggle("change");
    document.querySelector('.header-mobile__nav').classList.toggle("change");
    // close mobile nav
    return window.onclick = function(e) {
        const changes = document.querySelectorAll('.change');
        if (e.target.closest('.over-lay')) {
            for (let i = 0; i <= changes.length - 1; i++) {
                changes[i].classList.toggle('change');
            }
        }
    };
}

//Open small cart mobile nav
const openSmallCart = ((e) => {
    window.addEventListener('click', (e) => {
        const cart = e.target.closest('.header-mobile__cart');
        if (cart) {
            cart.querySelector('.mobile__tooltip-cart').classList.replace('hidden', 'visibility');
            allProducts.render_cart.call(allProducts, cart);
        } else {
            document.querySelector('.mobile__tooltip-cart').classList.replace('visibility', 'hidden');
        }
    });
})();

