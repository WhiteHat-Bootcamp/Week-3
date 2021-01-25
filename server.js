const express = require ('express');

const app = express();
const port = 3000; 

//serve static assets from the public/ folder
app.use(express.static('public'));

app.listen(port, ()=> {
    console.log(`Server listening at http://localhost:${port}`);
});




