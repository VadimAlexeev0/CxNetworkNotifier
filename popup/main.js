$(function() {
	$('.website').click(function() {
		chrome.tabs.create({url: "https://www.iceposeidon.com/"});
	});
	$('.reddit').click(function() {
		chrome.tabs.create({url: "https://www.reddit.com/r/Ice_Poseidon/"});
	});
	$('.changelog').click(function() {
		chrome.tabs.create({url: chrome.extension.getURL("changelog/changelog.html")})
	});
	$('.openOptions').click(function() {
		chrome.runtime.openOptionsPage();
	});
});