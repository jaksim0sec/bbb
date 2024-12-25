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
  user:{
    'testID':{
      nick:'예시닉네임',
      prof:'https://ifh.cc/g/y4oa3w.png',
      name:'testID'
    }
  },
  comu:[

  ],
}

const K = {
  NSD: noneSaveData,
  SD : saveData
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  console.log('▶ /' + ` (${req.ip})`);
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
  console.log('▶ /login' + ` (${req.ip})`);
});

app.get('/reg', (req, res) => {
  res.sendFile(path.join(__dirname, 'reg.html'));
  console.log('▶ /reg' + ` (${req.ip})`);
});

app.get('/mypage', (req, res) => {
  res.sendFile(path.join(__dirname, 'mypage.html'));
  console.log('▶ /mypage' + ` (${req.ip})`);
});

app.post('/postC', (req, res) => {
  console.log('▶ /postC' + ` (${req.ip})`);
  let header = req.headers;
  let body = req.body;
  let token = body.omgp;
  let clientInfo = saveData.user[BBBdepass(token).replace('UP','')];
  if (!body || !body.vpmt) { 
    console.error('No $vpmt <- body');
    return res.status(400).json({ error: 'No $vpmt <- body' });
  }
  if(true){}
  //console.log('Received vpmt:', body.vpmt);
  saveData.comu.push(
    {
      user:{
        prof : clientInfo.prof,
        nick : clientInfo.nick,
        name: BBBdepass(token).replace('UP','')
      },
      time:'20**.**.**',
      content:body.vpmt,
      like:0,
      likeP:[],
      comment:[],
    }
  )
  res.json({ succOrfail: 'succ'});
});

app.post('/likeC', (req, res) => {
  console.log('▶ /likeC' + ` (${req.ip})`);
  let header = req.headers;
  let body = req.body;
  let token = body.omgp;
  let clientInfo = saveData.user[BBBdepass(token).replace('UP','')];
  let num = body.num;
  //console.log('num',num)
  if (!body || isNaN(body.num)) { 
    console.error('No $num <- body');
    return res.status(400).json({ error: 'No $num <- body' });
  }
  if(!saveData.comu[num].likeP.includes(BBBdepass(token).replace('UP',''))){
  saveData.comu[num].like++;
  saveData.comu[num].likeP.push(BBBdepass(token).replace('UP',''));
  }
  else{
  const where = saveData.comu[num].likeP.indexOf(BBBdepass(token).replace('UP',''));
  saveData.comu[num].like--;
  saveData.comu[num].likeP.splice(where,1);
  }
  res.json({ succOrfail: 'succ' });
});

app.post('/delC', (req, res) => {
  console.log('▶ /delC' + ` (${req.ip})`);
  let header = req.headers;
  let body = req.body;
  let token = body.omgp;
  let clientInfo = saveData.user[BBBdepass(token).replace('UP','')];
  let num = body.num;
  //console.log('num',num)
  if (!body || isNaN(body.num)) { 
    console.error('No $num <- body');
    return res.status(400).json({ error: 'No $num <- body' });
  }
  if(saveData.comu[num].user.name == BBBdepass(token).replace('UP','')){
    saveData.comu.splice(num,1);
    res.json({ succOrfail: 'succ' });
  }
  else{res.json({ succOrfail: 'fail : SUS action found' });}
});


app.post('/getC', (req, res) => {
  console.log('▶ /getC' + ` (${req.ip})`);
  let header = req.headers;
  let limit = header.miz;
  let type = header.yuqr;
  res.json(saveData.comu);
});

app.post('/getU', (req, res) => {
  console.log('▶ /delC' + ` (${req.ip})`);
  let header = req.headers;
  let body = req.body;
  let token = body.omgp;
  let clientInfo = saveData.user[BBBdepass(token).replace('UP','')];
  if(Object.keys(saveData.user).includes(BBBdepass(token).replace('UP',''))){
    res.json(clientInfo);
  }
  else{res.json({ succOrfail: 'fail : SUS action found' });}
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
    let txt = more.ycy;
    if (!isNaN(txt)) {
      console.log('▶ API /test -> Invalid number in ycy:', more.ycy);
      res.json({ error: 'Invalid ycy value' });
      return;
    }
    console.log('▶ API /test -> command-' + command + ';txt-' + txt + ` (${req.ip})`);
    res.json(BBBpass(txt));
  }
  else if (command === 'frvpfr') {
    let txt = more.ycy;
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
  //console.log('해독대상',value);
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
console.log(BBBdepass('1153걃îéčþČčâÝ'));
console.log(BBBdepass(BBBpass('이 프로젝트는 바보상자크루에서 1인 개발되었습니다. This project was developed solo by BaBoBox Crew.')));
