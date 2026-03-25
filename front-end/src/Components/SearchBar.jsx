import { useState } from "react";

const PROPERTY_TYPES = [
    { value: "all", label: "ทุกประเภท" },
    { value: "Condominium", label: "คอนโด" },
    { value: "House", label: "บ้าน" },
    { value: "Townhouse", label: "ทาวน์เฮ้าส์" },
    { value: "Land", label: "ที่ดิน" },
];

const SearchBar = ({ onSearch, loading }) => {
    const [q, setQ] = useState("");
    const [type, setType] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e?.preventDefault();
        const params = {};
        if (q.trim()) params.q = q.trim();
        if (type !== "all") params.type = type;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (bedrooms) params.bedrooms = bedrooms;
        onSearch(params);
    };

    const handleReset = () => {
        setQ("");
        setType("all");
        setMinPrice("");
        setMaxPrice("");
        setBedrooms("");
        onSearch({});
    };

    const hasFilters = type !== "all" || minPrice || maxPrice || bedrooms;

    return (
        <div className="max-w-7xl mx-auto px-6 mb-8">
            {/* Search Input Row */}
            <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        🔍
                    </span>
                    <input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="ค้นหาโครงการ, ทำเล, คำอธิบาย..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition flex items-center gap-2 cursor-pointer
                        ${showFilters || hasFilters
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"}`}
                >
                    ⚙️ ตัวกรอง
                    {hasFilters && (
                        <span className="bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            !
                        </span>
                    )}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition cursor-pointer disabled:opacity-60"
                >
                    {loading ? "กำลังค้นหา..." : "ค้นหา"}
                </button>
            </form>

            {/* Filter Panel */}
            {showFilters && (
                <div className="mt-3 p-5 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* ประเภท */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">ประเภท</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {PROPERTY_TYPES.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* ราคาต่ำสุด */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">ราคาต่ำสุด (฿)</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="0"
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* ราคาสูงสุด */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">ราคาสูงสุด (฿)</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="ไม่จำกัด"
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* ห้องนอนขั้นต่ำ */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">ห้องนอนขั้นต่ำ</label>
                        <select
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">ทั้งหมด</option>
                            <option value="1">1+ ห้อง</option>
                            <option value="2">2+ ห้อง</option>
                            <option value="3">3+ ห้อง</option>
                            <option value="4">4+ ห้อง</option>
                        </select>
                    </div>

                    {/* ปุ่ม reset */}
                    {hasFilters && (
                        <div className="md:col-span-4 flex justify-end">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                            >
                                ✕ ล้างตัวกรองทั้งหมด
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
