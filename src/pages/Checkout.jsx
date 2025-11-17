
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../ui.css";

function formatPhone(value) {
  const digitsOnly = (value || "").replace(/\D/g, "");
  let local = digitsOnly;

  // Нормализуем: если начинается с 7 или 8, считаем это кодом страны
  if (local.startsWith("7") || local.startsWith("8")) {
    local = local.slice(1);
  }

  // Оставляем максимум 10 цифр локального номера
  local = local.slice(0, 10);

  if (!local.length) return "";

  let res = "+7";

  if (local.length <= 3) {
    return res + " (" + local;
  }

  res += " (" + local.slice(0, 3) + ")";

  if (local.length <= 6) {
    return res + " " + local.slice(3);
  }

  res += " " + local.slice(3, 6);

  if (local.length <= 8) {
    return res + "-" + local.slice(6);
  }

  res += "-" + local.slice(6, 8) + "-" + local.slice(8, 10);

  return res;
}

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(today);
  const [comment, setComment] = useState("");

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Фиксированные слоты
  const deliverySlots = [
    { start: 10, end: 13, label: "10:00–13:00" },
    { start: 13, end: 16, label: "13:00–16:00" },
    { start: 16, end: 19, label: "16:00–19:00" },
    { start: 19, end: 21, label: "19:00–21:00" },
    { start: 21, end: 23, label: "21:00–23:00" },
  ];

  const MIN_SLOTS_AHEAD = 3;

  function getAvailableSlots(selectedDate) {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    // Если не сегодня — доступны все
    if (selectedDate !== todayStr) {
      return deliverySlots;
    }

    const currentHour = now.getHours();

    let currentSlotIndex = deliverySlots.findIndex(
      (slot) => currentHour >= slot.start && currentHour < slot.end
    );

    // Если слишком рано
    if (currentHour < deliverySlots[0].start) {
      currentSlotIndex = -1;
    }

    // Если слишком поздно
    if (currentSlotIndex === deliverySlots.length - 1) {
      return [];
    }

    const firstAvailable = currentSlotIndex + MIN_SLOTS_AHEAD;

    return deliverySlots.slice(firstAvailable);
  }

  // Обновляем слоты при изменении даты
  useEffect(() => {
    const s = getAvailableSlots(date);
    setSlots(s);
    setSelectedSlot(null); // сброс выбранного слота
  }, [date]);

  const formatPrice = (n) =>
    n.toLocaleString("ru-RU", { minimumFractionDigits: 0 });

  async function submitOrder() {
    // Защита от выбора прошедшей даты (например, если min обойти)
    if (date < today) {
      setDate(today);
      alert("Нельзя выбрать прошедшую дату доставки");
      return;
    }
    if (!name || !address || !date || !selectedSlot) {
      alert("Заполните все обязательные поля");
      return;
    }

    // Валидация телефона: минимум 10 цифр локального номера
    const digitsPhone = (phone || "").replace(/\D/g, "");
    let localPhone = digitsPhone;

    if (localPhone.startsWith("7") || localPhone.startsWith("8")) {
      localPhone = localPhone.slice(1);
    }

    if (localPhone.length < 10) {
      alert("Введите корректный номер телефона");
      return;
    }

    const normalizedPhone = "+7" + localPhone.slice(0, 10);

    const orderData = {
      name,
      phone: normalizedPhone,
      address,
      date,
      slot: selectedSlot,
      comment,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        min: item.min,
        step: item.step,
      })),
      total,
    };

  // Для теста в локале: fetch("http://127.0.0.1:8000/order")

    try {
      const res = await fetch("https://ohapka-backend-individd.amvera.io/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Ошибка сервера");
      }

      clearCart();
      navigate("/success");

    } catch (e) {
      console.error(e);
      alert("Не удалось оформить заказ. Попробуйте позже.");
    }
  }

  return (
    <div style={{ paddingBottom: 130 }}>

      <div style={{ padding: 16 }}>
        {/* Имя */}
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        {/* Телефон */}
        <input
          type="tel"
          placeholder="Телефон"
          value={formatPhone(phone)}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            setPhone(digits);
          }}
          style={inputStyle}
        />

        {/* Адрес */}
        <input
          type="text"
          placeholder="Адрес доставки"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={inputStyle}
        />

        {/* Дата */}
        <label style={{ fontSize: 14, marginTop: 12, display: "block" }}>
          Дата доставки:
        </label>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button
            type="button"
            onClick={() => {
              const d = new Date();
              setDate(d.toISOString().split("T")[0]);
            }}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: date === new Date().toISOString().split("T")[0] ? "2px solid #F7FF8B" : "1px solid #E0E0E0",
              background: date === new Date().toISOString().split("T")[0] ? "#F7FF8B" : "#FFFFFF",
              color: "#111",
              fontSize: 15,
              flex: 1,
            }}
          >
            Сегодня
          </button>
          <button
            type="button"
            onClick={() => {
              const d = new Date();
              d.setDate(d.getDate() + 1);
              setDate(d.toISOString().split("T")[0]);
            }}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: date === (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; })() ? "2px solid #F7FF8B" : "1px solid #E0E0E0",
              background: date === (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; })() ? "#F7FF8B" : "#FFFFFF",
              color: "#111",
              fontSize: 15,
              flex: 1,
            }}
          >
            Завтра
          </button>
          <button
            type="button"
            onClick={() => {
              const d = new Date();
              d.setDate(d.getDate() + 2);
              setDate(d.toISOString().split("T")[0]);
            }}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: date === (() => { const d = new Date(); d.setDate(d.getDate() + 2); return d.toISOString().split("T")[0]; })() ? "2px solid #F7FF8B" : "1px solid #E0E0E0",
              background: date === (() => { const d = new Date(); d.setDate(d.getDate() + 2); return d.toISOString().split("T")[0]; })() ? "#F7FF8B" : "#FFFFFF",
              color: "#111",
              fontSize: 15,
              flex: 1,
            }}
          >
            Послезавтра
          </button>
        </div>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          style={{ ...inputStyle, appearance: "none" }}
        />

        {/* Слоты */}
        <label style={{ fontSize: 14, marginTop: 12, display: "block" }}>
          Слот для доставки:
        </label>

        {slots.length === 0 && (
          <div style={{ opacity: 0.6, marginBottom: 10 }}>
            На выбранную дату нет доступных слотов
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {slots.map((slot) => (
            <button
              key={slot.label}
              onClick={() => setSelectedSlot(slot.label)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: selectedSlot === slot.label ? "2px solid #F7FF8B" : "1px solid #E0E0E0",
                background: selectedSlot === slot.label ? "#F7FF8B" : "#FFFFFF",
                color: "#111",
                textAlign: "left",
                fontSize: 15,
              }}
            >
              {slot.label}
            </button>
          ))}
        </div>

        {/* Комментарий */}
        <textarea
          placeholder="Комментарий (необязательно)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ ...inputStyle, height: 80, marginTop: 12 }}
        />
      </div>

      {/* Фиксированный нижний бар с итогом и кнопкой */}
      <div className="bottom-action-bar">
        <div className="total-block">
          <span>Итого:</span>
          <b>{formatPrice(total)} ₽</b>
        </div>

        <button className="checkout-button" onClick={submitOrder}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 10px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 15,
  marginBottom: 10,
};