export default function AddressCard({
    addr,
    selected,
    onSelect,
    onEdit,
    onDelete,
}) {
    return (
        <div
            onClick={() => onSelect(addr.id)}
            className={`relative mb-[10px] cursor-pointer rounded-[8px] p-[14px_16px] transition-[border-color,background] duration-200 ${selected
                    ? "border-2 border-[#f27a1a] bg-[#fff8f2]"
                    : "border-[1.5px] border-[#ddd] bg-white"
                }`}
        >
            <div className="mb-1 flex items-center gap-2">
                <input
                    type="radio"
                    readOnly
                    checked={selected}
                    className="accent-[#f27a1a]"
                />

                <span className="text-[14px] font-bold text-[#333]">
                    {addr.title}
                </span>
            </div>

            <div className="ml-6 text-[13px] leading-[1.6] text-[#555]">
                <div>
                    {addr.name} {addr.surname} · {addr.phone}
                </div>

                <div>
                    {addr.neighborhood}, {addr.district}, {addr.city}
                </div>

                <div>{addr.address}</div>
            </div>

            <div className="absolute right-[10px] top-[10px] flex gap-[10px]">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(addr);
                    }}
                    className="cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-[#f27a1a]"
                >
                    Düzenle
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(addr.id);
                    }}
                    className="cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-[#c0392b]"
                >
                    Sil
                </button>
            </div>
        </div>
    );
}