import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash, Edit, Package, Search, Check, XCircle } from 'lucide-react';

const ProductDataManager = ({ products, setProducts, onSelectProduct }) => {
  const [newProduct, setNewProduct] = useState({ name: '', barcode: '' });
  const [editingProduct, setEditingProduct] = useState(null); // { id, name, barcode }
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = () => {
    if (newProduct.name.trim() && newProduct.barcode.trim()) {
      setProducts(prev => [...prev, { id: Date.now(), ...newProduct }]);
      setNewProduct({ name: '', barcode: '' });
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct && editingProduct.name.trim() && editingProduct.barcode.trim()) {
      setProducts(prev => prev.map(p => (p.id === editingProduct.id ? editingProduct : p)));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Añadir/Editar Producto</h3>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <input
            type="text"
            placeholder="Código de Barras (Numérico)"
            value={editingProduct ? editingProduct.barcode : newProduct.barcode}
            onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, barcode: e.target.value }) : setNewProduct({ ...newProduct, barcode: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div className="flex justify-end gap-2">
          {editingProduct ? (
            <>
              <motion.button
                onClick={handleUpdateProduct}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-4 h-4" /> Guardar Cambios
              </motion.button>
              <motion.button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <XCircle className="w-4 h-4" /> Cancelar
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" /> Añadir Producto
            </motion.button>
          )}
        </div>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-3">Tus Productos</h3>
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">No hay productos guardados. ¡Añade uno!</p>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-200"
              >
                <div className="flex-1 mr-4">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-600">Código: {product.barcode}</p>
                </div>
                <div className="flex gap-2">
                  {onSelectProduct && (
                    <motion.button
                      onClick={() => onSelectProduct(product)}
                      className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"
                      title="Seleccionar para Etiqueta"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-100 text-yellow-700 p-2 rounded-full hover:bg-yellow-200 transition-colors"
                    title="Editar"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-200 transition-colors"
                    title="Eliminar"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDataManager;