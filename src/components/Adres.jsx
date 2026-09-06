import { useState, useEffect } from "react";

const CITIES = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
    "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
    "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum",
    "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin",
    "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli",
    "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş",
    "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
    "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak",
    "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan",
    "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce",
];

const API_BASE = "/api";
const authHeader = () => ({
    "Content-Type": "application/json",
    token: localStorage.getItem("token") || "",
});

const BLANK = {
    title: "", name: "", surname: "", phone: "",
    city: "", district: "", neighborhood: "", address: "",
};

function AddressCard({ addr, selected, onSelect, onEdit, onDelete }) {
    return (
        <div
            onClick={() => onSelect(addr.id)}
            className={`relative mb-[10px] cursor-pointer rounded-[8px] p-[14px_16px] transition-[border-color,background] duration-200 ${selected ? "border-2 border-[#f27a1a] bg-[#fff8f2]" : "border-[1.5px] border-[#ddd] bg-white"
                }`}
        >
            <div className="flex items-center gap-2 mb-1">
                <input type="radio" readOnly checked={selected} className="accent-[#f27a1a]" />
                <span className="font-bold text-[14px] text-[#333]">{addr.title}</span>
            </div>
            <div className="text-[13px] text-[#555] leading-[1.6] ml-6">
                <div>{addr.name} {addr.surname} · {addr.phone}</div>
                <div>{addr.neighborhood}, {addr.district}, {addr.city}</div>
                <div>{addr.address}</div>
            </div>
            <div className="absolute top-[10px] right-[10px] flex gap-[10px]">
                <button
                    onClick={e => { e.stopPropagation(); onEdit(addr); }}
                    className="bg-transparent border-none text-[#f27a1a] cursor-pointer text-[13px] font-semibold p-0"
                >
                    Düzenle
                </button>
                <button
                    onClick={e => { e.stopPropagation(); onDelete(addr.id); }}
                    className="bg-transparent border-none text-[#c0392b] cursor-pointer text-[13px] font-semibold p-0"
                >
                    Sil
                </button>
            </div>
        </div>
    );
}

function AddressForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState(initial || BLANK);
    const [errors, setErrors] = useState({});

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Zorunlu alan";
        if (!form.name.trim()) e.name = "Zorunlu alan";
        if (!form.surname.trim()) e.surname = "Zorunlu alan";
        if (!/^0[0-9]{10}$/.test(form.phone)) e.phone = "Geçerli telefon giriniz (05xx...)";
        if (!form.city) e.city = "Zorunlu alan";
        if (!form.district.trim()) e.district = "Zorunlu alan";
        if (!form.neighborhood.trim()) e.neighborhood = "Zorunlu alan";
        if (!form.address.trim()) e.address = "Zorunlu alan";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => { if (validate()) onSave(form); };

    const inputClass = (k) =>
        `w-full box-border px-3 py-[9px] border-[1.5px] ${errors[k] ? "border-[#e74c3c]" : "border-[#ccc]"} rounded-[6px] text-[14px] outline-none font-[inherit] bg-white text-[#333]`;

    const Field = ({ label, k, type = "text", multiline }) => (
        <div className="mb-[14px]">
            <label className="text-[13px] font-semibold text-[#444] block mb-1">
                {label}
            </label>
            {multiline ? (
                <textarea
                    rows={3}
                    value={form[k]}
                    onChange={e => set(k, e.target.value)}
                    className={`${inputClass(k)} resize-y`}
                />
            ) : (
                <input
                    type={type}
                    value={form[k]}
                    onChange={e => set(k, e.target.value)}
                    className={inputClass(k)}
                />
            )}
            {errors[k] && <span className="text-[12px] text-[#e74c3c]">{errors[k]}</span>}
        </div>
    );

    return (
        <div className="bg-[#fafafa] border-[1.5px] border-[#f27a1a] rounded-[10px] p-5 mt-3 mb-[18px]">
            <h3 className="mt-0 mb-4 text-[16px] text-[#f27a1a]">
                {initial?.id ? "Adresi Düzenle" : "Yeni Adres Ekle"}
            </h3>

            <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-2">
                    <Field label="Adres Başlığı" k="title" />
                </div>
                <Field label="Ad" k="name" />
                <Field label="Soyad" k="surname" />
                <Field label="Telefon" k="phone" type="tel" />

                <div className="mb-[14px]">
                    <label className="text-[13px] font-semibold text-[#444] block mb-1">
                        Şehir (İl)
                    </label>
                    <select
                        value={form.city}
                        onChange={e => set("city", e.target.value)}
                        className={`${inputClass("city")} appearance-auto`}
                    >
                        <option value="">Seçiniz...</option>
                        {CITIES.map(c => (
                            <option key={c} value={c.toLowerCase()}>{c}</option>
                        ))}
                    </select>
                    {errors.city && <span className="text-[12px] text-[#e74c3c]">{errors.city}</span>}
                </div>

                <Field label="İlçe" k="district" />
                <Field label="Mahalle" k="neighborhood" />
            </div>

            <Field label="Adres (Sokak, Bina No, Kapı No)" k="address" multiline />

            <div className="flex gap-[10px] justify-end">
                <button
                    onClick={onCancel}
                    className="py-[9px] px-[22px] border-[1.5px] border-[#ccc] rounded-[6px] bg-white cursor-pointer text-[14px] font-semibold text-[#555]"
                >
                    İptal
                </button>
                <button
                    onClick={handleSubmit}
                    className="py-[9px] px-[22px] border-none rounded-[6px] bg-[#f27a1a] text-white cursor-pointer text-[14px] font-bold"
                >
                    {initial?.id ? "Güncelle" : "Kaydet"}
                </button>
            </div>
        </div>
    );
}

