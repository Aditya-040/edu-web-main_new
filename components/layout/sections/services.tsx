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
      <div className="flex justify-center mt-12">
        <Link 
          href="/products" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          Explore More Products
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-5 w-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};
