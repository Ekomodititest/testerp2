$(document).ready(function() {

var showText='Show';
var hideText='Hide';
var is_visible = false;
$('.toggle').prev().append(' <a href="#" class="toggleLink">'+showText+'</a>');
$('.toggle2').prev().append(' <a href="#" class="toggleLink2">'+hideText+'</a>');
$('.toggle').hide();
	$('a.toggleLink').click(function() {
		is_visible = !is_visible;
		if ($(this).text()==showText) {
		$(this).text(hideText);
		$(this).parent().next('.toggle').slideDown('slow');
		}
		else {
		$(this).text(showText);
		$(this).parent().next('.toggle').slideUp('slow');
		}
		return false;
	});
	$('a.toggleLink2').click(function() {
		is_visible = !is_visible;
		if ($(this).text()==showText) {
		$(this).text(hideText);
		$(this).parent().next('.toggle2').slideDown('slow');
		}
		else {
		$(this).text(showText);
		$(this).parent().next('.toggle2').slideUp('slow');
		}
		return false;
	});
});