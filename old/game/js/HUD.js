var sheld = 100;

function Hud(){

	$('#sheld .num').text(sheld);

	this.reduceSheld = function(){
			sheld -= 1;
			$('#sheld .num').text(sheld);

	}

}
