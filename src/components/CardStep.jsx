import { useState, useEffect } from "react";
import { cardApi } from "../api/cardApi";
import SiparisOzeti from "./SiparisOzeti";

export default function CardStep({ onBack, onComplete }) {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cvv, setCvv] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [form, setForm] = useState({
        card_no: "", expire_month: "", expire_year: "", name_on_card: "",
    });

    useEffect(() => {
        cardApi.getCards()
            .then((data) => {
                console.log("API response:", data);
                setCards(Array.isArray(data) ? data : data.data || []);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => {
        setShowForm(false);
        setEditingCard(null);
        setForm({ card_no: "", expire_month: "", expire_year: "", name_on_card: "" });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editingCard) {
                await cardApi.updateCard({
                    ...form,
                    id: editingCard.id,
                    expire_month: Number(form.expire_month),
                    expire_year: Number(form.expire_year),
                });
            } else {
                await cardApi.createCard({
                    ...form,
                    expire_month: Number(form.expire_month),
                    expire_year: Number(form.expire_year),
                });
            }
            const data = await cardApi.getCards();
            setCards(Array.isArray(data) ? data : data.data || []);
            resetForm();
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (card) => {
        setEditingCard(card);
        setForm({
            card_no: card.card_no,
            expire_month: card.expire_month,
            expire_year: card.expire_year,
            name_on_card: card.name_on_card,
        });
        setShowForm(true);
    };

    const handleDelete = async (cardId) => {
        if (!window.confirm("Kartı silmek istediğinize emin misiniz?")) return;
        try {
            await cardApi.deleteCard(cardId);
            const data = await cardApi.getCards();
            setCards(Array.isArray(data) ? data : data.data || []);
            if (selectedCard?.id === cardId) {
                setSelectedCard(null);
                setCvv("");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const canComplete =
        paymentMethod === "cash" ||
        (paymentMethod === "card" && selectedCard && cvv.length === 3);

    const optionBoxClass = (active) =>
        `border-2 ${active ? "border-[#f27a1a] bg-[#fff8f3]" : "border-[#ddd] bg-white"} rounded-[10px] p-[16px_20px] mb-4 cursor-pointer`;

    const radioCircleClass = (active) =>
        `w-[18px] h-[18px] rounded-full border-2 ${active ? "border-[#f27a1a] bg-[#f27a1a] shadow-[inset_0_0_0_3px_#fff8f3]" : "border-[#aaa] bg-white"} inline-block mr-[10px] shrink-0`;

    return (
        <div className="grid gap-6 items-start [grid-template-columns:1fr_340px]">

            <div>
                <h2 className="text-[18px] font-bold mb-5 mt-0">
                    Ödeme Yöntemi
                </h2>

                <div className={optionBoxClass(paymentMethod === "cash")} onClick={() => setPaymentMethod("cash")}>
                    <div className="flex items-center">
                        <span className={radioCircleClass(paymentMethod === "cash")} />
                        <div>
                            <p className="m-0 font-bold text-[15px]">Kapıda Ödeme</p>
                            <p className="mt-1 mb-0 text-[13px] text-[#666]">
                                Siparişiniz kapınıza geldiğinde nakit veya kartla ödeme yapabilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={optionBoxClass(paymentMethod === "card")} onClick={() => setPaymentMethod("card")}>
                    <div className={`flex items-center ${paymentMethod === "card" ? "mb-4" : "mb-0"}`}>
                        <span className={radioCircleClass(paymentMethod === "card")} />
                        <div>
                            <p className="m-0 font-bold text-[15px]">Kart ile Öde</p>
                            <p className="mt-1 mb-0 text-[13px] text-[#666]">
                                Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.
                            </p>
                        </div>
                    </div>

                    {paymentMethod === "card" && (
                        <div onClick={(e) => e.stopPropagation()}>
                            {loading && <p className="text-[#888] text-[13px]">Kartlar yükleniyor...</p>}

                            {!loading && cards.length > 0 && (
                                <div className="flex flex-wrap gap-3 mb-4">
                                    {cards.map((card) => {
                                        const active = selectedCard?.id === card.id;
                                        return (
                                            <div
                                                key={card.id}
                                                onClick={() => { setSelectedCard(card); setCvv(""); }}
                                                className={`border-2 ${active ? "border-[#f27a1a] bg-[#fff3e8]" : "border-[#ddd] bg-[#fafafa]"} rounded-[10px] p-[14px_16px] cursor-pointer w-[180px]`}
                                            >
                                                <p className="m-0 mb-2 font-bold text-[13px] text-[#333]">
                                                    {card.name_on_card}
                                                </p>
                                                <p className="m-0 text-[12px] text-[#555] tracking-wider">
                                                    **** **** **** {card.card_no?.slice(-4)}
                                                </p>
                                                <p className="mt-1 mb-0 text-[11px] text-[#888]">
                                                    {card.expire_month}/{card.expire_year}
                                                </p>
                                                <div className="flex gap-[6px] mt-[10px]">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleEdit(card); }}
                                                        className="flex-1 py-1 text-[11px] rounded-[5px] border border-[#ddd] cursor-pointer bg-white"
                                                    >
                                                        Düzenle
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }}
                                                        className="flex-1 py-1 text-[11px] rounded-[5px] border border-[#e74c3c] text-[#e74c3c] cursor-pointer bg-white"
                                                    >
                                                        Sil
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {selectedCard && (
                                <div className="mb-4">
                                    <label className="text-[12px] font-semibold">CVV</label>
                                    <input
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        placeholder="123"
                                        maxLength={3}
                                        type="password"
                                        className="w-[80px] px-[11px] py-[9px] rounded-[6px] border border-[#ddd] mt-1 box-border block"
                                    />
                                </div>
                            )}

                            {!showForm && (
                                <button
                                    onClick={() => { setShowForm(true); setEditingCard(null); setForm({ card_no: "", expire_month: "", expire_year: "", name_on_card: "" }); }}
                                    className="px-[18px] py-2 rounded-[8px] border-2 border-dashed border-[#f27a1a] text-[#f27a1a] bg-white cursor-pointer font-semibold text-[13px] mb-2"
                                >
                                    + Yeni Kart Ekle
                                </button>
                            )}

                            {showForm && (
                                <div className="border border-[#ddd] rounded-[8px] p-5 mt-2">
                                    <h3 className="mt-0 mb-[14px] text-[15px]">
                                        {editingCard ? "Kartı Düzenle" : "Yeni Kart"}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="col-span-2">
                                            <label className="text-[12px] font-semibold">Kart Üzerindeki İsim</label>
                                            <input name="name_on_card" value={form.name_on_card} onChange={handleFormChange}
                                                placeholder="Ad Soyad"
                                                className="w-full px-[11px] py-[9px] rounded-[6px] border border-[#ddd] mt-1 box-border" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="text-[12px] font-semibold">Kart Numarası</label>
                                            <input name="card_no" value={form.card_no} onChange={handleFormChange}
                                                placeholder="1234 1234 1234 1234" maxLength={16}
                                                className="w-full px-[11px] py-[9px] rounded-[6px] border border-[#ddd] mt-1 box-border" />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-semibold">Son Kullanma Ay</label>
                                            <input name="expire_month" value={form.expire_month} onChange={handleFormChange}
                                                placeholder="12" type="number" min={1} max={12}
                                                className="w-full px-[11px] py-[9px] rounded-[6px] border border-[#ddd] mt-1 box-border" />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-semibold">Son Kullanma Yıl</label>
                                            <input name="expire_year" value={form.expire_year} onChange={handleFormChange}
                                                placeholder="2027" type="number" min={2024}
                                                className="w-full px-[11px] py-[9px] rounded-[6px] border border-[#ddd] mt-1 box-border" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-[14px]">
                                        <button onClick={handleSave} disabled={saving}
                                            className={`px-[22px] py-[9px] bg-[#f27a1a] text-white border-none rounded-[6px] font-bold ${saving ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                            {saving ? "Kaydediliyor..." : "Kaydet"}
                                        </button>
                                        <button onClick={resetForm}
                                            className="px-[22px] py-[9px] bg-white border border-[#ddd] rounded-[6px] cursor-pointer">
                                            İptal
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button onClick={onBack}
                        className="px-8 py-3 bg-white border border-[#ddd] rounded-[8px] font-bold cursor-pointer">
                        ← Geri
                    </button>
                    <button
                        onClick={() => onComplete({ method: paymentMethod, card: selectedCard, cvv })}
                        disabled={!canComplete}
                        className={`px-8 py-3 ${canComplete ? "bg-[#f27a1a] cursor-pointer" : "bg-[#ccc] cursor-not-allowed"} text-white border-none rounded-[8px] font-bold`}>
                        Siparişi Tamamla →
                    </button>
                </div>
            </div>

            <div className="sticky top-5">
                <SiparisOzeti />
            </div>

        </div>
    );
}