const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname), {
  setHeaders: function (res, filePath) {
    if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

let noneSaveData = {
  token: []
}
let saveData = {
  user:{}
}

const K = {
  NSD: noneSaveData,
  SD : saveData
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  console.log('▶ /' + ` (${req.ip})`);
});

app.post('/test', (req, res) => {
  let header = req.headers;
  let command = header['vpz'];
  let more = JSON.parse(header['zptr']);
  if (command === 'yplrm') {
    let type = parseInt(more.type);
    let num = parseInt(more.num);
    console.log('▶ API /test -> command-' + command + ';num-' + num + ` (${req.ip})`);
    res.json(BBBtoken(type, num));
  } 
  else if (command === 'yplrmR') {
    let token = parseInt(more.bsair);
    console.log('▶ API /test -> command-' + command + ';token-' + token + ` (${req.ip})`);
    if (K.NSD.token.includes(token)) {
      res.json('@div@');
    }
    else {
      res.json('K.NSD.@yplrmR@ !includes @bsair@');
    }
  }
  else if (command === 'vpfr') {
    let txt = parseInt(more.ycy);
    console.log('▶ API /test -> command-' + command + ';txt-' + txt + ` (${req.ip})`);
    res.json(BBBpass(txt));
  }
  else if (command === 'frvpfr') {
    let txt = parseInt(more.ycy);
    console.log('▶ API /test -> command-' + command + ';txt-' + txt + ` (${req.ip})`);
    res.json(BBBdepass(txt));
  }
  else {
    console.log('▶ API /test -> SUS' + ` (${req.ip})`);
    res.json('@?yrdy@ !work that');
  }
});

// 기타 함수들...
function random(min, max) {
  const time = Date.now();
  let seed = time ^ (time >> 3);
  seed = (seed * 9301 + 49297) % 233280;
  const randomValue = (seed / 233280) + Math.random();
  return Math.floor((randomValue % 1) * (max - min + 1)) + min;
}

function toggle(text, key) {
  let res = text;
  if (res.includes(key)) {
    while (res.includes(key)) {
      res = res.replace(key, '');
    }
  } else {
    res += key;
  }
  return res;
}

function BBBtoken(type, num) {
  if (num > 25) { return '@NNNyplrm@ !work num@.@25'; }
  let token = "";
  while (true) {
    for (var i = 0; i < num; i++) {
      token += random(0, 9);
    }
    if (!(K.NSD.token.includes(token))) { K.NSD.token.push(token); break; };
  }
  return token;
}

function BBBpass(value) {
  let result = '';
  let shift = random(50, 200);
  for (let i = 0; i < value.length; i++) {
    let charCode = value.charCodeAt(i);
    result += String.fromCharCode(charCode + shift);
  }
  let type = random(1, 3);
  if (type == 1) {
    return '0' + shift + 'a' + result;
  }
  if (type == 2) {
    return '1' + shift + '걃' + result;
  }
  if (type == 3) {
    return 'b' + shift + '늦' + result;
  }
}

function BBBdepass(value) {
  let codeType = value.match(/^0(\d+)a/) || value.match(/^1(\d+)걃/) || value.match(/^b(\d+)늦/);
  if (!codeType) {
    return '@NNNfrqsdd@ SUS';
  }

  let shift = parseInt(codeType[1]);
  value = value.substring(codeType[0].length);
  let result = '';
  for (let i = 0; i < value.length; i++) {
    let charCode = value.charCodeAt(i);
    result += String.fromCharCode(charCode - shift);
  }
  return result;
}

app.listen(3000, () => {
  console.log('▶▶ Running');
});

console.log(BBBpass('이 프로젝트는 바보상자크루에서 1인 개발되었습니다. This project was developed solo by BaBoBox Crew.'));
console.log(BBBdepass(BBBpass('이 프로젝트는 바보상자크루에서 1인 개발되었습니다. This project was developed solo by BaBoBox Crew.')));
