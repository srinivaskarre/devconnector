const express = require('express');
const connection = require('./config/persistenceEngine');

const app = express();
//initi DB connection
connection();

//body parser middleware
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(
    `Server started running on port ${PORT}, workloads are accepted!!`
  );
});

app.get('/ping', (req, res) => {
  res.json({ working: 'true' });
});
