
// Функция проверки на палиндром:
function checkPalindrom(string) {
  const cleaned = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = cleaned.length - 1; i >= 0; i--) {
    reversed += cleaned[i];
  }
  return cleaned === reversed;
}

console.log(checkPalindrom('топот'));
