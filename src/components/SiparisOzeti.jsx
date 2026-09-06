import React from 'react'
import { useShop } from "../context/ShopContext";
import { useNavigate } from 'react-router-dom';

function SiparisOzeti({ showOrderButton = false }) {
    const { cart } = useShop();
    const navigate = useNavigate();

    const selectedItems = cart.filter((item) => item.checked);
    const subtotal = selectedItems.reduce(
        (acc, item) => acc + item.product.price * item.count, 0
    );
    const kargo = subtotal > 150 ? 0 : 29.99;
    const total = subtotal + kargo;

    return (
        <div className="bg-white border-[1.5px] border-[#eee] rounded-[10px] p-6 sticky top-4">
            <h3 className="text-[16px] font-bold text-[#252B42] mb-4">
                Sipariş Özeti
            </h3>

            <hr className="mb-4" />

            <div className="mb-4 flex flex-col gap-[10px]">
                {selectedItems.map((item) => (
                    <div key={item.product.id} className="flex gap-[10px] items-center">
                        <img
                            src={item.product.images?.[0]?.url}
                            alt={item.product.name}
                            className="w-11 h-11 object-cover rounded-[6px]"
                        />
                        <div className="flex-1">
                            <p className="text-[13px] font-semibold text-[#252B42] m-0">
                                {item.product.name}
                            </p>
                            <p className="text-[12px] text-[#888] m-0">
                                {item.count} adet
                            </p>
                        </div>
                        <span className="text-[13px] font-bold text-[#252B42]">
                            {(item.product.price * item.count).toFixed(2)} ₺
                        </span>
                    </div>
                ))}
            </div>

            <hr className="mb-4" />

            <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between text-[14px] text-[#666]">
                    <span>Ürün Toplamı</span>
                    <span>{subtotal.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between text-[14px] text-[#666]">
                    <span>Kargo</span>
                    <span>{kargo === 0 ? "Ücretsiz" : `${kargo.toFixed(2)} ₺`}</span>
                </div>
                {subtotal > 150 && (
                    <div className="flex justify-between text-[13px] text-[#27ae60]">
                        <span>150 TL Üzeri Kargo Bedava</span>
                        <span>-29,99 ₺</span>
                    </div>
                )}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-[15px] text-[#252B42]">
                <span>Toplam</span>
                <span className="text-[#f27a1a]">{total.toFixed(2)} ₺</span>
            </div>

            {selectedItems.length === 0 && (
                <p className="text-[12px] text-[#e74c3c] mt-3 text-center">
                    Sepette seçili ürün bulunmuyor.
                </p>
            )}

            {showOrderButton && (
                <button
                    onClick={() => navigate("/order/create")}
                    disabled={selectedItems.length === 0}
                    className={`w-full mt-4 py-3 text-white border-none rounded-[8px] font-bold text-[15px] transition-[background] duration-200 ${selectedItems.length === 0 ? "bg-[#ccc] cursor-not-allowed" : "bg-[#f27a1a] cursor-pointer"
                        }`}
                >
                    Siparişi Onayla →
                </button>
            )}
        </div>
    );
}

export default SiparisOzeti;