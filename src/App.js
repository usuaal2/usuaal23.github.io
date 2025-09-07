import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LabelForm from './components/LabelForm';
import BarcodeLabel from './components/BarcodeLabel';
import ProductDataManager from './components/ProductDataManager';
import TemplateManager from './components/TemplateManager';
import MasterDataSection from './components/MasterDataSection';
import { Home, Settings } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    client: '',
    inspector: '',
    date: new Date().toISOString().slice(0, 10),
    supervisor: '',
    operator: '',
    machine: '',
    product: '',
    batchNumber: '',
    pantone: '',
    customBarcode: '',
    labelSize: 'medium',
    logo: null,
    logoPosition: 'top-left',
    logoSize: 80,
    fontFamily: 'sans-serif',
    textColor: '#000000',
    productIdentifierColor: '#FFFFFF',
    productIdentifierImage: null,
    barcodePosition: 'bottom',
    barcodeOrientation: 'horizontal',
    layout: 'default', // Nuevo estado para el diseño de la etiqueta
    quantity: 1
  });
  const [savedLabels, setSavedLabels] = useState([]);
  const [products, setProducts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [clients, setClients] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [operators, setOperators] = useState([]);
  const [machines, setMachines] = useState([]);

  const [activeSection, setActiveSection] = useState('labelCreator');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSizeChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      labelSize: e.target.value
    }));
  };

  const handleFontChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      fontFamily: e.target.value
    }));
  };

  const handleColorChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      textColor: e.target.value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        logo: {
          file: file,
          preview: URL.createObjectURL(file)
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        logo: null
      }));
    }
  };

  const handleProductIdentifierImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        productIdentifierImage: {
          file: file,
          preview: URL.createObjectURL(file)
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        productIdentifierImage: null
      }));
    }
  };

  const handleLogoPositionChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      logoPosition: e.target.value
    }));
  };

  const handleLogoSizeChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      logoSize: parseInt(e.target.value)
    }));
  };

  const handleBarcodePositionChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      barcodePosition: e.target.value
    }));
  };

  const handleBarcodeOrientationChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      barcodeOrientation: e.target.value
    }));
  };

  const handleLayoutChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      layout: e.target.value
    }));
  };

  const handleSaveLabel = (imageDataUrl) => {
    const newLabel = {
      id: Date.now(),
      data: { ...formData },
      image: imageDataUrl
    };
    setSavedLabels(prevLabels => [...prevLabels, newLabel]);
    alert('¡Etiqueta guardada con éxito!');
  };

  const handleSelectProduct = (product) => {
    setFormData(prevData => ({
      ...prevData,
      product: product.name,
      customBarcode: product.barcode
    }));
  };

  const handleApplyTemplate = (templateData) => {
    setFormData(templateData);
    alert('¡Plantilla aplicada!');
  };

  const handleSelectClient = (clientName) => {
    setFormData(prevData => ({ ...prevData, client: clientName }));
  };
  const handleSelectInspector = (inspectorName) => {
    setFormData(prevData => ({ ...prevData, inspector: inspectorName }));
  };
  const handleSelectSupervisor = (supervisorName) => {
    setFormData(prevData => ({ ...prevData, supervisor: supervisorName }));
  };
  const handleSelectOperator = (operatorName) => {
    setFormData(prevData => ({ ...prevData, operator: operatorName }));
  };
  const handleSelectMachine = (machineName) => {
    setFormData(prevData => ({ ...prevData, machine: machineName }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="container mx-auto max-w-6xl">
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-900 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Etiquetas
        </motion.h1>

        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={() => setActiveSection('labelCreator')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 ${
              activeSection === 'labelCreator' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" /> Creador de Etiquetas
          </motion.button>
          <motion.button
            onClick={() => setActiveSection('masterData')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 ${
              activeSection === 'masterData' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5" /> Datos Maestros
          </motion.button>
        </div>

        {activeSection === 'labelCreator' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <LabelForm
                  formData={formData}
                  handleChange={handleChange}
                  handleImageUpload={handleImageUpload}
                  handleProductIdentifierImageUpload={handleProductIdentifierImageUpload}
                  handleSizeChange={handleSizeChange}
                  handleFontChange={handleFontChange}
                  handleColorChange={handleColorChange}
                  handleLogoPositionChange={handleLogoPositionChange}
                  handleLogoSizeChange={handleLogoSizeChange}
                  handleBarcodePositionChange={handleBarcodePositionChange}
                  handleBarcodeOrientationChange={handleBarcodeOrientationChange}
                  handleLayoutChange={handleLayoutChange}
                  clients={clients}
                  inspectors={inspectors}
                  supervisors={supervisors}
                  operators={operators}
                  machines={machines}
                  products={products}
                />
              </div>
              <div>
                <BarcodeLabel formData={formData} onSaveLabel={handleSaveLabel} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <ProductDataManager products={products} setProducts={setProducts} onSelectProduct={handleSelectProduct} />
              <TemplateManager templates={templates} setTemplates={setTemplates} formData={formData} onApplyTemplate={handleApplyTemplate} />
            </div>

            {savedLabels.length > 0 && (
              <motion.div
                className="mt-12 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Etiquetas Guardadas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {savedLabels.map(label => (
                    <motion.div
                      key={label.id}
                      className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={label.image} alt="Etiqueta Guardada" className="w-full h-auto object-contain mb-2" />
                      <p className="text-sm font-medium text-gray-700">{label.data.product || 'Producto Desconocido'}</p>
                      <p className="text-xs text-gray-500">Lote: {label.data.batchNumber || 'N/A'}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {activeSection === 'masterData' && (
          <MasterDataSection
            clients={clients} setClients={setClients} onSelectClient={handleSelectClient}
            inspectors={inspectors} setInspectors={setInspectors} onSelectInspector={handleSelectInspector}
            supervisors={supervisors} setSupervisors={setSupervisors} onSelectSupervisor={handleSelectSupervisor}
            operators={operators} setOperators={setOperators} onSelectOperator={handleSelectOperator}
            machines={machines} setMachines={setMachines} onSelectMachine={handleSelectMachine}
            products={products} setProducts={setProducts} onSelectProduct={handleSelectProduct}
          />
        )}

        <motion.p
          className="text-center text-gray-500 mt-12 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          ¡Ahora puedes crear etiquetas tan únicas como tú! (O al menos como tus productos).
        </motion.p>
      </div>
    </div>
  );
}