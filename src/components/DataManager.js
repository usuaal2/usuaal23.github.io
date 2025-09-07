import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash, Edit, User, Wrench, Package, Building, Search, Check, Save, XCircle } from 'lucide-react'; // Agregado Check, Save, XCircle

const DataManager = ({ title, data, setData, placeholder, icon: Icon, onSelect }) => {
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null); // { id, name }
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      setData(prev => [...prev, { id: Date.now(), name: newItem.trim() }]);
      setNewItem('');
    }
  };

  const handleUpdateItem = () => {
    if (editingItem && editingItem.name.trim()) {
      setData(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        {Icon && <Icon className="w-6 h-6 text-blue-500" />} {title}
      </h2>

      <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Añadir/Editar {title.slice(0, -1)}</h3>
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder={placeholder}
            value={editingItem ? editingItem.name : newItem}
            onChange={(e) => editingItem ? setEditingItem({ ...editingItem, name: e.target.value }) : setNewItem(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          {editingItem ? (
            <>
              <motion.button
                onClick={handleUpdateItem}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-4 h-4" /> Guardar
              </motion.button>
              <motion.button
                onClick={() => setEditingItem(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <XCircle className="w-4 h-4" /> Cancelar
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" /> Añadir
            </motion.button>
          )}
        </div>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder={`Buscar ${title.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-3">Lista de {title}</h3>
      {filteredData.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">No hay {title.toLowerCase()} guardados.</p>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-200"
              >
                <span className="font-medium text-gray-800 flex-1 mr-4">{item.name}</span>
                <div className="flex gap-2">
                  {onSelect && (
                    <motion.button
                      onClick={() => onSelect(item.name)}
                      className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"
                      title="Seleccionar"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => setEditingItem(item)}
                    className="bg-yellow-100 text-yellow-700 p-2 rounded-full hover:bg-yellow-200 transition-colors"
                    title="Editar"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteItem(item.id)}
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

export default DataManager;