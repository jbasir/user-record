// Email validation using Regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Name validation (minimum 3 characters)
function isValidName(name) {
    return typeof name === 'string' && name.length >= 3;
}

// Receipt type validation
function isValidReceiptType(type) {
    const validOptions = ['Factura', 'CFF', 'Ticket'];
    return validOptions.includes(type);
}

// Payment method validation
function isValidPayMethod(method) {
    const validOptions = ['Efectivo', 'Transferencia', 'Tarjeta'];
    return validOptions.includes(method);
}

// Complete validation for registration
function validateRegistration(req) {
    const { nombre, email, mensaje, tipo_comprobante, metodo_pago } = req.body;
    const comprobante_pago = req.file ? req.file.path : null;
  
    if (!isValidName(nombre)) {
      return { success: false, error: 'The name must have at least 3 characters' };
    }
  
    if (!isValidEmail(email)) {
      return { success: false, error: 'The email format is not valid.' };
    }
  
    if (!isValidPayMethod(metodo_pago)) {
      return { success: false, error: 'Invalid payment method. Options: Cash, Transfer, or Card' };
    }
  
    if (!isValidReceiptType(tipo_comprobante)) {
      return { success: false, error: 'Invalid receipt type. Options: Invoice, CFF, or Ticket' };
    }
  
    if (metodo_pago === 'Transferencia' && !comprobante_pago) {
      return { success: false, error: 'Proof of transfer is required' };
    }
  
    return { success: true };
  }

module.exports = {
    isValidEmail,
    isValidName,
    isValidReceiptType,
    isValidPayMethod,
    validateRegistration
};