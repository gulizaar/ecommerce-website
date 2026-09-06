import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddressStep from "../components/address/AddressStep";
import CardStep from "../components/CardStep";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { clearCart } from "../redux/cart/cartActions";
import { orderApi } from "../api/orderApi";

export function ProtectedRoute({ children }) {
    const authenticated = Boolean(localStorage.getItem("token"));
    if (!authenticated) return <Navigate to="/login" replace />;
    return children;
}

export function CreateOrderPage() {
    const [step, setStep] = useState(1);
    const [addressData, setAddressData] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cart);

    const handleAddressDone = (data) => {
        setAddressData(data);
        setStep(2);
    };

    const handleOrderComplete = async ({ method, card, cvv }) => {
        try {
            const checkedItems = cart.filter((item) => item.checked);

            const orderPayload = {
                address_id: addressData.shippingId,
                order_date: new Date().toISOString(),
                card_no: method === "card" ? Number(card.card_no) : 0,
                card_name: method === "card" ? card.name_on_card : "",
                card_expire_month: method === "card" ? card.expire_month : 0,
                card_expire_year: method === "card" ? card.expire_year : 0,
                card_ccv: method === "card" ? Number(cvv) : 0,
                price: checkedItems.reduce(
                    (sum, item) => sum + item.product.price * item.count, 0
                ),
                products: checkedItems.map((item) => ({
                    product_id: item.product.id,
                    count: item.count,
                    detail: "",
                })),
            };

            console.log("Gönderilen payload:", orderPayload);
            await orderApi.createOrder(orderPayload);

            dispatch(clearCart());
            localStorage.removeItem("cart");

            navigate("/order-success");
        } catch (err) {
            console.error("Sipariş hatası:", err);
            alert("Sipariş oluşturulamadı: " + err.message);
        }
    };

    return (
        <>
            <Header />

            <div className="max-w-[960px] mx-auto px-4 py-8 font-sans">
                <h1 className="text-[22px] font-bold mb-6">Sipariş Oluştur</h1>

                <div className="flex border-b-2 border-[#eee] mb-7">
                    <button
                        className={`px-6 py-[10px] border-none bg-transparent text-[15px] border-b-[3px] ${step === 1
                                ? "border-[#f27a1a] font-bold text-[#f27a1a]"
                                : "border-transparent font-medium text-[#555]"
                            } cursor-pointer`}
                        onClick={() => setStep(1)}
                    >
                        Adres Bilgileri
                    </button>
                    <button
                        className={`px-6 py-[10px] border-none bg-transparent text-[15px] border-b-[3px] ${step === 2
                                ? "border-[#f27a1a] font-bold text-[#f27a1a]"
                                : "border-transparent font-medium"
                            } ${!addressData ? "text-[#bbb] cursor-not-allowed" : "text-[#555] cursor-pointer"}`}
                        onClick={() => addressData && setStep(2)}
                    >
                        Ödeme Seçenekleri
                    </button>
                </div>

                {step === 1 && <AddressStep onNext={handleAddressDone} />}
                {step === 2 && (
                    <CardStep onBack={() => setStep(1)} onComplete={handleOrderComplete} />
                )}
            </div>

            <Footer />
        </>
    );
}