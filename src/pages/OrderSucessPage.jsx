import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function OrderSucessPage() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="text-center px-5 py-20">
                <h1 className="text-[40px]">🎉</h1>
                <h2 className="text-[26px] font-bold text-[#4caf50] mt-3">
                    Siparişiniz Alındı!
                </h2>
                <p className="text-[#666] text-[15px] mt-2">
                    Siparişiniz başarıyla oluşturuldu. En kısa sürede kargoya verilecektir.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-8 py-3 bg-[#f27a1a] text-white border-none rounded-[8px] font-bold text-[15px] cursor-pointer"
                >
                    Alışverişe Devam Et
                </button>
            </div>
            <Footer />
        </>
    );
}