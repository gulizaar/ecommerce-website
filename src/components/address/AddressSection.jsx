import { useState } from "react";
import { addressApi } from "../../api/addressApi";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

export default function AddressSection({ title, addresses, setAddresses, onSelect }) {

    const [selectedId, setSelectedId] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleSelect = (id) => {
        setSelectedId(id);
        const found = addresses.find((a) => a.id === id);
        if (onSelect) onSelect(found);
    };

    const handleCreate = async (formData) => {
        try {
            const created = await addressApi.createAddress(formData);
            setAddresses((prev) => [...prev, created]);
            handleSelect(created.id);
            closeForm();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleUpdate = async (formData) => {
        try {
            const payload = { ...formData, id: editingAddress.id };
            const updated = await addressApi.updateAddress(payload);
            setAddresses((prev) =>
                prev.map((a) => (a.id === updated.id ? updated : a))
            );
            if (selectedId === updated.id && onSelect) onSelect(updated);
            closeForm();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (addressId) => {
        if (!window.confirm("Bu adresi silmek istediğinize emin misiniz?")) return;
        try {
            await addressApi.deleteAddress(addressId);
            setAddresses((prev) => prev.filter((a) => a.id !== addressId));
            if (selectedId === addressId) {
                setSelectedId(null);
                if (onSelect) onSelect(null);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const openCreateForm = () => {
        setEditingAddress(null);
        setShowForm(true);
    };

    const openEditForm = (addr) => {
        setEditingAddress(addr);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingAddress(null);
    };

    return (
        <div className="mb-8">
            <h2 className="text-[18px] font-bold text-[#333] mb-3">
                {title}
            </h2>

            {addresses.length === 0 && (
                <p className="text-[#888] text-[14px]">
                    Kayıtlı adres bulunamadı.
                </p>
            )}

            {addresses.map((addr) => (
                <AddressCard
                    key={addr.id}
                    addr={addr}
                    selected={selectedId === addr.id}
                    onSelect={handleSelect}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                />
            ))}

            {!showForm && (
                <button
                    onClick={openCreateForm}
                    className="mt-2 px-[18px] py-[9px] bg-white border-[1.5px] border-dashed border-[#f27a1a] rounded-[8px] text-[#f27a1a] font-bold text-[14px] cursor-pointer"
                >
                    + Adres Ekle
                </button>
            )}

            {showForm && (
                <AddressForm
                    initial={editingAddress}
                    onSave={editingAddress ? handleUpdate : handleCreate}
                    onCancel={closeForm}
                />
            )}
        </div>
    );
}