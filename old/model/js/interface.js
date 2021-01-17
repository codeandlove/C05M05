var $ = jQuery.noConflict();
$(document).ready(function(){
	
	var sw = $(window).width();
	var sh = $(window).height();
	
	$('.content').parent().css({
		'width':sw/2,
		'marginLeft':-sw/4,
		'height':sh/2,
		'marginTop':-sh/4
	});
	
	$('.settingsBtn').bind('click',function(){
		$('#settings').slideToggle();
	});
	$('.clockBtn').bind('click',function(){
		$('#timer').slideToggle();
	});
	
	$('.bar .close').bind('click',function(){
		$(this).parent().parent().slideToggle();
	})
	
	var tipWidth = 120;
	
	$('#settings').find('.backgroundSound').bind('click',function(){
		$(this).toggleClass('on');
		if(backgroundSoundEnabled==false){
			backgroundSoundEnabled = true;
		}else{
			backgroundSoundEnabled = false;
		}
	}).tipTip({maxWidth: tipWidth, edgeOffset: 10, content:'Turn on/off Background Sound'});
	
	$('#settings').find('.soundFx').bind('click',function(){
		$(this).toggleClass('on');
		if(soundFxEnabled==false){
			soundFxEnabled = true;
		}else{
			soundFxEnabled = false;
		}
	}).tipTip({maxWidth: tipWidth, edgeOffset: 10, content:'Turn on/off Sounds Fx'});
	
	$('#settings').find('.anaglyphEffect').bind('click',function(){
		$(this).toggleClass('on');
		if(anaglyphEnable==false){
			anaglyphEnable = true;
		}else{
			anaglyphEnable = false;
		}
	}).tipTip({maxWidth: tipWidth, edgeOffset: 10, content:'Turn on/off an Anaglyph 3D Effect'});
	
	$('#settings').find('.orbits').bind('click',function(){
		$(this).toggleClass('on');
		if(planetsOrbits==false){
			planetsOrbits = true;
		}else{
			planetsOrbits = false;
		}
	}).tipTip({maxWidth: tipWidth, edgeOffset: 10, content:'Turn on/off an Objects Orbits'});
	
	$('#settings').find('.selfOrbits').bind('click',function(){
		$(this).toggleClass('on');
		if(planetsSelfOrbits==false){
			planetsSelfOrbits = true;
		}else{
			planetsSelfOrbits = false;
		}
	}).tipTip({maxWidth: tipWidth, edgeOffset: 10, content:'Turn on/off an Objects self Orbits'});
	
	$('#settings').find('.fpc').bind('click',function(){
		$(this).toggleClass('on');
		if(firstPersonControlsEnable==false){
			firstPersonControlsEnable = true;
			trackBallControlsEnable = false;
		}else{
			firstPersonControlsEnable = false;
			trackBallControlsEnable = true;
		}
	}).tipTip({maxWidth: tipWidth, edgeOffset: 10, content:'Turn on/off an Fly Controls'});
	
	$('#settings').find('.fpc').bind('mouseenter',function(){
		$('#info').slideToggle();
	});
	
	$('#settings').find('.fpc').bind('mouseleave',function(){
		$('#info').slideToggle();
	});
	
	$('#settings').find('.objectTitles').bind('click',function(){
		$(this).toggleClass('on');
		if(namesEnable==false){
			showObiectNames();
		}else{
			hideObiectNames();
		}
	}).tipTip({maxWidth: tipWidth, edgeOffset: 10, content:'Turn on/off an Objects Titles'});
	
	$('#timer .faster').bind('click',function(){
		timeSpeed *=10;
		$("#timer .multiply span").html(timeSpeed+"x");
	});
	
	$('#timer .slower').bind('click',function(){
		timeSpeed *=1/10;
		$("#timer .multiply span").html(timeSpeed+"x");
	});
	
});