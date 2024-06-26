import React, { useEffect, useState } from 'react'

// Components
import Item from './Item'

const PopularProducts = () => {

  const [popular_products, setPopular_products] = useState([])

  useEffect(() => {
    fetch(`/api/products/popularProducts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPopular_products(data.popularProducts);
      })
      .catch((error) => {
        console.error('Error fetching popular products:', error);
      });
  }, []);
  
  return (
    <section className='max-padd-container bg-primary p-12 xl:py-28'>
      {/* {title} */}
      <div className='text-center max-w-xl mx-auto'>
        <h3 className='h3'>Popular Products</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, maxime.</p>
      </div>
      {/* {container} */}
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32'>
        {popular_products.map((item => (
          <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        )))}
      </div>
    </section>
  )
}

export default PopularProducts