function AddressSection({ title, selectedId, onSelect, addresses, onAdd, onEdit, onDelete, showForm, editTarget, onSave, onCancelForm }) {
    return (
        <div className="flex-1 min-w-0">
            <h2 className="text-[15px] font-bold text-[#333] mb-3 border-b-2 border-[#f27a1a] pb-[6px]">
                {title}
            </h2>

            {addresses.map(addr => (
                <AddressCard
                    key={addr.id}
                    addr={addr}
                    selected={selectedId === addr.id}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

            {showForm ? (
                <AddressForm
                    initial={editTarget}
                    onSave={onSave}
                    onCancel={onCancelForm}
                />
            ) : (
                <button
                    onClick={onAdd}
                    className="w-full border-2 border-dashed border-[#f27a1a] rounded-[8px] bg-[#fff8f2] py-[14px] cursor-pointer text-[#f27a1a] text-[14px] font-bold flex items-center justify-center gap-[6px]"
                >
                    <span className="text-[20px] leading-none">+</span> Yeni Adres Ekle
                </button>
            )}
        </div>
    );
}

export default function AddressStep({ onNext, isLoggedIn = true, history }) {
    useEffect(() => {
        if (!isLoggedIn && history) history.push("/login");
    }, [isLoggedIn, history]);

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shippingId, setShippingId] = useState(null);
    const [billingId, setBillingId] = useState(null);
    const [sameAddress, setSameAddress] = useState(true);
    const [shippingForm, setShippingForm] = useState({ show: false, target: null });
    const [billingForm, setBillingForm] = useState({ show: false, target: null });

    useEffect(() => {
        if (!isLoggedIn) return;
        api.getAddresses()
            .then(data => {
                const list = Array.isArray(data) ? data : (data.data || []);
                setAddresses(list);
                if (list.length > 0) {
                    setShippingId(list[0].id);
                    setBillingId(list[0].id);
                }
            })
            .catch(() => setError("Adresler yüklenemedi."))
            .finally(() => setLoading(false));
    }, [isLoggedIn]);

    useEffect(() => {
        if (sameAddress) setBillingId(shippingId);
    }, [sameAddress, shippingId]);

    const handleSaveAddress = async (form, section) => {
        try {
            let result;
            if (form.id) {
                result = await api.updateAddress(form);
                setAddresses(prev => prev.map(a => a.id === result.id ? result : a));
            } else {
                result = await api.createAddress(form);
                setAddresses(prev => [...prev, result]);
                if (section === "shipping") setShippingId(result.id);
                else setBillingId(result.id);
            }
            if (section === "shipping") setShippingForm({ show: false, target: null });
            else setBillingForm({ show: false, target: null });
        } catch {
            setError("İşlem başarısız oldu.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bu adresi silmek istediğinize emin misiniz?")) return;
        try {
            await api.deleteAddress(id);
            setAddresses(prev => prev.filter(a => a.id !== id));
            if (shippingId === id) setShippingId(addresses.find(a => a.id !== id)?.id || null);
            if (billingId === id) setBillingId(addresses.find(a => a.id !== id)?.id || null);
        } catch {
            setError("Adres silinemedi.");
        }
    };

    const handleEdit = (addr, section) => {
        if (section === "shipping") setShippingForm({ show: true, target: addr });
        else setBillingForm({ show: true, target: addr });
    };

    const canProceed = shippingId && (sameAddress || billingId);

    if (!isLoggedIn) return (
        <div className="text-center p-[60px] font-sans">
            Yönlendiriliyor...
        </div>
    );

    return (
        <div className="font-[Segoe_UI,Tahoma,sans-serif] max-w-[960px] mx-auto px-4 py-6 text-[#333]">
            {/* Adım göstergesi */}
            <div className="flex border-b-2 border-[#eee] mb-6">
                {["1  Adres Bilgileri", "2  Ödeme Seçenekleri"].map((step, i) => (
                    <div key={i} className={`px-7 py-[10px] font-bold text-[15px] border-b-[3px] ${i === 0 ? "border-[#f27a1a] text-[#f27a1a]" : "border-transparent text-[#aaa]"
                        }`}>
                        {step}
                    </div>
                ))}
            </div>

            {error && (
                <div className="bg-[#fdecea] border border-[#f5c6cb] rounded-[6px] px-[14px] py-[10px] mb-4 text-[#c0392b] text-[13px]">
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="float-right bg-transparent border-none cursor-pointer text-[#c0392b] font-bold"
                    >
                        ✕
                    </button>
                </div>
            )}

            {loading ? (
                <div className="text-center p-[60px] text-[#aaa] text-[16px]">
                    Adresler yükleniyor...
                </div>
            ) : (
                <div className="flex gap-6 items-start">
                    {/* Sol: adres sütunları */}
                    <div className="flex-1 min-w-0">
                        <label className="flex items-center gap-2 mb-[18px] cursor-pointer text-[14px]">
                            <input
                                type="checkbox"
                                checked={sameAddress}
                                onChange={e => setSameAddress(e.target.checked)}
                                className="accent-[#f27a1a] w-4 h-4"
                            />
                            Faturamı Aynı Adrese Gönder
                        </label>

                        <div className="flex gap-6">
                            <AddressSection
                                title="Teslimat Adresi"
                                selectedId={shippingId}
                                onSelect={id => { setShippingId(id); if (sameAddress) setBillingId(id); }}
                                addresses={addresses}
                                showForm={shippingForm.show}
                                editTarget={shippingForm.target}
                                onAdd={() => setShippingForm({ show: true, target: null })}
                                onEdit={addr => handleEdit(addr, "shipping")}
                                onDelete={handleDelete}
                                onSave={form => handleSaveAddress(form, "shipping")}
                                onCancelForm={() => setShippingForm({ show: false, target: null })}
                            />

                            {!sameAddress && (
                                <AddressSection
                                    title="Fatura Adresi"
                                    selectedId={billingId}
                                    onSelect={setBillingId}
                                    addresses={addresses}
                                    showForm={billingForm.show}
                                    editTarget={billingForm.target}
                                    onAdd={() => setBillingForm({ show: true, target: null })}
                                    onEdit={addr => handleEdit(addr, "billing")}
                                    onDelete={handleDelete}
                                    onSave={form => handleSaveAddress(form, "billing")}
                                    onCancelForm={() => setBillingForm({ show: false, target: null })}
                                />
                            )}
                        </div>
                    </div>

                    {/* Sağ: sipariş özeti */}
                    <div className="w-[260px] shrink-0">
                        <button
                            onClick={() => canProceed && onNext?.({ shippingId, billingId: sameAddress ? shippingId : billingId })}
                            disabled={!canProceed}
                            className={`w-full py-[14px] text-white border-none rounded-[8px] text-[16px] font-bold mb-4 ${canProceed ? "bg-[#f27a1a] cursor-pointer" : "bg-[#ccc] cursor-not-allowed"
                                }`}
                        >
                            Kaydet ve Devam Et
                        </button>

                        <div className="border-[1.5px] border-[#eee] rounded-[8px] p-4 bg-white">
                            <h3 className="mt-0 mb-[14px] text-[15px] text-[#333] border-b border-[#eee] pb-2">
                                Sipariş Özeti
                            </h3>
                            {[
                                { label: "Ürünün Toplamı", value: "8.448,99 TL", accent: false },
                                { label: "Kargo Toplamı", value: "29,99 TL", accent: false },
                                { label: "150 TL ve Üzeri Kargo Bedava", value: "-29,99 TL", accent: true },
                            ].map(r => (
                                <div key={r.label} className={`flex justify-between text-[13px] mb-2 ${r.accent ? "text-[#e74c3c]" : "text-[#555]"}`}>
                                    <span>{r.label}</span>
                                    <span className="font-semibold">{r.value}</span>
                                </div>
                            ))}
                            <div className="flex justify-between font-bold text-[16px] text-[#f27a1a] border-t border-[#eee] pt-[10px] mt-1">
                                <span>Toplam</span>
                                <span>8.448,99 TL</span>
                            </div>
                        </div>

                        <button
                            onClick={() => canProceed && onNext?.({ shippingId, billingId: sameAddress ? shippingId : billingId })}
                            disabled={!canProceed}
                            className={`w-full py-[14px] mt-[14px] text-white border-none rounded-[8px] text-[16px] font-bold ${canProceed ? "bg-[#f27a1a] cursor-pointer" : "bg-[#ccc] cursor-not-allowed"
                                }`}
                        >
                            Kaydet ve Devam Et
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}