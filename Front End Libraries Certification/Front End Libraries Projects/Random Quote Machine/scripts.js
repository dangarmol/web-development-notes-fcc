const quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

let allQuotes = {};

$.getJSON(quotesURL, function(data) {
	allQuotes = data;
});

function getRandomQuote() {
	return allQuotes["quotes"][Math.floor(Math.random() * allQuotes.quotes.length)];
}

$("#new-quote").click(function(){
	const randQuote = getRandomQuote();
	$("#text").text(randQuote.quote);
	$("#author").text(randQuote.author);
});

$(document).ready(function() {
	const randQuote = getRandomQuote();
	$("#text").text(randQuote.quote);
	$("#author").text(randQuote.author);
});