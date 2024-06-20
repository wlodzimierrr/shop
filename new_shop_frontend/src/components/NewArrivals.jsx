import React, { useEffect, useState } from 'react'

// Components
import Item from './Item'

const NewArrivals = () => {

  const [new_collection, setNew_Collection] = useState([])

  useEffect(() => {
    const fetchNewCollection = async () => {
      try {
        const response = await fetch(`/api/products/newcollection`);
        if (!response.ok) {
          throw new Error('Failed to fetch new collection data');
        }
        const data = await response.json();
        setNew_Collection(data.newCollection);
      } catch (error) {
        console.error('Error fetching new collection data:', error);
        alert('Failed to fetch new collection data. Please try again later.');
      }
    };
  
    fetchNewCollection();
  }, []);

  return (
    <section className='max-padd-container bg-primary p-12 xl:py-28'>
      {/* {title} */}
      <div className='text-center max-w-xl mx-auto'>
        <h3 className='h3'>New Arrivals Products</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, maxime.</p>
      </div>
      {/* {container} */}
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32'>
        {new_collection.map((item => (
          <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        )))}
      </div>
    </section>
  )
}

export default NewArrivals