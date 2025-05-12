const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/account', accountRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
});

