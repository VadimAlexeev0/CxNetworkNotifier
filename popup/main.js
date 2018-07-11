$(function() {
	$('.website').click(function() {
		chrome.tabs.create({url: "https://www.iceposeidon.com/"});
	});
	$('.reddit').click(function() {
		chrome.tabs.create({url: "https://www.reddit.com/r/Ice_Poseidon/"});
	});
	$('.openOptions').click(function() {
		chrome.runtime.openOptionsPage();
	});
});