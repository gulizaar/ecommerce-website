import { useState, useEffect } from "react";
import AddressSection from "./AddressSection";
import { addressApi } from "../../api/addressApi";
import SiparisOzeti from "../SiparisOzeti";

export default function AddressStep({ onNext }) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [shippingAddress, setShippingAddress] = useState(null);
    const [billingAddress, setBillingAddress] = useState(null);

    useEffect(() => {
        addressApi.getAddresses()
            .then((data) => setAddresses(Array.isArray(data) ? data : data.data || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const canProceed = shippingAddress && billingAddress;

    const handleNext = () => {
        if (!canProceed) return;
        onNext({
            shippingAddress,
            billingAddress,
            shippingId: shippingAddress.id,
            billingId: billingAddress.id,
        });
    };

    return (
        <div>
            {loading && <p className="text-[#888]">Adresler yükleniyor...</p>}
            {error && <p className="text-[#e74c3c]">{error}</p>}

            {!loading && (
                <div className="grid gap-6 items-start [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
                    <AddressSection
                        title="Teslimat Adresi"
                        addresses={addresses}
                        setAddresses={setAddresses}
                        onSelect={setShippingAddress}
                    />
                    <AddressSection
                        title="Fatura Adresi"
                        addresses={addresses}
                        setAddresses={setAddresses}
                        onSelect={setBillingAddress}
                    />
                    <SiparisOzeti />
                </div>
            )}

            {!canProceed && !loading && (
                <p className="text-[#e67e22] text-[13px] mt-2">
                    Devam etmek için teslimat ve fatura adresini seçiniz.
                </p>
            )}

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`px-8 py-3 text-white border-none rounded-[8px] font-bold text-[15px] ${canProceed ? "bg-[#f27a1a] cursor-pointer" : "bg-[#ccc] cursor-not-allowed"
                        }`}
                >
                    İleri →
                </button>
            </div>
        </div>
    );
}