const express = require('express')
const app = express()



app.listen(8081, (error) => {
    if (error){
        console.log('Deu erro')
    }
    console.log('Deu certo')
})