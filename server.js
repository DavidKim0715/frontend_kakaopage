const express = require('express');
const path = require('path');

const app = express();
app.use(express.json()); // json 페이로드 구문을 분석한다 (body-parser 기반)
app.use('/static', express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, () =>
  console.log(
    '#################production server is running 3000....###########################'
  )
);
