export function hex_to_ascii(inputString)
 {
	var hex  = inputString.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }


 export function ascii_to_hex(inputString)
  {
	var arr1 = [];
	for (var n = 0, l = inputString.length; n < l; n ++) 
     {
		var hex = Number(inputString.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
   }