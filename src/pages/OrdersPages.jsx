import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { orderApi } from "../api/orderApi";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openOrder, setOpenOrder] = useState(null);

    useEffect(() => {
        orderApi.getOrders()
            .then((data) => setOrders(Array.isArray(data) ? data : data.data || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Header />
            <div className="max-w-[900px] mx-auto px-4 py-8 font-sans">
                <h1 className="text-[22px] font-bold mb-6">Siparişlerim</h1>

                {loading && <p className="text-[#888]">Yükleniyor...</p>}

                {!loading && orders.length === 0 && (
                    <p className="text-[#888]">Henüz siparişiniz bulunmamaktadır.</p>
                )}

                {!loading && orders.map((order) => (
                    <div key={order.id} className="border border-[#ddd] rounded-[10px] mb-4 overflow-hidden">

                        <div
                            onClick={() => setOpenOrder(openOrder === order.id ? null : order.id)}
                            className={`flex justify-between items-center px-5 py-4 cursor-pointer ${openOrder === order.id
                                    ? "bg-[#fff8f3] border-b border-[#ddd]"
                                    : "bg-white border-b-0"
                                }`}
                        >
                            <div className="flex gap-8">
                                <div>
                                    <p className="m-0 text-[12px] text-[#888]">Sipariş No</p>
                                    <p className="m-0 font-bold">#{order.id}</p>
                                </div>
                                <div>
                                    <p className="m-0 text-[12px] text-[#888]">Tarih</p>
                                    <p className="m-0 font-semibold">
                                        {new Date(order.order_date).toLocaleDateString("tr-TR")}
                                    </p>
                                </div>
                                <div>
                                    <p className="m-0 text-[12px] text-[#888]">Tutar</p>
                                    <p className="m-0 font-semibold text-[#f27a1a]">
                                        {order.price?.toFixed(2)} ₺
                                    </p>
                                </div>
                            </div>
                            <span className="text-[18px] text-[#888]">
                                {openOrder === order.id ? "▲" : "▼"}
                            </span>
                        </div>

                        {openOrder === order.id && (
                            <div className="px-5 py-4 bg-[#fafafa]">
                                <table className="w-full border-collapse text-[14px]">
                                    <thead>
                                        <tr className="border-b-2 border-[#eee]">
                                            <th className="text-left px-3 py-2 text-[#555]">Ürün</th>
                                            <th className="text-center px-3 py-2 text-[#555]">Adet</th>
                                            <th className="text-right px-3 py-2 text-[#555]">Fiyat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products?.map((item, i) => (
                                            <tr key={i} className="border-b border-[#eee]">
                                                <td className="px-3 py-[10px]">
                                                    <p className="m-0 font-semibold">{item.name || `Ürün #${item.product_id}`}</p>
                                                    {item.detail && <p className="m-0 mt-[2px] text-[12px] text-[#888]">{item.detail}</p>}
                                                </td>
                                                <td className="text-center px-3 py-[10px]">{item.count}</td>
                                                <td className="text-right px-3 py-[10px] text-[#f27a1a] font-semibold">
                                                    {item.price ? `${(item.price * item.count).toFixed(2)} ₺` : "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2} className="p-3 text-right font-bold">Toplam:</td>
                                            <td className="p-3 text-right font-bold text-[#f27a1a] text-[16px]">
                                                {order.price?.toFixed(2)} ₺
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}