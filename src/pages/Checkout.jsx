import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (isSubmitting) return;
        setIsSubmitting(true);

        // Защита от выбора прошедшей даты (например, если min обойти)
        if (date < today) {
            setDate(today);
            alert("Нельзя выбрать прошедшую дату доставки");
            setIsSubmitting(false);
            return;
        }
        if (!name || !address || !date || !selectedSlot) {
            alert("Заполните все обязательные поля");
            setIsSubmitting(false);
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
            setIsSubmitting(false);
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
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="checkout-container">
            <h2 className="section-title">ОФОРМЛЕНИЕ</h2>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="ИМЯ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
                <input
                    type="tel"
                    placeholder="ТЕЛЕФОН"
                    value={formatPhone(phone)}
                    onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "");
                        setPhone(digits);
                    }}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="АДРЕС"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field"
                />
            </div>

            <h3 className="section-title">ДАТА И ВРЕМЯ</h3>
            <div className="form-group">
                <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-field"
                />

                {slots.length === 0 && (
                    <div style={{ opacity: 0.6, marginBottom: 10, fontSize: 12, fontWeight: 700 }}>
                        НЕТ СЛОТОВ
                    </div>
                )}

                <div className="slot-grid">
                    {slots.map((slot) => (
                        <button
                            key={slot.label}
                            onClick={() => setSelectedSlot(slot.label)}
                            className={`slot-btn ${selectedSlot === slot.label ? "selected" : ""}`}
                        >
                            {slot.label}
                        </button>
                    ))}
                </div>
            </div>

            <h3 className="section-title">КОММЕНТАРИЙ</h3>
            <div className="form-group">
                <textarea
                    placeholder="ДЕТАЛИ ЗАКАЗА"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input-field"
                    style={{ minHeight: 80, resize: "none" }}
                />
            </div>

            <div style={{ marginTop: 40, marginBottom: 40 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontWeight: 900, fontSize: 20 }}>
                    <span>ИТОГО:</span>
                    <span>{formatPrice(total)} ₽</span>
                </div>

                <button
                    className="btn-primary"
                    onClick={submitOrder}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? "ОФОРМЛЯЕМ..." : "ОФОРМИТЬ"}
                </button>
            </div>
        </div>
    );
}
