import styles from "./CountryItem.module.css";

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img
      className={styles.emoji}
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt="flag"
    />
  );
};

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      {flagemojiToPNG(country.emoji)}
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
