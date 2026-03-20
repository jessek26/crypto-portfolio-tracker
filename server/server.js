const express = require('express'); 
const {User, Holdings, sequelize} = require('./models/index')

//intiliazing express
const app = express();
app.use(express.json());

sequelize.sync().then(() => {
    console.log('database connected')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));