const express = require('express')
const getProductData = require('get-product-name');
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

function sendError(res, err){
    res.statusCode = err
    res.end();
}

async function getProduct(res, productUrl){
    try{
        const productData = await getProductData(productUrl);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(productData));
    }catch (err) {
        sendError(res, 500)
    }
}

app.get('/', (req,res) => {
    sendError(res, 405)
})

app.post('/v1', (req, res) => {  
    const productUrl = req.body.productUrl

    //Check if ProductURL was sent
    if(productUrl === undefined || productUrl === ""){
        sendError(res, 418)
        return
    }
    
    getProduct(res, productUrl)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})