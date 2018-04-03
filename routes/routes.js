var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var exec = child_process.exec;

/* GET : "/rscript" */
router.get('/', (req, res) => {

    res.render( 'index', {
      title: 'hello world'
    } );

} );

/* POST : "/rscript" */
router.post('/', (req, res) => {
    var cmd = 'Rscript ./public/rscripts/graph.R';
    exec(cmd, (error, stdout, stderr) => {
        if(error) {
            console.error(error);
            return;
        }
        res.send('<object data="/pdf/a.pdf" type="application/pdf" width="100%" height="100%">'+
                  '<iframe src="/pdf/a.pdf" width="100%" height="100%" style="border: none;">'+
                  'This browser does not support PDFs. Please download the PDF to view it: <a href="/pdf/sample-3pp.pdf">Download PDF</a></iframe></object>');

    })
} );
module.exports = router;
