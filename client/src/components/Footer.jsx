import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Единение</h2>
        </div>

        <div className="footer-info">
          <p>Адрес: г.Тольятти, ул.40 лет Победы, 94в</p>
          <p>Телефон: 8 (8482) 70-69-12, 70-69-13</p>
        </div>

        <div className="footer-links">
          <a href="/about">О компании</a>
          <a href="/services">Услуги</a>
          <a href="/contacts">Контакты</a>
        </div>

        <div className="footer-social">
          <a href="https://edinenie-tlt.ru/" aria-label="Facebook">
            Основной сайт
          </a>
          <a href="https://union-village.ru/" aria-label="Instagram">
            UnionVillage
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Строительная компания Единение. Все
          права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
