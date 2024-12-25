//console.log(document.cookie);
/*const waiter2 = setInterval(()=>{
  //console.log(document.cookie?true:false)
  if(true){
    if(document.cookie.includes('$aphom')){
      window.login=(getCok('$aphom')=='$urd')?true:false;
      console.log('got $aphom')
    }
    else{
      console.warn('Cok"s $aphom = New');
      setCok2('$aphom=$mp;');
      console.log('new Cok"s $aphom = $mp // $vjrvl = ',document.cookie);
    }
    console.log('$aphom is ',window.login);
    clearInterval(waiter2);
  }
},10)*/

let client = {Nick : '', Prof : '', Name : 'testID'}
let $$MMM = null;

setTimeout(async function(){
  if(true){
    console.log(document.cookie)
    if(getCok('$aphom')){
      window.login=(getCok('$aphom')=='$urd')?true:false;
      console.log('got $aphom');
      if(localStorage.getItem('$$uqatz')){$$MMM = localStorage.getItem('$$uqatz')}
      if(login == true){
        const fakeInfo = await getU();
        //console.log(fakeInfo)
        client.Nick = fakeInfo.nick;
        client.Name = fakeInfo.name;
        client.Prof = fakeInfo.prof;
      }
    }
    else{
      console.warn('Cok"s $aphom = New');
      if (!getCok('$aphom')) {
        //setCok2('$aphom=$mp;',5000);
        document.cookie='$aphom=$mp;path=/;max-age:5000';
      }      
      console.log('new Cok"s $aphom = $mp // $vjrvl = ',document.cookie);
    }
    console.log('$aphom is ',window.login);
    //clearInterval(waiter2);
  }
},50);

function $aphpiy(){
  document.cookie='$aphom=$mp;path=/;max-age:5000';
  localStorage.removeItem('$$uqatz');
  location.reload();
}

async function getU() {
  try {
    const response = await fetch('/getU', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ omgp: '0157aòíđĂĐđæá' }),
    });

    const data = await response.json(); 
    return data; 
  } catch (error) {
    console.error('Error in getU:', error);
  }
}
