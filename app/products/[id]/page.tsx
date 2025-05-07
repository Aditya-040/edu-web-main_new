'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const BACKEND_URL = 'https://sahu-final.onrender.com';

const getFullImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${BACKEND_URL}${imageUrl}`;
};

const ProductDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-red-500 py-12">Product not found</div>;
  }

  const images = [product.image, ...(product.additionalImages || [])].filter(Boolean);

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <div className="w-full h-80 flex items-center justify-center mb-4 bg-gray-100 rounded">
              {images[selectedImage] && (
                <Image
                  src={getFullImageUrl(images[selectedImage])}
                  alt={product.title}
                  width={400}
                  height={320}
                  className="object-contain w-auto h-72"
                />
              )}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  className={`border rounded p-1 ${selectedImage === index ? 'border-primary' : 'border-gray-300'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={getFullImageUrl(img)}
                    alt={`${product.title} View ${index + 1}`}
                    width={64}
                    height={48}
                    className="object-contain w-16 h-12"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>
          {product.features?.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Key Features</h2>
              <ul className="list-disc pl-5">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          {product.specifications?.length > 0 && (
            <button
              className="px-4 py-2 bg-primary text-white rounded w-max mb-4"
              onClick={() => document.getElementById('specifications')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Specifications
            </button>
          )}
        </div>
      </div>
      {product.specifications?.length > 0 && (
        <div id="specifications" className="mt-12 bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Value</th>
                </tr>
              </thead>
              <tbody>
                {product.specifications.map((spec: any, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{spec.name}</td>
                    <td className="px-4 py-2 border">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage; 