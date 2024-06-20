import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

// Components
import ProductDisplay from '../components/ProductDisplay'
import ProductHD from '../components/ProductHD'
import ProductDesciption from '../components/ProductDesciption'
import PopularProducts from '../components/PopularProducts'

// Contexts
import { ShopContext } from '../context/ShopContext'

const Product = () => {

  const { productId } = useParams();
  const { all_products } = useContext(ShopContext)
  
  const product = all_products.find((e) => e.id === Number(productId));
  if(!product) {
    return <div>Product not found!</div>
  }
  
  return (
    <section>
      <div>
        <ProductHD product={product}/>
        <ProductDisplay product={product}/>
        <ProductDesciption />
        <PopularProducts />
      </div>
    </section>
  )
}

export default Product