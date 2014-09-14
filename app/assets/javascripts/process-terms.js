var NOT_WORD_CHAR = /[^\w]/;

var NEW_LINE = /\n/g;


function processNewlines(textContent) {
  return textContent.replace(NEW_LINE, '<br>');
}

function processTermDefinition(el) {
  var $el = $(el);
  var contents = $el.text();
  var rawParts = contents.split('#');
  var results = [processNewlines(rawParts[0])];

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
          encodeURIComponent(otherTerm) + '">' +
        otherTerm + '</a>',
        processNewlines(part.substring(end)));
  }

  $el.html(results.join(''));
}

$(function() {
  $(".term-root .term-definition").each(function(i, el) {
    processTermDefinition(el);
  });
});
