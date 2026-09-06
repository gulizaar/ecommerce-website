import { useState } from "react";
import { Navigate } from "react-router-dom";
import AddressStep from "../components/address/AddressStep";
import CardStep from "../components/CardStep";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export function ProtectedRoute({ children }) {
    const authenticated = Boolean(localStorage.getItem("token"));
    if (!authenticated) return <Navigate to="/login" replace />;
    return children;
}

export function CreateOrderPage() {
    const [step, setStep] = useState(1);
    const [addressData, setAddressData] = useState(null);

    const handleAddressDone = (data) => {
        setAddressData(data);
        setStep(2);
    };

    const handleOrderComplete = (selectedCard) => {
        console.log("Sipariş tamamlandı:", { addressData, selectedCard });
        alert("Siparişiniz alındı!");
    };

    return (
        <>
            <Header />

            <div className="container py-4">
                <h1 className="fs-4 fw-bold mb-4">Sipariş Oluştur</h1>

                {/* Tab başlıkları */}
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${step === 1 ? "active" : ""}`}
                            disabled={step === 2}
                            onClick={() => setStep(1)}
                        >
                            1 — Adres Bilgileri
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${step === 2 ? "active" : ""} ${!addressData ? "disabled" : ""}`}
                            disabled={!addressData}
                            onClick={() => addressData && setStep(2)}
                        >
                            2 — Ödeme
                        </button>
                    </li>
                </ul>

                {/* Tab içerikleri */}
                <div className="tab-content">
                    {step === 1 && (
                        <div className="tab-pane fade show active">
                            <AddressStep onNext={handleAddressDone} />
                        </div>
                    )}
                    {step === 2 && (
                        <div className="tab-pane fade show active">
                            <CardStep
                                onBack={() => setStep(1)}
                                onComplete={handleOrderComplete}
                            />
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}