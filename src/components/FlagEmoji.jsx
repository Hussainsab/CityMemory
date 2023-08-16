export function Flagemoji({ flag, emojiStyle }) {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img
      className={emojiStyle}
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt="flag"
    />
  );
}
