import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { Flagemoji } from "./FlagEmoji";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <div className={styles.cityItemChild}>
          {<Flagemoji flag={emoji} emojiStyle={styles.emoji} />}
          <h3 className={styles.cityName}>{cityName}</h3>
        </div>
        <div className={styles.cityItemChild}>
          <time className={styles.date}>{formatDate(date)}</time>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            &times;
          </button>
        </div>
      </Link>
    </li>
  );
};

export default CityItem;
