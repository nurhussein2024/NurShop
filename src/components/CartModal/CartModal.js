import React from 'react';
import "./CartModal.scss";
import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';

const CartModal = ({carts}) => {
  return (
    <div className='cart-modal'>
      {
        (carts?.length > 0) ? (
          <div className='cart-modal-list grid'>
            {
              carts.map(cart => {
                return (
                  <div className='cart-modal-item grid align-center font-manrope py-2' key={cart.id}>
                    <div className='cart-modal-item-img'>
                      <img src={cart?.thumbnail} alt="" className='img-cover' />
                    </div>
                    <div className='cart-modal-item-title fs-13 font-manrope text-capitalize'>{cart?.title}</div>
                    <div className='cart-modal-item-price text-orange fs-14 fw-6'>
                      {formatPrice(cart?.price)} {/* fast priser */}
                    </div>
                  </div>
                );
              })
            }
            <div className='text-capitalize view-cart-btn bg-blue fs-15 font-manrope text-center'>se min kundvagn</div>
          </div>
        ) : (
          <div className="flex flex-column align-center justify-center cart-modal-empty">
            <img src={shopping_cart} alt="" className='' />
            <h6 className='text-dark fw-4'>Tyvärr Inga produkter ännu hittat</h6>
          </div>
        )
      }
    </div>
  );
}

export default CartModal;
