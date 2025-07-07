import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PRODUCT_API = 'http://localhost:8000/store/products/';

// Custom hook to determine product count per page based on screen width
function useResponsiveLimit() {
  const getLimit = () => {
    if (typeof window === 'undefined') return 24;
    const w = window.innerWidth;
    if (w >= 1800) return 40; // ultra-wide
    if (w >= 1440) return 32; // large desktop
    if (w >= 1024) return 24; // small desktop
    return 24; // fallback for tablets/small screens
  };
  const [limit, setLimit] = useState(getLimit());
  useEffect(() => {
    const handleResize = () => setLimit(getLimit());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return limit;
}

function ProductList() {
  const limit = useResponsiveLimit();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(PRODUCT_API, {
          params: { page, limit },
        });
        setProducts(res.data.results || res.data);
        setTotalPages(Math.ceil((res.data.count || 1) / limit));
      } catch (err) {
        setError('Failed to load products.');
      }
      setLoading(false);
    };
    fetchProducts();
  }, [page, limit]);

  // Responsive grid columns
  const gridCols =
    typeof window !== 'undefined' && window.innerWidth >= 1800
      ? 'grid-cols-5'
      : typeof window !== 'undefined' && window.innerWidth >= 1440
      ? 'grid-cols-4'
      : typeof window !== 'undefined' && window.innerWidth >= 1024
      ? 'grid-cols-3'
      : 'grid-cols-1';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden flex flex-col">
      {/* Animated Blobs */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-indigo-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-yellow-400 opacity-10 rounded-full filter blur-3xl animate-spin-slow z-0" style={{transform: 'translate(-50%, -50%)'}} />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 drop-shadow-lg">
          Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500">Products</span>
        </h1>
        {error && (
          <div className="bg-red-500 bg-opacity-80 text-white rounded-lg px-6 py-4 mb-8 text-center font-semibold shadow-lg">
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={`grid ${gridCols} gap-10`}>
            {products.map((product, idx) => (
              <div
                key={product.id || idx}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col items-center hover:scale-105 transition-transform group relative overflow-hidden"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-800 flex items-center justify-center">
                  <img
                    src={`https://picsum.photos/seed/${product.id || idx}/400/300`}
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h2 className="text-xl font-bold text-white mb-2 text-center drop-shadow-lg">
                  {product.title}
                </h2>
                <p className="text-gray-200 text-center mb-4 line-clamp-3 min-h-[60px]">
                  {product.description}
                </p>
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 drop-shadow-lg">
                    ${product.unit_price}
                  </span>
                  <button className="ml-auto px-5 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-400 hover:to-indigo-400 transition-all text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2 bg-white/20 border border-white/30 text-white font-bold rounded-lg shadow hover:bg-white/40 hover:text-indigo-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {/* Smart Pagination Logic */}
          {(() => {
            const pageButtons = [];
            const pageWindow = 2; // how many pages before/after current
            let start = Math.max(2, page - pageWindow);
            let end = Math.min(totalPages - 1, page + pageWindow);
            if (totalPages <= 7) {
              // Show all if not too many
              for (let i = 1; i <= totalPages; i++) {
                pageButtons.push(
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-4 py-2 font-bold rounded-lg shadow transition-all mx-1 ${
                      page === i
                        ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 text-white scale-110'
                        : 'bg-white/20 border border-white/30 text-white hover:bg-white/40 hover:text-indigo-900'
                    }`}
                  >
                    {i}
                  </button>
                );
              }
            } else {
              // Always show first page
              pageButtons.push(
                <button
                  key={1}
                  onClick={() => setPage(1)}
                  className={`px-4 py-2 font-bold rounded-lg shadow transition-all mx-1 ${
                    page === 1
                      ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 text-white scale-110'
                      : 'bg-white/20 border border-white/30 text-white hover:bg-white/40 hover:text-indigo-900'
                  }`}
                >
                  1
                </button>
              );
              // Ellipsis if needed
              if (start > 2) {
                pageButtons.push(
                  <span key="start-ellipsis" className="px-2 py-2 text-white font-bold">...</span>
                );
              }
              // Page window
              for (let i = start; i <= end; i++) {
                pageButtons.push(
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-4 py-2 font-bold rounded-lg shadow transition-all mx-1 ${
                      page === i
                        ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 text-white scale-110'
                        : 'bg-white/20 border border-white/30 text-white hover:bg-white/40 hover:text-indigo-900'
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              // Ellipsis if needed
              if (end < totalPages - 1) {
                pageButtons.push(
                  <span key="end-ellipsis" className="px-2 py-2 text-white font-bold">...</span>
                );
              }
              // Always show last page
              pageButtons.push(
                <button
                  key={totalPages}
                  onClick={() => setPage(totalPages)}
                  className={`px-4 py-2 font-bold rounded-lg shadow transition-all mx-1 ${
                    page === totalPages
                      ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 text-white scale-110'
                      : 'bg-white/20 border border-white/30 text-white hover:bg-white/40 hover:text-indigo-900'
                  }`}
                >
                  {totalPages}
                </button>
              );
            }
            return pageButtons;
          })()}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-5 py-2 bg-white/20 border border-white/30 text-white font-bold rounded-lg shadow hover:bg-white/40 hover:text-indigo-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList; 