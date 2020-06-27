import express from 'express';

import db from './models';

const app = express();
const port = process.env.SERVER_PORT || 3000;
const winner = {
  id: '1',
  name: 'Dayana Morente',
  document: '22400119818',
  code: '48859',
}

app.get('**', (req, res) => res.json(winner));

app.listen(port, () => console.log(`App listening on port ${port}`));
