import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const LabelForm = ({ formData, handleChange, handleImageUpload, handleSizeChange, handleFontChange, handleColorChange, handleLogoPositionChange, handleLogoSizeChange, handleBarcodePositionChange, handleBarcodeOrientationChange, handleProductIdentifierImageUpload, clients, inspectors, supervisors, operators, machines, products, handleLayoutChange }) => {
  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos y Estilo de la Etiqueta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="client" className={labelClasses}>Cliente:</label>
          <select
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Seleccionar Cliente</option>
            {clients.map(client => (
              <option key={client.id} value={client.name}>{client.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="inspector" className={labelClasses}>Inspector:</label>
          <select
            id="inspector"
            name="inspector"
            value={formData.inspector}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Seleccionar Inspector</option>
            {inspectors.map(inspector => (
              <option key={inspector.id} value={inspector.name}>{inspector.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={labelClasses}>Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="supervisor" className={labelClasses}>Supervisor:</label>
          <select
            id="supervisor"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Seleccionar Supervisor</option>
            {supervisors.map(supervisor => (
              <option key={supervisor.id} value={supervisor.name}>{supervisor.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="operator" className={labelClasses}>Operador:</label>
          <select
            id="operator"
            name="operator"
            value={formData.operator}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Seleccionar Operador</option>
            {operators.map(operator => (
              <option key={operator.id} value={operator.name}>{operator.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="machine" className={labelClasses}>Máquina:</label>
          <select
            id="machine"
            name="machine"
            value={formData.machine}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Seleccionar Máquina</option>
            {machines.map(machine => (
              <option key={machine.id} value={machine.name}>{machine.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="product" className={labelClasses}>Producto:</label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Seleccionar Producto</option>
            {products.map(product => (
              <option key={product.id} value={product.name}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="batchNumber" className={labelClasses}>Número de Lote:</label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Ej: LOTE-20240719-001"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="pantone" className={labelClasses}>Pantone:</label>
          <input
            type="text"
            id="pantone"
            name="pantone"
            value={formData.pantone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Ej: Pantone 185 C"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="customBarcode" className={labelClasses}>Código de Barras Personalizado (Numérico):</label>
          <input
            type="text"
            id="customBarcode"
            name="customBarcode"
            value={formData.customBarcode}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Ej: 123456789012"
          />
          <p className="text-xs text-gray-500 mt-1">Si lo dejas vacío, se generará automáticamente con los datos de arriba.</p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="labelSize" className={labelClasses}>Tamaño de Etiqueta:</label>
          <select
            id="labelSize"
            name="labelSize"
            value={formData.labelSize}
            onChange={handleSizeChange}
            className={inputClasses}
          >
            <option value="small">Pequeña (3x2 pulgadas)</option>
            <option value="medium">Mediana (4x3 pulgadas)</option>
            <option value="large">Grande (6x4 pulgadas)</option>
          </select>
        </div>

        <div>
          <label htmlFor="fontFamily" className={labelClasses}>Fuente del Texto:</label>
          <select
            id="fontFamily"
            name="fontFamily"
            value={formData.fontFamily}
            onChange={handleFontChange}
            className={inputClasses}
          >
            <option value="sans-serif">Predeterminada</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>
        <div>
          <label htmlFor="textColor" className={labelClasses}>Color del Texto:</label>
          <input
            type="color"
            id="textColor"
            name="textColor"
            value={formData.textColor}
            onChange={handleColorChange}
            className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="productIdentifierColor" className={labelClasses}>Color Identificador de Producto:</label>
          <input
            type="color"
            id="productIdentifierColor"
            name="productIdentifierColor"
            value={formData.productIdentifierColor}
            onChange={handleChange}
            className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="productIdentifierImageUpload" className={labelClasses}>Imagen Identificador de Producto (opcional):</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="productIdentifierImageUpload"
              accept="image/*"
              onChange={handleProductIdentifierImageUpload}
              className="hidden"
            />
            <label
              htmlFor="productIdentifierImageUpload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors duration-200"
            >
              <Upload className="w-5 h-5" />
              <span>Subir Imagen</span>
            </label>
            {formData.productIdentifierImage && (
              <span className="text-sm text-gray-600 truncate max-w-[150px]">{formData.productIdentifierImage.name}</span>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="logoUpload" className={labelClasses}>Logo (opcional):</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="logoUpload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors duration-200"
            >
              <Upload className="w-5 h-5" />
              <span>Subir Logo</span>
            </label>
            {formData.logo && (
              <span className="text-sm text-gray-600 truncate max-w-[150px]">{formData.logo.name}</span>
            )}
          </div>
        </div>

        {formData.logo && (
          <>
            <div>
              <label htmlFor="logoPosition" className={labelClasses}>Posición del Logo:</label>
              <select
                id="logoPosition"
                name="logoPosition"
                value={formData.logoPosition}
                onChange={handleLogoPositionChange}
                className={inputClasses}
              >
                <option value="top-left">Arriba Izquierda</option>
                <option value="top-right">Arriba Derecha</option>
                <option value="bottom-left">Abajo Izquierda</option>
                <option value="bottom-right">Abajo Derecha</option>
              </select>
            </div>
            <div>
              <label htmlFor="logoSize" className={labelClasses}>Tamaño del Logo:</label>
              <input
                type="range"
                id="logoSize"
                name="logoSize"
                min="20"
                max="150"
                value={formData.logoSize}
                onChange={handleLogoSizeChange}
                className="w-full h-10"
              />
              <span className="text-sm text-gray-500">{formData.logoSize}px</span>
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label htmlFor="barcodePosition" className={labelClasses}>Posición del Código de Barras:</label>
          <select
            id="barcodePosition"
            name="barcodePosition"
            value={formData.barcodePosition}
            onChange={handleBarcodePositionChange}
            className={inputClasses}
          >
            <option value="center">Centro</option>
            <option value="left">Izquierda</option>
            <option value="right">Derecha</option>
            <option value="top">Arriba</option>
            <option value="bottom">Abajo</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="barcodeOrientation" className={labelClasses}>Orientación del Código de Barras:</label>
          <select
            id="barcodeOrientation"
            name="barcodeOrientation"
            value={formData.barcodeOrientation}
            onChange={handleBarcodeOrientationChange}
            className={inputClasses}
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="layout" className={labelClasses}>Diseño de Etiqueta:</label>
          <select
            id="layout"
            name="layout"
            value={formData.layout}
            onChange={handleLayoutChange}
            className={inputClasses}
          >
            <option value="default">Predeterminado</option>
            <option value="compact">Compacto</option>
            <option value="minimal">Minimalista</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="quantity" className={labelClasses}>Cantidad de Etiquetas:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LabelForm;