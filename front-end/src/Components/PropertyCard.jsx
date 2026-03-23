const PropertyCard = ({property}) => {
    const imageUrl = property?.image
    ? `http://localhost:5000/uploads/${property.image}`
    : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914";

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
                            <div>
                                
                            </div>
                        </div>


                    </div>
                )


}

export default PropertyCard