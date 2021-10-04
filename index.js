const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


  async function makeRequest(url) {

    const config = {
        method: 'get',
        url,
    }

    let res = await axios(config)

     // console.log(res.data);
    return res.data
  }

  app.get('/', (req,res) => { 
    console.log('ok') 
    res.status(200).end('hello')
  })

  const findByName = (data, str) => {}

  app.post('/makeRequest', async (req,res) => { 
    console.log(req.body.search)
    makeRequest('https://swapi.dev/api/')
      .then((response) => { 
        const requests = Object.values(response).map(url => makeRequest(`${url}/?search=${req.body.search}`))
        console.log(requests)
        return Promise.all(requests)
      })
      .then((peoples) => {
        //const results = findByName(peoples, 'L')
        //console.log(peoples)
        res.status(200).json(peoples)
      })
      .catch((message) => res.status(500).json({ error: true, message }))
    
  })

app.listen(8080, () => {
  console.log("Serveur à l'écoute")
})