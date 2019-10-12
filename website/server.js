const express = require('express');
const port = 3000;
const app = express();

app.use('/report', express.static('./'))

app.listen(port, function(){
    console.log("Serving at ",port)
})