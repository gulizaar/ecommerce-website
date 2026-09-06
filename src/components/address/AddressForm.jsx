import { useState } from "react";
import { CITIES } from "../../data/cities";

const BLANK = {
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
};

const Field = ({ label, field, type = "text", multiline, form, setField, errors }) => (
    <div className="mb-[14px]">
        <label className="block text-[13px] font-semibold mb-1">
            {label}
        </label>

        {multiline ? (
            <textarea
                rows={3}
                value={form[field]}
                onChange={(e) => setField(field, e.target.value)}
                className={`w-full box-border px-3 py-[9px] border-[1.5px] ${errors[field] ? "border-[#e74c3c]" : "border-[#ccc]"} rounded-[6px] text-[14px] outline-none resize-y`}
            />
        ) : (
            <input
                type={type}
                value={form[field]}
                onChange={(e) => setField(field, e.target.value)}
                className={`w-full box-border px-3 py-[9px] border-[1.5px] ${errors[field] ? "border-[#e74c3c]" : "border-[#ccc]"} rounded-[6px] text-[14px] outline-none`}
            />
        )}

        {errors[field] && (
            <span className="text-[12px] text-[#e74c3c]">{errors[field]}</span>
        )}
    </div>
);

export default function AddressForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState(initial || BLANK);
    const [errors, setErrors] = useState({});

    const setField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Zorunlu alan";
        if (!form.name.trim()) e.name = "Zorunlu alan";
        if (!form.surname.trim()) e.surname = "Zorunlu alan";
        if (!/^0[0-9]{10}$/.test(form.phone)) e.phone = "Geçerli telefon giriniz";
        if (!form.city) e.city = "Zorunlu alan";
        if (!form.district.trim()) e.district = "Zorunlu alan";
        if (!form.neighborhood.trim()) e.neighborhood = "Zorunlu alan";
        if (!form.address.trim()) e.address = "Zorunlu alan";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) onSave(form);
    };

    return (
        <div className="bg-[#fafafa] border-[1.5px] border-[#f27a1a] rounded-[10px] p-5 mt-3 mb-[18px]">
            <h3 className="mt-0 mb-4 text-[16px] text-[#f27a1a]">
                {initial?.id ? "Adresi Düzenle" : "Yeni Adres Ekle"}
            </h3>

            <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-2">
                    <Field label="Adres Başlığı" field="title" form={form} setField={setField} errors={errors} />
                </div>
                <Field label="Ad" field="name" form={form} setField={setField} errors={errors} />
                <Field label="Soyad" field="surname" form={form} setField={setField} errors={errors} />
                <Field label="Telefon" field="phone" type="tel" form={form} setField={setField} errors={errors} />

                <div className="mb-[14px]">
                    <label className="block text-[13px] font-semibold mb-1">
                        Şehir (İl)
                    </label>
                    <select
                        value={form.city}
                        onChange={(e) => setField("city", e.target.value)}
                        className={`w-full box-border px-3 py-[9px] border-[1.5px] ${errors.city ? "border-[#e74c3c]" : "border-[#ccc]"} rounded-[6px] text-[14px] outline-none`}
                    >
                        <option value="">Seçiniz...</option>
                        {CITIES.map((city) => (
                            <option key={city} value={city.toLowerCase()}>{city}</option>
                        ))}
                    </select>
                    {errors.city && <span className="text-[12px] text-[#e74c3c]">{errors.city}</span>}
                </div>

                <Field label="İlçe" field="district" form={form} setField={setField} errors={errors} />
                <Field label="Mahalle" field="neighborhood" form={form} setField={setField} errors={errors} />
            </div>

            <Field label="Adres" field="address" multiline form={form} setField={setField} errors={errors} />

            <div className="flex justify-end gap-[10px]">
                <button onClick={onCancel}>İptal</button>
                <button onClick={handleSubmit}>
                    {initial?.id ? "Güncelle" : "Kaydet"}
                </button>
            </div>
        </div>
    );
}