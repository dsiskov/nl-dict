export function hex_to_ascii(inputString) {
  var hex = inputString.toString();
  var str = "";
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

export function ascii_to_hex(inputString) {
  var arr1 = [];
  for (var n = 0, l = inputString.length; n < l; n++) {
    var hex = Number(inputString.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}

function CreateWordMeaning(meaning, example, useCases, synonym) {
  return {
    meaning,
    example,
    useCases,
    synonym
  };
}

export function parseInnerHTML(str) {
  const term_regex = /<H1>(.*)<\/H1>/m;
  const term_func_regex = /<i>(.*)<\/i>/m;
  const definers_regex = /<DD>((.|\n)*)<BR>((.|\n)*)<\/DL>/gmui;
  const synonym_regex = />([a-zA-Z]+)<\/A>/gm;

  let term = getFirstMatch(str, term_regex);
  let term_syntactic_role = getFirstMatch(str, term_func_regex);
  let definers_match = getFirstMatch(str, definers_regex);
  let definers = definers_match? definers_match.split("<BR>\n") : [];
  let meaning_paragraph = str.split("\n\n")[1];
  let meaning_paragraph_per_line =meaning_paragraph? meaning_paragraph.split("\n").slice(1, -1) : [];
  let meanings = [];
  for (let index = 0; index < meaning_paragraph_per_line.length; index++) {
    const line = meaning_paragraph_per_line[index];
    if (line.startsWith("<LI><STRONG>")) {
      const definition = line
        .split("<LI><STRONG>")[1]
        .split("</STRONG><BR>")[0];
      const example = meaning_paragraph_per_line[index + 1]
        .split("vb: ")[1]
        .split("<BR>");

      let useCasesScope = false;
      // TODO still need to trim the elements
      let useCases = [];
      let synonyms = [];
      for (
        let cursor = index + 2;
        cursor < meaning_paragraph_per_line.length;
        cursor++
      ) {
        const element = meaning_paragraph_per_line[cursor];
        if (!useCasesScope && element.startsWith("<OL>")) {
          useCasesScope = true;
        } else if (!useCasesScope && element.startsWith("synoniemen:")) {
          synonyms.push(getEveryMatch(element, synonym_regex));
          break;
        } else if (useCasesScope && element.startsWith("</OL>")) {
          useCasesScope = false;
          //   useCases = [];
          // break;
        } else if (useCasesScope) {
          useCases.push(element);
        }
      }
      meanings.push(CreateWordMeaning(definition, example, useCases, synonyms));
    }
  }
  return {
	  term,
	  term_syntactic_role,
	  definers,
	  meanings
  }
}

function getFirstMatch(str, regex_obj) {
  let m;
  if ((m = regex_obj.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    // the first group m[0] is the original string
    return m[1];
  }
}

function getEveryMatch(str, regex_obj) {
  let result = [];
  let m;
  while ((m = regex_obj.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    // the first group m[0] is the original string
    result.push(m[1]);
  }
  return result;
}
