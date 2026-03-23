import PropertyCard from "./PropertyCard";

const PropertyList = ({data}) => {
    return(
        <div className="max-w-7xl mx-auto px-6">
                {data && data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((item) => (
                            <PropertyCard key={item._id || item.id} property={item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center py-20">
                            <p> ยังไม่มีข้อมูล</p>
                    </div>
                )}
        </div>
    );

};

export default PropertyList