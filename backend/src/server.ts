import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log('listagem de usuários');
  res.json({message: 'hello next level week'})
});

app.listen(3333);