require('dotenv').config();
const authRouter = require('./routes/auth')
const holdingRouter = require('./routes/holdings');
const pricesRouter = require('./routes/prices');
const express = require('express'); 
const {User, Holdings, sequelize} = require('./models/index');
const cors = require('cors');

//intiliazing express
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://your-vercel-url.vercel.app'
}));

app.use('/api/auth', authRouter);
app.use('/api/holdings', holdingRouter)
app.use('/api/prices', pricesRouter);

sequelize.sync().then(() => {
    console.log('database connected')
})

const PORT = process.env.PORT || 3000;
if(process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`server running on ${PORT}`))
}

app.listen(PORT, () => console.log(`server running on ${PORT}`));

module.exports = app; 