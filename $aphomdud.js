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

setTimeout(()=>{
  if(true){
    console.log(document.cookie)
    if(getCok('$aphom')){
      window.login=(getCok('$aphom')=='$urd')?true:false;
      console.log('got $aphom');
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
  location.reload();
}
