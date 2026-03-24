const PropertyCard = ({property}) => {
    const imageUrl = property?.image
    ? `http://localhost:5000/uploads/${property.image}`
    : "";

    const discount = property?.oldPrice > 0
                ? Math.round(
                    ((property.oldPrice - property.price) / 
                property.oldPrice) * 100
                ) :0;

                return(
                    <div className="bg-white rounded-[1.5rem] shadow-sm border-gray-100 overflow-hidden hover:shadow-xl  transition-all duration-300 group cursor-pointer">
                            {/*image */}

                        <div className="relative h-60 overflow-hidden">
                                <img src={imageUrl} 
                                alt="property"
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500 " />
                        
                            {/* badge */}
                            <div className="absolute top-4 left-4 bg-amber-400 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow ">
                                    {property?.badge || "Featured"}
                            </div>
                        
                        </div>

                         {/*content */}
                        <div className="p-5">
                            <div className="flex gap-2 mb-3 flex-wrap">
                                <span className="bg-blue-50 text-blue-600 text[11px] font-bold px-3 py-1 rounded-full border border-blue-100">
                                    {property?.type || "Condominium"}
                                </span>

                                <span className="bg-gray-50 text-gray-500 text-[11px] px-3 py-1 rounded-full border border-gray-100">
                                    {property?.bedrooms || 0} ห้องนอน
                                </span>

                                <span className="bg-gray-50 text-gray-500 text-[11px] px-3 py-1 rounded-full border border-gray-100">
                                    {property?.bathrooms || 0}ห้องน้ำ
                                </span>
                            </div>

                                {/*size */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text[10px] text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-full">
                                        {property?.landSize || 0} ตร.ว.
                                    </span>

                                    <span className="text[10px] text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-full">
                                        {property?.areaSize || 0} ตร.ม.
                                    </span>

                                    <span className="text-[10px] text-gray-500 bg-white border border-gray-200 px-2 py-2 rounded-full">
                                            {property?.price
                                            ? Math.round(property.price / (property.areaSize || 1)).toLocaleString()
                                            : 0}บ./ตร.ม
                                    </span>
                            </div>

                            {/*title */}
                            <h3 className="text-lg font-bold text-gray-800 leading-tight truncate">
                               {property?.title || "project name"} 
                            </h3>
                                {/*location */}
                            <p className="text-xs text-gray-400 mt-1 mb-4">
                                    {property?.location ||  "Location"}
                            </p>

                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-[#2d6bef]">
                                        ฿{property?.price?.toLocaleString() || 0}
                                </span>
                                {discount > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">

                                    </span>
                                )}
                            </div>
                            {/*old price */}
                            {property?.oldPrice > 0 && (
                                <p className="text-[11px] text-gray-300 line-through mt-1 font-medium">
                                    ฿{property.oldPrice.toLocaleString()}
                                    </p>
                            )}
                        </div>


                    </div>
                );


};

export default PropertyCard;