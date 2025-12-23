import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateProduct } from '../../redux/slices/adminProductSlice';

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    sku: "",
    category: "",
    collections: "",
    img: [
      { url: "https://picsum.photos/150?random=1", altText: "" },
      { url: "https://picsum.photos/150?random=2", altText: "" }
    ],
    rating: 0,
    numReviews: 0,
    tags: [],
    dimension: {
      length: 0,
      width: 0,
      height: 0
    },
    weight: 0,
    metaTitle: "",
    metaDescription: "",
    metaKeyword: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProductData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setProductData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    setProductData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const handleImageChange = (index, field, value) => {
    setProductData(prev => ({
      ...prev,
      img: prev.img.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const addImageField = () => {
    setProductData(prev => ({
      ...prev,
      img: [...prev.img, { url: "", altText: "" }]
    }));
  };

  const removeImageField = (index) => {
    setProductData(prev => ({
      ...prev,
      img: prev.img.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      id,
      ...productData
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          }
        });
        setProductData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 md:col-span-2">
          <div>
            <label className="block font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Collections</label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Weight (in grams)</label>
          <input
            type="number"
            name="weight"
            value={productData.weight}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Dimensions</label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="dimension.length"
              value={productData.dimension.length}
              onChange={handleChange}
              placeholder="Length"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              name="dimension.width"
              value={productData.dimension.width}
              onChange={handleChange}
              placeholder="Width"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              name="dimension.height"
              value={productData.dimension.height}
              onChange={handleChange}
              placeholder="Height"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={productData.tags.join(",")}
            onChange={(e) => handleArrayChange(e, 'tags')}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={productData.metaTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Meta Description</label>
          <textarea
            name="metaDescription"
            value={productData.metaDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={2}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Meta Keywords</label>
          <input
            type="text"
            name="metaKeyword"
            value={productData.metaKeyword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Product Images</label>
          {productData.img.map((image, index) => (
            <div key={index} className="mb-4 flex gap-4 items-start">
              <div className="flex-grow space-y-2">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={image.url}
                  onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <input
                  type="text"
                  placeholder="Alt Text"
                  value={image.altText}
                  onChange={(e) => handleImageChange(index, 'altText', e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {image.url && (
                <img
                  src={image.url}
                  alt={image.altText || "Product Image Preview"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              )}
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Image
          </button>
        </div>
        <button
          type="submit"
          className="md:col-span-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
