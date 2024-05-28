import React, { useState } from 'react';
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { shopping_cart } from '../../utils/images';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { getAllCarts, removeFromCart, toggleCartQty, clearCart } from '../../store/cartSlice';

const CartPage = () => {  
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount} = useSelector((state) => state.cart);

  const [buyerInfo, setBuyerInfo] = useState({ name: '', address: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({ ...buyerInfo, [name]: value });
  };
// den har usestate är för att att skriva namn och adress till kunden 
const handleCheckout = () => {
  // har är alarmet om kunden garantera att köpa den annars kan han ångra sig och avbryta köp
  const confirmed = window.confirm('Är du säker att du vill bekräfta ditt köp?');

  if (confirmed) {
   
    alert(` Bekräftad !`);
  } else {
    alert(`Avbryt köp`);
  }
};


  if(carts.length === 0){
    return (
      <div className='container my-5'>
        <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
          <img src = {shopping_cart} alt = "" />
          <span className='fw-6 fs-15 text-gray'>Din vagn är tom </span>
          <Link to = "/" className='shopping-btn bg-orange text-white fw-5'>Gå och handla nu </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='cart bg-whitesmoke'>
      <div className='container'>
        <div className='cart-ctable'>
          <div className='cart-chead bg-white'>
            <div className='cart-ctr fw-6 font-manrope fs-15'>
              <div className='cart-cth'>
                <span className='cart-ctxt'>nummer</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Produkt </span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Prist</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Kvantitet</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Totalbelopp</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Handlingar</span>
              </div>
            </div>
          </div>

          <div className='cart-cbody bg-white'>
            {
              carts.map((cart, idx) => {
                return (
                  <div className='cart-ctr py-4' key = {cart?.id}>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{idx + 1}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{cart?.title}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{formatPrice(cart?.discountedPrice)}</span>
                    </div>
                    <div className='cart-ctd'>
                      <div className='qty-change flex align-center'>
                        <button type = "button" className='qty-decrease flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "DEC"}))}>
                          <i className='fas fa-minus'></i>
                        </button>

                        <div className='qty-value flex align-center justify-center'>
                          {cart?.quantity}
                        </div>

                        <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "INC"}))}>
                          <i className='fas fa-plus'></i>
                        </button>
                      </div>
                    </div>

                    <div    className='cart-ctd'>
                      <span className='cart-ctxt text-orange fw-5'>{formatPrice(cart?.totalPrice)}</span>
                    </div>

                    <div className='cart-ctd'>
                      <button type = "button" className='delete-btn text-dark' onClick={() => dispatch(removeFromCart(cart?.id))}>Radera</button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
            <div className='cart-cfoot-l'>
              <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4' onClick={() => dispatch(clearCart())}>
                <i className='fas fa-trash'></i>
                <span className='mx-1'>Rensa vagnen</span>
              </button>
            </div>

            <div className='cart-cfoot-r flex flex-column justify-end'>
              <div className='total-txt flex align-center justify-end'>
                <div className='font-manrope fw-5'>Totalt ({itemsCount}) vara: </div>
                <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalAmount)}</span>
              </div>

              <div className="buyer-info">
                <input
                  type="text"
                  name="name"
                  placeholder="Skriv ditt namn har"
                  value={buyerInfo.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Skriv ditt adress har"
                  value={buyerInfo.address}
                  onChange={handleInputChange}
                />
              </div>

              <button type="button" className='checkout-btn text fs-16' onClick={handleCheckout}>Check out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage;
