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

export function parseInnerHTML() {
  const term_regex = /<H1>(.*)<\/H1>/m;
  const term_func_regex = /<i>(.*)<\/i>/m;
  const str = `"<H1>saai </H1>
<i>bijvoeglijk naamwoord</i>

<OL>
<LI><STRONG>gewoon, niet bijzonder</STRONG><BR>
vb: haar uitstraling is een beetje saai<BR>
<OL>
<LI>een saaie piet
 <i>[een saai persoon]</i><BR>
</OL>
synoniemen: <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_D/W538.HTM');">dagelijks</A> <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_K/W9457.HTM');">kleurloos</A><BR>
<LI><STRONG>zonder afwisseling</STRONG><BR>
vb: er gebeurt weinig in dit verhaal, het is erg saai<BR>
synoniemen: <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_E/W690.HTM');">eentonig</A> <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_D/W4919.HTM');">duf</A> <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_D/W8644.HTM');">doods</A> <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_D/W8664.HTM');">dor</A> <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_M/W9967.HTM');">monotoon</A><BR>
</OL>


<STRONG>Meer informatie bij:</STRONG><BR>
<A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_A/W6238.HTM');">afwisseling</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_B/W218.HTM');">beetje</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_B/W354.HTM');">bijzonder</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_D/W609.HTM');">dit</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_E/W3422.HTM');">er</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_H/W3508.HTM');">het</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_I/W1119.HTM');">in</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_P/W1965.HTM');">persoon</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_U/W10670.HTM');">uitstraling</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_V/W2722.HTM');">verhaal</A>  <A href="javascript:void(0);" onclick="javascript:getWordByPad('LTR_Z/W3131.HTM');">zonder</A>
<DL>
<DT><STRONG>Bijvoeglijk naamwoord</STRONG>: saai
<DD>... is saaier dan ...<BR>
het saaist<BR>
de/het saaie ...<BR>
iets saais<BR>
</DL>
<A id='copyright' HREF="//www.numo.nl">Numo Woordenboek &copy; 2018</A>
"`;
  let term = getFirstMatch(str, term_regex);
  let term_func = getFirstMatch(str, term_func_regex);

}

function getFirstMatch(str, regex_obj) {
  let m;
  if ((m = regex_obj.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    // the first group m[0] is the original string
    console.log(`Found Header ${m[1]}`);
    return m[1];
  }
}
