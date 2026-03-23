import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar";
import { getproperties } from "../Service/api";
import PropertyList from "../Components/PropertyList";
import ModalAddProperty from "../Components/ModalAddProperty";




const Home = () => {
        const [open , setOpen] = useState(false);

        const [properties , setProperties] = useState([]);

        useEffect(() => {
            fetchData();
        }, []);

       const fetchData = async () => {
        try {
                const res = await getproperties();     
                console.log("API", res.data);     

                if(Array.isArray(res.dara)) {
                    setProperties(res.data);

                }else if (Array.isArray(res.data.data)) {
                    setProperties(res.data.data);

                }else {
                        setProperties([])
                } 
                    
        }catch (err) {
            console.error("Fetch Error", err)
        }
       }


    return (
        <div className="bg-white min-h-screen fron-sans">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between item-end ">
                <div>
                        <h1 className="text-4xl font-black text-gray-900">Propety</h1>
                        <p className="">ค้นหาบ้านและคอนโดในฝันของคุณ</p>
                </div>
                        <button onClick={() =>setOpen(true)}
                            className="bg-black text-white px-8 py-3 rounded-xl font-bold cursor-pointer">
                                +เพิ่มรายการ
                        </button>
                 </div>

                 {open && (
                    <ModalAddProperty onClose={() => setOpen(false)}
                    onSuccess={fetchData} />
                 )}
            <div className="pb-20">
                <PropertyList data={properties} />
            </div>
           
        </div>
    )
}

export default Home