const express = require('express')
const bodyParser = require('body-parser');
const res = require('express/lib/response')
const app = express()
const port = 3000

app.use(bodyParser.json());

const products = [
    {
        "id": 1,
        "title": "Takki",
        "category": "Naisten vaatteet",
        "description": "Nahkatakki",
        "location": "Oulu",
        "price": "30.00",
        "date": "2022-02-24",
        "shipping": true,
        "pickup": true,
        "info": "Anna Annala, Pakkahuoneenkatu 11, Oulu, puh. 0405213361",
        "images1": "Kuva1",
        "images2": "Kuva2",
        "images3": "Kuva3"
      },

      {
        "id": 2,
        "title": "Piironki",
        "category": "Huonekalut",
        "description": "Puinen piironki",
        "location": "Kuusamo",
        "price": "55.00",
        "date": "2022-01-01",
        "shipping": false,
        "pickup": true,
        "info": "Kalle Kankkunen, Evakkotaipale 3, Kuusamo, puh. 050421365",
        "images1": "Kuva edestä",
        "images2": "Kuva takaa",
        "images3": "Kuva"
      }
];

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/products', (req, res) => {
    res.json(products);
        
})

app.get('/products/:id', (req, res)=> {

    let foundIndex = -1;
    for(let i = 0; i < products.length; i++) {
        if(products[i].id === parseInt(req.params.productsId)) {
            foundIndex = i;
            break;
        }

    }

    if(foundIndex === -1) {
        res.sendStatus (404);
    } else {
        res.json(products[foundIndex]);    
    }

    if(foundIndex === 1) {
        res.sendStatus (200);
    } else {
        res.json(products[foundIndex]);
        
    }

    
})

app.delete('/products/:productsId', (req,res) => {
    let foundIndex = products.findIndex(t=> t.id === parseInt(req.params.productsId));

    if(foundIndex ==-1) {
        res.sendStatus (404);
    } else {
        products.splice(foundIndex, 1);
        res.sendStatus(202)   
    }
})

app.post('/products', (req,res) => {
    console.log(req.body);
    res.sendStatus(202)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
