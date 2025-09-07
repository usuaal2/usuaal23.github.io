import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, LayoutDashboard, Trash } from 'lucide-react';

const TemplateManager = ({ templates, setTemplates, formData, onApplyTemplate }) => {
  const [templateName, setTemplateName] = useState('');

  const handleSaveTemplate = () => {
    if (templateName.trim()) {
      setTemplates(prev => [...prev, { id: Date.now(), name: templateName, data: formData }]);
      setTemplateName('');
      alert('¡Plantilla guardada!');
    }
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6 text-purple-500" /> Gestión de Plantillas
      </h2>
      
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Nombre de la Plantilla"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <motion.button
          onClick={handleSaveTemplate}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save className="w-5 h-5" /> Guardar
        </motion.button>
      </div>

      {templates.length > 0 ? (
        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
          {templates.map(template => (
            <motion.div
              key={template.id}
              className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-medium text-gray-800">{template.name}</span>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => onApplyTemplate(template.data)}
                  className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Aplicar
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No hay plantillas guardadas. ¡Guarda una!</p>
      )}
    </motion.div>
  );
};

export default TemplateManager;