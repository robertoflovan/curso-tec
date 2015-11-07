
(function(){
	var myLatlng = new google.maps.LatLng(25.426694, -100.995402);
var mapOptions = {
  zoom: 14,
  center: myLatlng
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
});


marker.setMap(map);


var btnpopup = document.getElementById('btnpopup');
var popup = document.getElementById('popup');
var closePopup = document.getElementById('closePopup');

btnpopup.addEventListener('click', onClickPopup);
closePopup.addEventListener('click', onClickPopup)


function onClickPopup(){
	popup.classList.toggle('Popup--visible');
}
/*function onClickClose(){
	popup.classList.remove('popup--visible');
}*/

})();














      /*function tipo1(){
	console.log("function tipo 1")
}

tipo1();

var tipo2 = function(){
	console.log("function tipo 2");
}

tipo2();*/