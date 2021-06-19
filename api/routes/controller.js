const express = require('express')
const bodyParser = require('body-parser')
const Papa = require('papaparse')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const pdfMake = require("pdfmake/build/pdfmake")
const pdfFonts = require("pdfmake/build/vfs_fonts")
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const router = express.Router();

router.use(cors()) //Cross-Origin Resource Sharing (CORS)
router.use(bodyParser.urlencoded({
  limit: '50mb', extended: false
}))
router.use(bodyParser.json({ limit: '50mb' }))

//use router instead of app

router.get('/', (req, res) => {
  res.send('Awtomatikong pagbibilang ng granito.')
})



router.post('/SaveFile/:controlNumber', (req, res) => {
try {
  let controlNumber = req.params.controlNumber;
  var fonts = {
    Roboto: {
      normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
      bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
      italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
      bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
    }
  };

  // console.log(req.body)
  var PdfPrinter = require('pdfmake');
  var printer = new PdfPrinter(fonts);
  var docDefinition = req.body

  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(`\\\\kiso_svr\\PORCH GROUP FILES\\PORCH DESIGN TEAM FILES\\WALK IN HOME\\Back up of CSV for HACCHU system\\${controlNumber}.pdf`));
  pdfDoc.end();

  res.send('ok')}
catch(err){
  res.send(err)
}
})


router.post('/SaveTextFile/:controlNumber', (req, res) => {
  fs.writeFileSync(`\\\\kiso_svr\\PORCH GROUP FILES\\PORCH DESIGN TEAM FILES\\CSV for HACCHU system\\${req.params.controlNumber}.txt`, (req.body.text))
  res.send('ok')
})

// ========================== your routes here ==============================//


// ========================== your routes here ==============================//

module.exports = router;