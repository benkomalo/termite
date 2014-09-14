var NOT_WORD_CHAR = /[^\w]/;

var NEW_LINE = /\n/g;

var DUMB_URL_RE = /(https?:\/\/[^\s]+)/g;

var $div = $('<div/>');

function slowEscape(s) {
  return $div.text(s).html();
}

function buildLink(urlText) {
  var safeText = slowEscape(urlText);
  var l = safeText.length;
  if (safeText.lastIndexOf('.png') === l - 4 ||
      safeText.lastIndexOf('.jpg') === l - 4 ||
      safeText.lastIndexOf('.gif') === l - 4) {
    return '<img src="' + safeText + '">';
  } else {
    return '<a href="' + safeText + '">' + safeText + '</a>';
  }
}

function processText(textContent) {
  var sanitized = slowEscape(textContent);

  DUMB_URL_RE.lastIndex = 0;
  var results = [];
  var i = 0;
  var match;
  while (match = DUMB_URL_RE.exec(sanitized)) {
    var l = match[0].length;
    results.push(
        sanitized.substring(i, DUMB_URL_RE.lastIndex - l),
        buildLink(match[0]));
    i = DUMB_URL_RE.lastIndex;
  }
  results.push(sanitized.substring(i));
  return results.join('').replace(NEW_LINE, '<br>');
}

function processTermDefinition(el) {
  var $el = $(el);
  var contents = $el.text();
  var rawParts = contents.split('#');
  var results = [processText(rawParts[0])];

  for (var i = 1, part; part = rawParts[i]; i++) {
    var otherTerm;
    var end;
    if (part.indexOf('{') === 0) {
      end = part.indexOf('}');
      otherTerm = part.substring(1, end);

      // We don't care to include the brace itself
      end = end + 1;
    } else {
      end = part.search(NOT_WORD_CHAR);
      otherTerm = part.substring(0, end);
    }

    results.push(
        '<a class="term-link" href="/terms/search?query=' +
          slowEscape(encodeURIComponent(otherTerm)) + '">' +
        slowEscape(otherTerm) + '</a>',
        processText(part.substring(end)));
  }

  $el.html(results.join(''));
}

$(function() {
  $('.term-root .term-definition').each(function(i, el) {
    processTermDefinition(el);
  });

  $(document).on('page:load', function() {
    $('.term-root .term-definition').each(function(i, el) {
      processTermDefinition(el);
    });
  });
});
