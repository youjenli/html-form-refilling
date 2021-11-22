const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const onHeaders = require('on-headers');

/**
 * 為還原 express
 * @param {ReqBody} res 
 */
function scrubETag(res) {
    onHeaders(res, function(){
        this.removeHeader('ETag');
        this.removeHeader('Last-Modified');
        this.removeHeader('X-Powered-By');
        this.removeHeader('Accept-Ranges');

        this.removeHeader('Cache-Control');
        this.removeHeader('Expires');
        this.removeHeader('Pragma');
        
        this.removeHeader('Connection');
        this.removeHeader('Keep-Alive');
    });
}

app.get('/', function index(req, res){
    scrubETag(res);
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.post('/fixed-action', function fixedAction(req, res) {
    scrubETag(res);
    res.sendFile(path.join(__dirname, 'html/fixed-action.html'));
});

app.post('/modified-action', function modifiedAction(req, res) {
    scrubETag(res);
    res.sendFile(path.join(__dirname, 'html/modified-action.html'));
});

app.post('/detail', function detail(req, res) {
    scrubETag(res);
    res.sendFile(path.join(__dirname, 'html/detail.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});