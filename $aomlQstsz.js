const URLP = new URLSearchParams(window.location.search);
const $e = URLP.get('e');
if($e){
  console.log('@Drbrt sent e =>',$e,'// and it will work');
}
else{
  console.warn('@Drbrt sent no e =>',$e,'// so it won"t work');
}
