import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 20;
const API_URL = 'http://localhost:8000/store/products/';

function getProductImage(product, idx) {
  if (product.images && product.images.length > 0 && product.images[0].image) {
    return product.images[0].image;
  }
  // Fallback to Picsum Photos
  return `https://picsum.photos/seed/${idx}/400/300`;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}?limit=${PAGE_SIZE}&page=${page}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data.results || []);
        setTotal(data.count || 0);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-400">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div key={product.id || idx} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img
              src={getProductImage(product, (page - 1) * PAGE_SIZE + idx)}
              alt={product.title || 'Product'}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2 truncate" title={product.title}>{product.title}</h2>
              <p className="text-gray-300 mb-4 flex-1" title={product.description}>
                {product.description?.length > 120 ? product.description.slice(0, 120) + '...' : product.description}
              </p>
              <div className="mt-auto">
                <span className="inline-block bg-green-600 text-white px-3 py-1 rounded text-lg font-bold">
                  ${product.unit_price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList; 