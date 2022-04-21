const express = require('express');
const app = express();

app.use(express.static('frontend/build/'))

app.listen(4000, () => {
  console.log('App running on localhost:4000\nBalloon generator running on localhost:4003');
});
