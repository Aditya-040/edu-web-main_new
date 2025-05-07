'use client';
import React, { useState, useEffect } from 'react';

const BACKEND_URL = 'https://sahu-final.onrender.com';

const getFullImageUrl = (imageUrl: string) => {
  if (!imageUrl) return '';
  return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl}`;
};

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  additionalImages: string[];
  features: string[];
  specifications: { name: string; value: string }[];
  isFeatured: boolean;
}

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image: string;
    additionalImages: string[];
    features: string[];
    specifications: { name: string; value: string }[];
    isFeatured: boolean;
  }>({
    title: '',
    description: '',
    image: '',
    additionalImages: [],
    features: [''],
    specifications: [{ name: '', value: '' }],
    isFeatured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Failed to fetch products');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      image: product.image,
      additionalImages: product.additionalImages || [],
      features: product.features || [''],
      specifications: product.specifications || [{ name: '', value: '' }],
      isFeatured: product.isFeatured || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/upload`, {
          method: 'POST',
          body: formDataUpload
        });
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            image: data.data.url || data.data.path
          }));
          setError(null);
        } else {
          setError('Failed to upload image');
        }
      } catch (error) {
        setError('Failed to upload image. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/upload`, {
          method: 'POST',
          body: formDataUpload
        });
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            additionalImages: [...prev.additionalImages, data.data.url || data.data.path]
          }));
        } else {
          setError('Failed to upload image');
        }
      } catch (error) {
        setError('Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleAddSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const handleRemoveSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const handleSpecificationChange = (index: number, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => i === index ? { ...spec, [field]: value } : spec)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formattedFeatures = formData.features.filter(feature => feature.trim() !== '').map(feature => feature.trim());
      const formattedSpecifications = formData.specifications.filter(spec => spec.name.trim() !== '' && spec.value.trim() !== '').map(spec => ({ name: spec.name.trim(), value: spec.value.trim() }));
      const productData = { ...formData, features: formattedFeatures, specifications: formattedSpecifications };
      let res;
      if (editingProduct) {
        res = await fetch(`${BACKEND_URL}/api/products/${editingProduct}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
      } else {
        res = await fetch(`${BACKEND_URL}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
      }
      const data = await res.json();
      if (data.success) {
        setSuccess(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setFormData({
          title: '',
          description: '',
          image: '',
          additionalImages: [],
          features: [''],
          specifications: [{ name: '', value: '' }],
          isFeatured: false
        });
        setEditingProduct(null);
        fetchProducts();
      } else {
        setError(data.message || 'Failed to save product');
      }
    } catch (error) {
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      additionalImages: [],
      features: [''],
      specifications: [{ name: '', value: '' }],
      isFeatured: false
    });
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setSuccess('Product deleted successfully!');
          fetchProducts();
        } else {
          setError('Failed to delete product');
        }
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-8">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Main Image</label>
          <input type="file" onChange={handleImageUpload} accept="image/*" required={!editingProduct} />
          {formData.image && <img src={getFullImageUrl(formData.image)} alt="Preview" className="w-32 h-24 object-contain mt-2" />}
        </div>
        <div>
          <label className="block font-semibold mb-1">Additional Images</label>
          <input type="file" onChange={handleAdditionalImageUpload} accept="image/*" />
          <div className="flex gap-2 mt-2 flex-wrap">
            {formData.additionalImages.map((img, index) => (
              <div key={index} className="relative">
                <img src={getFullImageUrl(img)} alt={`Additional ${index + 1}`} className="w-20 h-16 object-contain border rounded" />
                <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded px-1 text-xs" onClick={() => setFormData(prev => ({ ...prev, additionalImages: prev.additionalImages.filter((_, i) => i !== index) }))}>Remove</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-1">
              <input type="text" value={feature} onChange={e => handleFeatureChange(index, e.target.value)} placeholder={`Feature ${index + 1}`} className="flex-1 border rounded px-3 py-2" />
              <button type="button" className="bg-red-500 text-white rounded px-2" onClick={() => handleRemoveFeature(index)}>Remove</button>
            </div>
          ))}
          <button type="button" className="bg-blue-500 text-white rounded px-2 mt-1" onClick={handleAddFeature}>Add Feature</button>
        </div>
        <div>
          <label className="block font-semibold mb-1">Specifications</label>
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-1">
              <input type="text" value={spec.name} onChange={e => handleSpecificationChange(index, 'name', e.target.value)} placeholder="Name" className="flex-1 border rounded px-3 py-2" />
              <input type="text" value={spec.value} onChange={e => handleSpecificationChange(index, 'value', e.target.value)} placeholder="Value" className="flex-1 border rounded px-3 py-2" />
              <button type="button" className="bg-red-500 text-white rounded px-2" onClick={() => handleRemoveSpecification(index)}>Remove</button>
            </div>
          ))}
          <button type="button" className="bg-blue-500 text-white rounded px-2 mt-1" onClick={handleAddSpecification}>Add Specification</button>
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            Featured Product
          </label>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white rounded px-4 py-2" disabled={loading}>{loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}</button>
          {editingProduct && <button type="button" className="bg-gray-400 text-white rounded px-4 py-2" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Existing Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product._id} className="border rounded p-2 flex flex-col items-center">
              <img src={getFullImageUrl(product.image)} alt={product.title} className="w-32 h-24 object-contain mb-2" />
              <h3 className="font-semibold mb-1">{product.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white rounded px-2">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white rounded px-2">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 