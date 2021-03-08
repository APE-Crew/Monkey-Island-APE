// fileversion 0.5.0 | 2021-03-04
export const get_int_rand = (min: number, max: number): number => Math.random() * (max - min) + min;
export const get_float_rand = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
export const get_rand_rositve_or_negative = (number: number) =>
  Math.random() > 0.5 ? number : -number;

export const get_padded_number = (number: number, digitsCount: number, z = "0"): string =>
  String(number).length >= digitsCount
    ? String(number)
    : new Array(digitsCount - String(number).length + 1).join(z) + number;

/* 

// TODO:


generiert ein array mit werten zwischen min und max 
  const min = minIn || 1;
  const max = maxIn || 100;
  const numbersArray = [];
  for (var i = min; numbersArray.push(i++) < max - min + 1; );
  return numbersArray;

//---------------------------------------------------------------------------
function pad(n, width, z) {
füllt eine zahl mit führungsnullen auf 
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
//---------------------------------------------------------------------------
function secondsToTime(secs) {
rechnet sekunden in hms um ... liefert ein ojekt mit den entsprechenden attributen 
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}
//---------------------------------------------------------------------------


*/
