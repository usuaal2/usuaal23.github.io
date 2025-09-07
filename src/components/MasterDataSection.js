import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DataManager from './DataManager';
import ProductDataManager from './ProductDataManager';
import { User, Shield, Wrench, Package, Building, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

const MasterDataSection = ({
  clients, setClients,
  inspectors, setInspectors,
  supervisors, setSupervisors,
  operators, setOperators,
  machines, setMachines,
  products, setProducts,
  onSelectProduct,
  onSelectClient,
  onSelectInspector,
  onSelectSupervisor,
  onSelectOperator,
  onSelectMachine
}) => {

  const handleImportXLSX = (event, dataType) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        const formattedData = json.map(item => ({
          id: Date.now() + Math.random(), // Generar ID único
          name: item.Name || item.name || item.NOMBRE || item.nombre || '', // Intentar varias claves
          barcode: item.Barcode || item.barcode || item.CODIGO || item.codigo || '' // Para productos
        })).filter(item => item.name.trim() !== ''); // Filtrar entradas vacías

        switch (dataType) {
          case 'clients': setClients(prev => [...prev, ...formattedData]); break;
          case 'inspectors': setInspectors(prev => [...prev, ...formattedData]); break;
          case 'supervisors': setSupervisors(prev => [...prev, ...formattedData]); break;
          case 'operators': setOperators(prev => [...prev, ...formattedData]); break;
          case 'machines': setMachines(prev => [...prev, ...formattedData]); break;
          case 'products': setProducts(prev => [...prev, ...formattedData]); break;
          default: break;
        }
        alert(`Datos de ${dataType} importados con éxito.`);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const ImportButton = ({ dataType }) => (
    <div className="flex items-center space-x-2 mt-4">
      <input
        type="file"
        id={`import-${dataType}`}
        accept=".xlsx, .xls"
        onChange={(e) => handleImportXLSX(e, dataType)}
        className="hidden"
      />
      <label
        htmlFor={`import-${dataType}`}
        className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition-colors duration-200 text-sm"
      >
        <Upload className="w-4 h-4" />
        <span>Importar XLSX</span>
      </label>
    </div>
  );

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Datos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <DataManager
            title="Clientes"
            data={clients}
            setData={setClients}
            placeholder="Nombre del Cliente"
            icon={Building}
            onSelect={onSelectClient}
          />
          <ImportButton dataType="clients" />
        </div>
        <div>
          <DataManager
            title="Inspectores"
            data={inspectors}
            setData={setInspectors}
            placeholder="Nombre del Inspector"
            icon={Shield}
            onSelect={onSelectInspector}
          />
          <ImportButton dataType="inspectors" />
        </div>
        <div>
          <DataManager
            title="Supervisores"
            data={supervisors}
            setData={setSupervisors}
            placeholder="Nombre del Supervisor"
            icon={User}
            onSelect={onSelectSupervisor}
          />
          <ImportButton dataType="supervisors" />
        </div>
        <div>
          <DataManager
            title="Operadores"
            data={operators}
            setData={setOperators}
            placeholder="Nombre del Operador"
            icon={User}
            onSelect={onSelectOperator}
          />
          <ImportButton dataType="operators" />
        </div>
        <div>
          <DataManager
            title="Máquinas"
            data={machines}
            setData={setMachines}
            placeholder="Nombre de la Máquina"
            icon={Wrench}
            onSelect={onSelectMachine}
          />
          <ImportButton dataType="machines" />
        </div>
        <div>
          <ProductDataManager
            products={products}
            setProducts={setProducts}
            onSelectProduct={onSelectProduct}
          />
          <ImportButton dataType="products" />
        </div>
      </div>
    </motion.div>
  );
};

export default MasterDataSection;