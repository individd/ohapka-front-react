import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

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
    if (!name || !phone || !address || !date || !selectedSlot) {
      alert("Заполните все обязательные поля");
      return;
    }

    const orderData = {
      name,
      phone,
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
    <div style={{ padding: 16, paddingBottom: 100 }}>
      <h2 style={{ marginBottom: 20 }}>Оформление заказа</h2>

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
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
      />

      {/* Слоты */}
      <label style={{ fontSize: 14, marginTop: 12, display: "block" }}>
        Время доставки:
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
              border: selectedSlot === slot.label ? "2px solid #000" : "1px solid #ccc",
              background: selectedSlot === slot.label ? "#000" : "#fff",
              color: selectedSlot === slot.label ? "#fff" : "#000",
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

      {/* Итог */}
      <h3 style={{ marginTop: 20 }}>Итого: {formatPrice(total)} ₽</h3>

      {/* Кнопка оформить */}
      <button
        onClick={submitOrder}
        style={{
          width: "100%",
          background: "#000",
          color: "#fff",
          padding: "14px 0",
          borderRadius: 10,
          border: "none",
          fontSize: 16,
          fontWeight: 600,
          marginTop: 20,
        }}
      >
        Оформить заказ
      </button>
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