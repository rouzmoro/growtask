import { showPage } from "../../utils/pages.js";
import {
    getProductCount,
    updateProductCount,
    removeProduct,
    removeAllProducts,
    getProductQuantity
} from "../../store/products.js";
import {renderProducts} from "../../components/products/products.js";
import {renderSidebar} from "../../components/sidebar/sidebar.js";

const template = `
    <div class="page__navigation navigation">
        <button class="navigation__btn btn btn--small">
            <svg class="btn__icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00008 8.22205C8.00008 8.02442 7.99927 7.9163 7.99292 7.83858C7.99266 7.83535 7.99189 7.83235 7.99162 7.82947C7.98915 7.82924 7.98654 7.82904 7.98381 7.82882C7.90612 7.82247 7.79786 7.82231 7.60035 7.82231H5.73316C5.53564 7.82231 5.42738 7.82247 5.34969 7.82882C5.34672 7.82906 5.3439 7.82922 5.34123 7.82947C5.34097 7.83233 5.34084 7.83537 5.34058 7.83858C5.33423 7.9163 5.33342 8.02442 5.33342 8.22205V12.489H8.00008V8.22205ZM9.33342 12.489H10.5333C10.9177 12.489 11.166 12.4881 11.3549 12.4727C11.536 12.4579 11.6032 12.4329 11.6362 12.4161C11.7615 12.3522 11.8633 12.2503 11.9272 12.125C11.944 12.0921 11.969 12.0247 11.9838 11.8438C11.9992 11.6549 12.0001 11.4065 12.0001 11.0222V6.19861C12.0001 5.77816 11.9942 5.6951 11.9753 5.62765C11.9535 5.54964 11.9174 5.47598 11.8692 5.41085C11.8276 5.35462 11.7652 5.29889 11.4337 5.04106L6.91219 1.52413C6.78772 1.42732 6.72139 1.3766 6.67131 1.34314C6.66968 1.34206 6.66824 1.34086 6.66675 1.33989C6.66527 1.34086 6.66382 1.34206 6.66219 1.34314C6.61212 1.3766 6.54578 1.42732 6.42131 1.52413L1.89982 5.04106C1.56833 5.29889 1.50594 5.35462 1.46428 5.41085C1.41611 5.47598 1.38002 5.54964 1.35816 5.62765C1.33928 5.6951 1.33342 5.77816 1.33342 6.19861V11.0222L1.33537 11.5059C1.33743 11.6397 1.34197 11.7493 1.34969 11.8438C1.36449 12.0247 1.38955 12.0921 1.40633 12.125C1.47024 12.2503 1.57205 12.3522 1.69735 12.4161C1.73031 12.4329 1.79753 12.4579 1.9786 12.4727C2.16749 12.4881 2.41585 12.489 2.80022 12.489H4.00008V8.22205C4.00008 8.04639 3.99934 7.87445 4.01115 7.72986C4.02361 7.57751 4.05312 7.39772 4.14527 7.21684C4.27308 6.966 4.47713 6.76199 4.72795 6.63416C4.90878 6.54202 5.08864 6.51251 5.24097 6.50004C5.38551 6.48823 5.55756 6.48897 5.73316 6.48898H7.60035C7.77594 6.48897 7.94799 6.48823 8.09253 6.50004C8.24487 6.51251 8.42472 6.54202 8.60555 6.63416C8.82506 6.74603 9.00872 6.91617 9.1368 7.12504L9.18824 7.21684L9.24618 7.35161C9.29398 7.48572 9.313 7.61551 9.32235 7.72986C9.33416 7.87445 9.33342 8.04639 9.33342 8.22205V12.489ZM13.3334 11.0222C13.3334 11.3844 13.3341 11.6962 13.3132 11.9519C13.2917 12.2154 13.2438 12.4777 13.1153 12.7299C12.9236 13.1061 12.6179 13.4125 12.2416 13.6042C11.9894 13.7327 11.7271 13.7799 11.4636 13.8015C11.2078 13.8224 10.8957 13.8223 10.5333 13.8223H2.80022C2.43785 13.8223 2.12566 13.8224 1.86988 13.8015C1.60638 13.7799 1.34407 13.7327 1.09188 13.6042C0.715626 13.4125 0.409904 13.1061 0.218184 12.7299C0.0897148 12.4777 0.0417966 12.2154 0.0202671 11.9519C0.00984087 11.8241 0.00517129 11.6824 0.00268897 11.5274L8.48061e-05 11.0222V6.19861C8.21658e-05 5.85356 -0.00549668 5.55336 0.0743036 5.26827C0.139861 5.03418 0.247478 4.814 0.392012 4.61853C0.568033 4.38055 0.808495 4.20077 1.08081 3.98898L5.6023 0.472048C5.78785 0.327731 6.02824 0.124842 6.31844 0.0462669C6.51807 -0.00775397 6.72714 -0.0144527 6.92912 0.0260846L7.01506 0.0462669L7.12183 0.0814231C7.36463 0.174835 7.56889 0.3458 7.7312 0.472048L12.2527 3.98898C12.525 4.20077 12.7655 4.38055 12.9415 4.61853C13.086 4.814 13.1936 5.03418 13.2592 5.26827C13.339 5.55336 13.3334 5.85356 13.3334 6.19861V11.0222Z" fill="currentColor"/>
            </svg>
        </button>
        <div class="navigation__separator">/</div>
        <div class="navigation__location navigation__location--cart">Корзина</div>
    </div>
    <div class="page__header">
        <h3 class="page__title">Корзина</h3>
        <div class="page__count"></div>
    </div>
    <div class="page__grid">
        <div class="page__cart cart">
            <div class="cart__buttons">
                <label class="cart__btn cart__btn--select btn">
                    <input class="panel__checkbox checkbox" type="checkbox">
                    <span class="btn__text">Выбрать все</span>
                </label>
                <button class="cart__btn cart__btn--remove btn">
                    <svg class="btn__icon" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19.9355L19.2969 16.5859C19.2453 17.359 19.2029 17.997 19.127 18.5146C19.0492 19.0444 18.926 19.5293 18.6689 19.9805C18.2688 20.6827 17.6648 21.2471 16.9375 21.5996C16.4703 21.826 15.979 21.9166 15.4453 21.959C14.9238 22.0004 14.2845 22 13.5098 22H10.4902C9.71551 22 9.07621 22.0004 8.55469 21.959C8.02098 21.9166 7.52973 21.826 7.0625 21.5996C6.33518 21.2471 5.7312 20.6827 5.33105 19.9805C5.07401 19.5293 4.95083 19.0444 4.87305 18.5146C4.79705 17.997 4.75466 17.359 4.70312 16.5859L4.06445 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H21ZM6.69922 16.4531C6.75287 17.2579 6.78976 17.8037 6.85156 18.2246C6.91159 18.6334 6.98552 18.8431 7.06934 18.9902C7.26941 19.3413 7.57098 19.6236 7.93457 19.7998C8.08696 19.8736 8.30099 19.9331 8.71289 19.9658C9.13698 19.9995 9.68369 20 10.4902 20H13.5098C14.3163 20 14.863 19.9995 15.2871 19.9658C15.699 19.9331 15.913 19.8736 16.0654 19.7998C16.429 19.6236 16.7306 19.3413 16.9307 18.9902C17.0145 18.8431 17.0884 18.6334 17.1484 18.2246C17.2102 17.8037 17.2471 17.2579 17.3008 16.4531L17.9307 7H6.06934L6.69922 16.4531ZM15 2C15.5523 2 16 2.44772 16 3C16 3.55228 15.5523 4 15 4H9C8.44772 4 8 3.55228 8 3C8 2.44772 8.44772 2 9 2H15Z" fill="currentColor"/>
                    </svg>
                    <span class="btn__text">Очистить корзину</span>
                </button>
            </div>
            <div class="cart__products"></div>
        </div>
        <div class="page__sidebar sidebar">
            <div class="sidebar__container"></div>
        </div>
    </div>
`;

