import React from "react";
import { useNavigate } from "react-router-dom";
import "../ui.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-wrapper">
      <div className="about-hero">
        <h1 className="about-title-large">Цветы без мишуры</h1>
        <p className="about-subtitle">Только свежие охапки. Никакой упаковки.</p>
      </div>

      <div className="about-manifesto">
        <p>
          «Мы верим, что цветы прекрасны сами по себе. Им не нужны ленты и пёстрые упаковочные пленки.
          Мы убрали всё лишнее, чтобы вы покупали только свежесть и красоту»
        </p>
      </div>

      <div className="about-grid">
        <div className="about-feature">
          <div className="about-feature-icon">🌿</div>
          <div className="about-feature-content">
            <h3>Просто</h3>
            <p>Никаких салонов и флористов. Только свежие цветы.</p>
          </div>
        </div>
        <div className="about-feature">
          <div className="about-feature-icon">💸</div>
          <div className="about-feature-content">
            <h3>Низкие цены</h3>
            <p>Нам не нужно содержать штат людей, долго хранить цветы и платить за аренду магазинов.</p>
          </div>
        </div>
        <div className="about-feature">
          <div className="about-feature-icon">⚡️</div>
          <div className="about-feature-content">
            <h3>Свежо</h3>
            <p>Поставки каждый день. Цветы не стоят в витринах, ожидая покупателя.</p>
          </div>
        </div>
      </div>

      <div className="journey-section">
        <h3 className="journey-title">Путь вашей охапки</h3>
        <div className="journey-steps">
          <div className="journey-step">
            <div className="journey-icon">1</div>
            <span className="journey-label">Заказ</span>
          </div>
          <div className="journey-step">
            <div className="journey-icon">2</div>
            <span className="journey-label">Сборка</span>
          </div>
          <div className="journey-step">
            <div className="journey-icon">3</div>
            <span className="journey-label">Ваши руки</span>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={() => navigate("/")}>
        ВЫБРАТЬ ОХАПКУ
      </button>

      <div style={{ height: 40 }}></div>
    </div>
  );
}