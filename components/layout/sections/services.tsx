'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductItem from "./ProductItem";

const API_URL = 'https://sahu-final.onrender.com';

export const ProductsSection = ({ limit }: { limit?: number }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      if (data && data.data) {
        setProducts(data.data);
        setError(null);
      } else {
        setError('Invalid data format received');
      }
    } catch (err) {
      setError('Unable to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (loading) {
    return (
      <section id="products" className="container py-24 sm:py-32">
        <div className="text-center text-lg">Loading products...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="container py-24 sm:py-32">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section id="products" className="container py-24 sm:py-32">
      <p className="text-lg text-primary text-center mb-2 tracking-wider">Products</p>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">Our Products</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-auto">
        {displayedProducts.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      {limit && (
        <div className="flex justify-center mt-8">
          <Link href="/products" className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 transition">
            Explore More &rarr;
          </Link>
        </div>
      )}
    </section>
  );
};
