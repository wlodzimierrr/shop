import React, { useState } from 'react'

// Components
import upload_area from '../assets/upload_area.svg'

//Icons
import { MdAdd } from 'react-icons/md'

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Mountain Bikes",
    new_price: "",
    old_price: "",
  })

  const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value})
  }

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const Add_Product = async () => {
    try {
      let formData = new FormData();
      formData.append('product', image);

      const uploadResponse = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const updatedProduct = { ...productDetails, image: uploadData.image_url };

        const addProductResponse = await fetch(`/api/products/addProduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });
        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          // Clear input fields and reset state
          setProductDetails({
            name: '',
            image: '',
            category: 'Mountain Bikes',
            new_price: '',
            old_price: '',
          });
          setImage(null);

          alert('Product Added');
        } else {
          alert('Failed to add product');
        }
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className='p-8 box-border bg-white w-full rounded-sm mt-5 lg:ml-5'>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Product name:</h4>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here...' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'/>
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Price:</h4>
        <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here...' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'/>
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Offer Price:</h4>
        <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here...' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'/>
      </div>
      <div className='mb-3 flex items-center gap-x-4'>
        <h4>Product Category:</h4>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="" className='bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none'>
          <option value="Mountain Bikes">Mountain Bikes</option>
          <option value="Electric Bikes">Electric Bikes</option>
          <option value="Road Bikes">Road Bikes</option>
        </select>
      </div>
      <div>
        <label htmlFor='file-input'>
          <img src={image?URL.createObjectURL(image):upload_area} alt="" className='w-20 rounded-sm inline-block'/>
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden className='bg-primary max-w-80 w-full py-3 px-4'/>
      </div>
      <button onClick={() => {Add_Product()}} className='btn-dark rounded-lg mt-4 flexCenter gap-x-1'>Add Product</button>
    </div>
  )
}

export default AddProduct;