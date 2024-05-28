import React from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const Product = ({product}) => {
  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        <div className='category'>{product?.category}</div>
        <div className='product-item-img'>
          <img className='img-cover' src = {product?.images[0]} alt = {product.title} />
        </div>
        <div className='product-item-info font s-16'>
         
          <div className='title  blir py-2'> 
            {product?.title}
          </div>
          <div className='pricet flex align-center justify-center'>
           
            <span className='new-price'>
              {formatPrice(product?.discountedPrice)}
            </span>
           
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product