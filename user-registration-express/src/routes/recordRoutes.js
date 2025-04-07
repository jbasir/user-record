const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const upload = require('../utils/multerConfig');

router.post('/registro', upload.single('comprobante_pago'), recordController.createRecord);
router.get('/registros', recordController.getRecords);

module.exports = router;