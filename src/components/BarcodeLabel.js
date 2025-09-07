import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileText } from 'lucide-react'; // Eliminado Printer

const BarcodeLabel = ({ formData, onSaveLabel }) => {
  const barcodeRef = useRef(null);
  const labelRef = useRef(null); // Ref para la etiqueta individual

  const barcodeValue = formData.customBarcode || [
    formData.supervisor,
    formData.operator,
    formData.machine,
    formData.product,
    formData.batchNumber
  ].filter(Boolean).join('-');

  useEffect(() => {
    if (barcodeRef.current && barcodeValue) {
      try {
        JsBarcode(barcodeRef.current, barcodeValue, {
          format: "CODE128",
          displayValue: true,
          fontSize: 16,
          height: 80,
          width: 2,
          margin: 10,
          background: "#ffffff",
          lineColor: "#000000"
        });
      } catch (error) {
        console.error("Error al generar el código de barras:", error);
      }
    }
  }, [barcodeValue, formData.barcodeOrientation]);

  const labelSizes = {
    small: { width: '300px', height: '200px', padding: '1.5rem' }, // Aumentado el padding
    medium: { width: '400px', height: '300px', padding: '2rem' }, // Aumentado el padding
    large: { width: '600px', height: '400px', padding: '2.5rem' } // Aumentado el padding
  };

  const currentSize = labelSizes[formData.labelSize] || labelSizes.medium;

  const getLogoPositionClass = (position) => {
    switch (position) {
      case 'top-left': return 'top-4 left-4';
      case 'top-right': return 'top-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      default: return 'top-4 left-4';
    }
  };

  const getBarcodeContainerStyle = (position, orientation) => {
    let style = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // Ajustar el tamaño del contenedor para que el SVG no se corte
      width: orientation === 'vertical' ? '100px' : 'auto', 
      height: orientation === 'vertical' ? 'auto' : '100px',
      zIndex: 10 // Asegurar que esté por encima del texto si se superpone
    };

    if (orientation === 'vertical') {
      style.transformOrigin = 'center center';
      style.transform = 'rotate(90deg)';
    }

    // Posicionamiento más preciso
    switch (position) {
      case 'center':
        style.top = '50%';
        style.left = '50%';
        style.transform += ' translate(-50%, -50%)';
        break;
      case 'left':
        style.left = '10px';
        style.top = '50%';
        style.transform += ' translateY(-50%)';
        break;
      case 'right':
        style.right = '10px';
        style.top = '50%';
        style.transform += ' translateY(-50%)';
        break;
      case 'top':
        style.top = '10px';
        style.left = '50%';
        style.transform += ' translateX(-50%)';
        break;
      case 'bottom':
        style.bottom = '10px';
        style.left = '50%';
        style.transform += ' translateX(-50%)';
        break;
      default:
        style.bottom = '10px';
        style.left = '50%';
        style.transform += ' translateX(-50%)';
    }
    return style;
  };

  const getLabelContentStyle = (layout) => {
    switch (layout) {
      case 'compact':
        return { fontSize: '0.75rem', lineHeight: '1rem', padding: '1rem' };
      case 'minimal':
        return { fontSize: '0.9rem', lineHeight: '1.25rem', padding: '1.5rem', justifyContent: 'flex-start', alignItems: 'flex-start' };
      default: // default
        return { fontSize: '0.875rem', lineHeight: '1.25rem', padding: '1.5rem' };
    }
  };

  const handleDownloadImage = async () => {
    if (!labelRef.current) return;

    const canvas = await html2canvas(labelRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null
    });

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `etiqueta-${formData.product || 'generica'}-${formData.batchNumber || 'sin-lote'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onSaveLabel(image);
  };

  const handleDownloadPdf = async () => {
    if (!labelRef.current) return;

    // Crear un contenedor temporal para renderizar las etiquetas fuera de la vista
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const a4Width = pdf.internal.pageSize.getWidth();
    const a4Height = pdf.internal.pageSize.getHeight();
    const margin = 5; // Margen en mm para cada etiqueta

    let currentX = margin;
    let currentY = margin;

    for (let i = 0; i < formData.quantity; i++) {
      // Clonar la etiqueta actual para renderizarla
      const clonedLabel = labelRef.current.cloneNode(true);
      
      // Asegurarse de que el SVG del código de barras se regenere en el clon
      const clonedBarcodeSvg = clonedLabel.querySelector('svg');
      if (clonedBarcodeSvg && barcodeValue) {
        try {
          JsBarcode(clonedBarcodeSvg, barcodeValue, {
            format: "CODE128",
            displayValue: true,
            fontSize: 16,
            height: 80,
            width: 2,
            margin: 10,
            background: "#ffffff",
            lineColor: "#000000"
          });
        } catch (error) {
          console.error("Error al generar el código de barras en clon:", error);
        }
      }
      
      tempContainer.appendChild(clonedLabel); // Añadir el clon al contenedor temporal

      const canvas = await html2canvas(clonedLabel, {
        scale: 2, // Mayor escala para mejor calidad de impresión
        useCORS: true,
        backgroundColor: null
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width * 0.264583; // Convert px to mm
      const imgHeight = canvas.height * 0.264583; // Convert px to mm

      // Verificar si la etiqueta cabe en la fila actual
      if (currentX + imgWidth + margin > a4Width) {
        currentX = margin; // Reiniciar X para la nueva fila
        currentY += imgHeight + margin; // Mover a la siguiente fila
      }

      // Verificar si la etiqueta cabe en la página actual
      if (currentY + imgHeight + margin > a4Height) {
        pdf.addPage(); // Añadir nueva página si no cabe
        currentX = margin;
        currentY = margin;
      }

      pdf.addImage(imgData, 'PNG', currentX, currentY, imgWidth, imgHeight);
      currentX += imgWidth + margin; // Mover X para la siguiente etiqueta
      
      tempContainer.removeChild(clonedLabel); // Eliminar el clon después de usarlo
    }

    document.body.removeChild(tempContainer); // Eliminar el contenedor temporal
    pdf.save(`etiquetas-${formData.product || 'generica'}-${formData.batchNumber || 'sin-lote'}.pdf`);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Vista Previa de la Etiqueta</h2>
      
      <motion.div
        ref={labelRef}
        className="bg-gray-50 border border-gray-200 rounded-lg shadow-inner flex flex-col justify-between items-center relative overflow-hidden"
        style={{
          width: currentSize.width,
          height: currentSize.height,
          fontFamily: formData.fontFamily,
          color: formData.textColor,
          ...getLabelContentStyle(formData.layout)
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {formData.logo && (
          <img
            src={formData.logo.preview}
            alt="Logo"
            className={`absolute ${getLogoPositionClass(formData.logoPosition)} object-contain`}
            style={{ maxWidth: `${formData.logoSize}px`, maxHeight: `${formData.logoSize}px` }}
          />
        )}

        {formData.productIdentifierColor && (
          <div
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: formData.productIdentifierColor }}
          ></div>
        )}
        {formData.productIdentifierImage && (
          <img
            src={formData.productIdentifierImage.preview}
            alt="Identificador de Producto"
            className="absolute top-4 right-4 w-10 h-10 object-contain"
          />
        )}

        <div className="flex flex-col items-center justify-center h-full w-full text-center" style={{ padding: currentSize.padding }}>
          <p className="text-sm mb-1">Cliente: <span className="font-semibold">{formData.client || 'N/A'}</span></p>
          <p className="text-sm mb-1">Inspector: <span className="font-semibold">{formData.inspector || 'N/A'}</span></p>
          <p className="text-sm mb-1">Fecha: <span className="font-semibold">{formData.date || 'N/A'}</span></p>
          <p className="text-sm mb-1">Supervisor: <span className="font-semibold">{formData.supervisor || 'N/A'}</span></p>
          <p className="text-sm mb-1">Operador: <span className="font-semibold">{formData.operator || 'N/A'}</span></p>
          <p className="text-sm mb-1">Máquina: <span className="font-semibold">{formData.machine || 'N/A'}</span></p>
          <p className="text-sm mb-1">Producto: <span className="font-semibold">{formData.product || 'N/A'}</span></p>
          <p className="text-sm mb-1">Lote: <span className="font-semibold">{formData.batchNumber || 'N/A'}</span></p>
          <p className="text-sm mb-4">Pantone: <span className="font-semibold">{formData.pantone || 'N/A'}</span></p>
          
          {barcodeValue ? (
            <div style={getBarcodeContainerStyle(formData.barcodePosition, formData.barcodeOrientation)}>
              <svg ref={barcodeRef} className="w-full h-full"></svg>
            </div>
          ) : (
            <p className="text-gray-500 italic mt-4">Ingresa datos o un código de barras para generar.</p>
          )}
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <motion.button
          onClick={handleDownloadImage}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-5 h-5" />
          <span>Guardar Imagen</span>
        </motion.button>
        <motion.button
          onClick={handleDownloadPdf}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="w-5 h-5" />
          <span>Descargar PDF ({formData.quantity})</span>
        </motion.button>
      </div>

      <p className="text-gray-600 text-sm mt-4">
        ¡Ahora sí, control total sobre tus etiquetas!
      </p>
    </motion.div>
  );
};

export default BarcodeLabel;