export function renderCart(products) {
    const page = document.querySelector('.page--cart');
    page.innerHTML = template;

    page.addEventListener('click', (event) => {
        if (event.target.closest('.cart__btn--remove')) {
            removeAllProducts();
            renderProducts();
            renderSidebar();
        }
        if (event.target.closest('.sidebar__btn-primary')) {
            showPage('checkout');
        }
        if (event.target.closest('.amount__btn--decrease')) {
            const product = event.target.closest('.product');
            const productId = Number(product.dataset.id);
            const productCount = getProductCount(productId);
            if (productCount > 1) {
                updateProductCount(productId, productCount - 1);
            } else {
                return;
            }
            renderProducts();
            renderSidebar();
        }
        if (event.target.closest('.amount__btn--increase')) {
            const product = event.target.closest('.product');
            const productId = Number(product.dataset.id);
            const productCount = getProductCount(productId);
            const productQuantity = getProductQuantity(productId);
            if (productCount < productQuantity) {
                updateProductCount(productId, productCount + 1);
            } else {
                return;
            }
            renderProducts();
            renderSidebar();
        }
        if (event.target.closest('.product__btn')) {
            const product = event.target.closest('.product');
            const productId = Number(product.dataset.id);
            removeProduct(productId);
            renderProducts();
            renderSidebar();
        }
    })
}