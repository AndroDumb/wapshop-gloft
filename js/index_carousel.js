$(document).ready(function(){	

	var clearQueue = true;
	
	var imageSet 	   = $('#setList li').width() * 3;
	var totalImageSets = $('#setList li').width() * $('#setList li').size() - imageSet;
	
	function __animate(dir)
	{
		var iLeft = $('#setList').css('left').split('px');
			iLeft = parseInt( iLeft [0] );
		
		if ( dir == 'left' )
		{
			var dirb 	  = 'right';
			var condLeft  = (-1) * iLeft;
			var condRight = 0;
			var incr	  = '+=';
		}
		else if(dir == 'right')
		{
			var dirb 	  = 'left';
			var condLeft  = iLeft;
			var condRight = (-1) * totalImageSets;
			var incr	  = '-=';
		}
		
		if(condLeft <= condRight || (condLeft > 0 && condLeft <= 40))
		{
			$('.mouseover_' + dir).hide();
		}
		else
		{
			$('.mouseover_' + dir).unbind();
			$('.mouseover_' + dirb).show();

			var obj = {left: incr + imageSet + 'px'};

			$('#setList').stop(clearQueue).animate(obj, 300,
				function()
				{
					$('.mouseover_' + dir).bind('click', function(){ __animate(dir) });

					var iLeft = $('#setList').css('left').split('px');
						iLeft = parseInt( iLeft [0] );

					if ( dir == 'left' )
					{
						var condLeft  = (-1) * iLeft;
						var condRight = 0;
					}
					else if(dir == 'right')
					{
						var condLeft  = iLeft;
						var condRight = (-1) * totalImageSets;
					}
					
					if (condLeft <= condRight  || (condLeft > 0 && condLeft <= 40))
					{
						$('.mouseover_' + dir).hide();
					}
				});
		}		
			
	}
	
	$('.mouseover_left').click(function(){
		__animate('left');		
	});
	
	$('.mouseover_right').click(function(){
		__animate('right');
	});
	
});