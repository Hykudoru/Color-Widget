//Generate colors when the document loads
var colors = [ 
	"#ddd", "#c0c0c0", "#999", "#555",
	"#cc00cc", "#a300cc", "#6300cc", "#4400cc",
	"#00bfff", "#0080ff", "#0040ff", "#0000ff",
	"#00ff00", "#00dd00", "#00bb00", "#009900",
	"#ffffb3", "#ffff00", "#fff200", "#ffe000",	
	"#ffbf00", "#ffb300", "#ff9000", "#ff6000",
	"#ff0000", "#e00000", "#cc0000", "#aa0000"				
	];		
for(var i=0; i < colors.length; i++) {
	$('#colortool').append($('<div>').css('background-color', colors[i]));
}


$(document).ready(function() {
	
	var changeColor = function(color, target) {
		$(target).css('background-color', color);
		$('#colorvalue').text(color);
	}
	
	var saveColor = function(target) {
		savedColor = $(target).css('background-color');
	}
	
	var resetColor = function() {
		changeColor(savedColor);
	}

	var target = '#object';
	var savedColor = $(target).css('background-color');

	$('#colortool > div').on({
		click: function() {
			saveColor(target);
			changeColor($(this).css('background-color'), target);
		},
		mouseenter: function() {
			changeColor($(this).css('background-color'), target);
		},
		mouseleave: function() {
			changeColor(savedColor, target);
		}
	});
	
});