import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash, Package } from 'lucide-react';

const ProductManager = ({ products, setProducts, onSelectProduct }) => {
  const [newProduct, setNewProduct] = useState({ name: '', barcode: '' });

  const handleAddProduct = () => {
    if (newProduct.name.trim() && newProduct.barcode.trim()) {
      setProducts(prev => [...prev, { id: Date.now(), ...newProduct }]);
      setNewProduct({ name: '', barcode: '' });
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Package className="w-6 h-6 text-blue-500" /> Gestión de Productos
      </h2>
      
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <input
          type="text"
          placeholder="Código de Barras"
          value={newProduct.barcode}
          onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <motion.button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" /> Añadir
        </motion.button>
      </div>

      {products.length > 0 ? (
        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
          {products.map(product => (
            <motion.div
              key={product.id}
              className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectProduct(product)}
            >
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">{product.barcode}</p>
              </div>
              <motion.button
                onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No hay productos añadidos. ¡Añade uno!</p>
      )}
    </motion.div>
  );
};

export default ProductManager;