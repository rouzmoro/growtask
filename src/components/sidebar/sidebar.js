import { pluralize } from '../../utils/pluralize.js';
import { formatPrice } from '../../utils/price.js';
import { getCartTotals } from "../../store/products.js";

const cartButtonText = `
К оформлению
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.00023 11L16.5862 11L11.2932 5.70702C10.9027 5.31649 10.9027 4.68348 11.2932 4.29295C11.6837 3.90243 12.3167 3.90243 12.7073 4.29295L19.7073 11.293L19.7756 11.3691C20.096 11.7619 20.0734 12.3409 19.7073 12.707L12.7073 19.707C12.3167 20.0975 11.6837 20.0975 11.2932 19.707C10.9027 19.3165 10.9027 18.6835 11.2932 18.293L16.5862 13L5.00023 13C4.44795 13 4.00023 12.5523 4.00023 12C4.00023 11.4477 4.44795 11 5.00023 11Z" fill="white"/>
</svg>
`;

const checkoutButtonText = 'Оформить заказ';

export function renderSidebar(products) {
    const { totalCount, totalCost, totalOldCost } = getCartTotals();
    const totalDiscount = totalOldCost - totalCost;

    document.querySelector('.page__count').textContent = `${totalCount} шт.`;
    document.querySelector('.box__title--total').textContent = `${totalCount} ${pluralize(totalCount, 'товар', 'товара', 'товаров')}`;
    document.querySelector('.cart-btn__cost').textContent = formatPrice(totalCost);
    document.querySelector('.cart-btn__count').textContent = totalCount;


    const sidebarCard = `
        <div class="sidebar__card">
            <h4 class="sidebar__title"></h4>
            <div class="sidebar__info">
                <div class="sidebar__row">
                    <div class="sidebar__row-item">${totalCount} ${pluralize(totalCount, 'товар', 'товара', 'товаров')}:</div>
                    <div class="sidebar__row-item">${formatPrice(totalOldCost)}</div>
                </div>
                <div class="sidebar__row sidebar__row--discount">
                    <div class="sidebar__row-item">Скидка:</div>
                    <div class="sidebar__row-item">${formatPrice(totalDiscount)}</div>
                </div>
                <div class="sidebar__row sidebar__row--total">
                    <h5 class="sidebar__row-item">Итого:</h5>
                    <h5 class="sidebar__row-item">${formatPrice(totalCost)}</h5>
                </div>
            </div>
            <button class="sidebar__btn-primary btn-primary"></button>
        </div>
    `;

    const sidebars = document.querySelectorAll('.sidebar__container');

    for (const sidebar of sidebars) {
        const isCheckout = sidebar.closest('.page--checkout');
        sidebar.innerHTML = sidebarCard;
        const sidebarButton = sidebar.querySelector('.sidebar__btn-primary');
        const sidebarTitle = sidebar.querySelector('.sidebar__title');
        sidebarButton.innerHTML = isCheckout ? checkoutButtonText : cartButtonText;
        sidebarTitle.innerHTML = isCheckout ? 'Ваш заказ:' : 'Ваша корзина:';

    }
}
