function HTML(name) {
  const element = document.querySelector(name);
  return element ? element : null;
}

async function pageMove(page, time) {
  if (loader) {
    HTML('#loader').style.animation = 'show 1s ease';
    setTimeout(() => {
      window.location.href = page;
    }, time);
  } else {
    window.location.href = page;
  }
}

// 로그인 상태 설정
window.login = null;

function updateLoginState() {
  if (window.innerWidth > 768) {
    HTML('#mobileNavCover').style.visibility = 'hidden';
    HTML('#mobileNavCover').style.opacity = '0';
    if (login) {
      HTML('#logined').style.display = 'flex';
      HTML('#not-logined').style.display = 'none';
    } else {
      HTML('#logined').style.display = 'none';
      HTML('#not-logined').style.display = 'flex';
    }
  } else {
    HTML('#logined').style.display = 'none';
    HTML('#not-logined').style.display = 'none';

    if (login) {
      HTML('#mob-logined').style.display = 'flex';
      HTML('#mob-logined').style.flexDirection = 'column';
      HTML('#mob-not-logined').style.display = 'none';
    } else {
      HTML('#mob-logined').style.display = 'none';
      HTML('#mob-not-logined').style.display = 'flex';
    }
  }
}

const wawiter  = setInterval(()=>{
  if(window.login !== null){
    window.addEventListener("resize", updateLoginState);
    updateLoginState();
    clearInterval(wawiter);
  }
},10)
