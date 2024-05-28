import React, {useEffect, useState} from 'react';
import "./ProductSinglePage.scss";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from "../../components/Loader/Loader";
import {formatPrice} from "../../utils/helpers";
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import CartMessage from "../../components/CartMessage/CartMessage";
//   hämtar single produkt 
const ProductSinglePage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);

  //   för att man ska få single produkt 
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
// den har koden är för den medelande som har kundsvagn ska bort efter 2 sekunder 
    if(cartMessageStatus){
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);   // 2000 = 2 sekunder
    }
  }, [cartMessageStatus,dispatch, id]);
   
  const regularPrice = product?.price;
  if(productSingleStatus === STATUS.LOADING) {
    return <Loader/>
  }
// den har koden ökar antal av produkten med +1 för att undervika att man kan inte öka antal av produkten till 0 för att vi ska garantera att de blir inte negativ.
  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if(tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    })
  }
// den har koden minimerar antal av produkten alltså den har koden för att man ska kunna minska antal av produkten samtidit man kan inte minska antal av produkten till 0 för att vi ska garantera att de blir inte negativ.
  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if(tempQty < 1) tempQty = 1;
      return tempQty;
    })
  }
// den har koden är för att man kan lägga till produkten i cart.
  const addToCartHandler = (product) => {
    let discountedPrice = (product?.price) ;
    let totalPrice = quantity * discountedPrice;

    dispatch(addToCart({...product, quantity: quantity, totalPrice, discountedPrice}));
    dispatch(setCartMessageOn(true));
  }

// den har koden är för att man kan se den stora bild av product 
  return (
    <main className='py-5 bg-whitesmoke'>
      <div className='product-single'>
        <div className='container'>
          <div className='product-single-content bg-white grid'>
            <div className='product-single-l'>
              <div className='product-img'>
                <div className='product-img-zoom'> 
                  <img src = {product?(product.images ? product.images[0] : "") : ""} alt = "" className='img-cover' />
                </div>
                
                <div className='product-img-thumbs flex align-center my-2'>
                 
                </div>
              </div>
            </div>

            <div className='product-single-r'>
              <div className='product-details font-manrope'>
                <div className='title fs-20 fw-5'>{product?.title}</div>
                <div>
                  <p className='para fw-3 fs-15'>{product?.description}</p>
                </div>
                <div className='info flex align-center flex-wrap fs-14'>
                  
                </div>

                <div className = "price">
                  <div className='flex align-center'>
                   
                    <span className='fs-14 mx-2 text-dark'>
                      pricet ingår moms
                    </span>
                  </div>
                  
                  <div className='flex align-center my-1'>
                    <div className='new-price fw-5 font-poppins fs-24 text-black'>
                      {formatPrice(regularPrice)}
                    </div>
                    
                  </div>
                </div>
 
                <div className='qty flex align-center my-4'>
                  <div className='qty-text'>Antal:</div>
                  <div className='qty-change flex align-center mx-3'>
                    <button type =  "button" className='qty-decrease flex align-center justify-center' onClick={() => decreaseQty()}>
                      <i className='fas fa-minus'></i>
                    </button>
                    <div className = "qty-value flex align-center justify-center">{quantity}</div>
                    <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => increaseQty()}>
                      <i className='fas fa-plus'></i>
                    </button> 
                  </div>
                  {
                    (product?.stock === 0) ? <div className ='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>Tyvärr är den slut i lager</div> : ""
                  }
                </div>

                <div className='btns'>
                  <button type = "button" className='add-to-cart-btn btn'>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='btn-text mx-2' onClick={() => { addToCartHandler(product)}}>add till cart</span>
                  </button>
                  <button type = "button" className='buy-now btn mx-3'>
                    <span className='btn-text'>köp nu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
    </main>
  )
}

export default ProductSinglePage