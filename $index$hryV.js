let C = {};

async function $NNN(what) {
  try {
    const response = await fetch('/test', {
      method: 'POST',
      headers: {
        vpz: 'vpfr',
        zptr: JSON.stringify({
          ycy: what,
        }),
      },
    });
    
    const data = await response.json(); 
    //console.log('$Drbrt res is', data);
    return data; 
  } catch (error) {
    //console.error('$^^Ryyqy is', error);
  }
}


function getC(type) {
  fetch('/getC', {
    method: 'POST',
    headers: {
      miz: 'max',
      yuqr: type,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('$Drbrt res of Cis', data);
      C = data;
      console.log(C);
      showC()
    })
    .catch((error) => console.error('$^^Ryyqy is', error));
}

async function postC(vpmt) {
  console.log(vpmt);
  try {
    fetch('/postC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vpmt , omgp: $$MMM,}) 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('$Drbrt res of Succ or Fail', data);
        getC()
      })
      .catch((error) => console.error('$^^Ryyqy is', error));
  } catch (error) {
    console.error('Error in $NNN:', error);
  }
}

async function likeC(num) {
  //console.log(vpmt);
  try {
    fetch('/likeC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ num:num , omgp: $$MMM,}) 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('$Drbrt res of Succ or Fail', data);
        getC();
      })
      .catch((error) => console.error('$^^Ryyqy is', error));
  } catch (error) {
    console.error('Error in $NNN:', error);
  }
}

async function delC(num) {
  //console.log(vpmt);
  try {
    fetch('/delC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ num:num , omgp: $$MMM,}) 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('$Drbrt res of Succ or Fail', data);
        getC();
      })
      .catch((error) => console.error('$^^Ryyqy is', error));
  } catch (error) {
    console.error('Error in $NNN:', error);
  }
}

function showC() {
  const cont = HTML('#contentListCover');
  while(HTML('.contentCover')){
    HTML('.contentCover').remove();
  }
  for (var i = Object.keys(C).length-1; i > -1; i--) {
    const c = C[Object.keys(C)[i]];
    const mentionRegex = /@[\w가-힣]+(?=\s|$)/g; // @로 시작하고 공백 또는 끝까지 포함되는 부분
    const contC = c.content.replace(mentionRegex, (match) => {
      return `<span class='mention'>${match}</span>`;
    });

    cont.innerHTML += `
    <div class="contentCover" id='content${i}'>
          <div class="contentUser">
            <img
              class="contentUserProf"
              src="${c.user.prof}"
              onerror="//this"
            />
            <div class="contentUserInfo">
              <div class="contentUserNick">#${c.user.nick}</div>
              <div class="contentUserTime">${c.time}</div>
            </div>
          </div>
          <div class="contentContent">
          ${contC}
          </div>
          <div class="contentTail">
            <div onclick = 'likeC(${i})'class="contentLike L${
              c.likeP.includes(client.Name) ? 1 : 0
            }">❤${c.like}</div>
            <div class="contentComButton">댓글${Object.keys(c.comment).length}</div>
            ${(c.user.name == client.Name)?`<div class="contentDel" onclick = 'delC(${i})'>삭제</div>`:''}
          </div>
        </div>
    `;
  }
}

getC();

/*
https://ifh.cc/g/y4oa3w.png
*/
