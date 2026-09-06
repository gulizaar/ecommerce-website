import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const genderMap = { k: "kadin", e: "erkek" };

function ShopCard() {
    const categories = useSelector((state) => state.category?.categories || []);

    // Rating'e göre sırala, en iyi 5'i al
    const top5 = [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    if (top5.length === 0) return null;

    const [first, second, third, fourth, fifth] = top5;

    const CardButton = ({ category }) => (
        <Link
            to={`/shop/${genderMap[category.gender]}/${category.title}/${category.id}`}
            className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 text-sm no-underline font-semibold shadow-md hover:bg-black hover:text-white transition duration-300"
        >
            {category.title}
        </Link>
    );

    return (
        <div className="flex flex-col px-10 md:px-0">
            <div className="mt-10 text-center">
                <h2 className="text-[rgba(37,43,66,1)] font-bold">EDITOR'S PICK</h2>
                <p className="text-[rgba(115,115,115,1)] font-bold">
                    Problems trying to resolve the conflict between
                </p>
            </div>

            <div className="max-w-5xl mx-auto mt-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* 1. Kart - Büyük sol */}
                    {first && (
                        <div className="relative md:col-span-5">
                            <img src={first.img} alt={first.title} className="w-full h-full object-cover" />
                            <CardButton category={first} />
                        </div>
                    )}

                    {/* 2. Kart - Orta */}
                    {second && (
                        <div className="relative md:col-span-4">
                            <img src={second.img} alt={second.title} className="w-full h-full object-cover" />
                            <CardButton category={second} />
                        </div>
                    )}

                    {/* 3-4-5. Kartlar - Sağ sütun */}
                    <div className="flex flex-col gap-4 md:col-span-3">
                        {[third, fourth, fifth].filter(Boolean).map((category) => (
                            <div key={category.id} className="relative">
                                <img src={category.img} alt={category.title} className="w-full object-cover" />
                                <CardButton category={category} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShopCard;