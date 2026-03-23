import { useState } from "react"
import { createproperty } from "../Service/api";

const ModalAddProperty = ({onClose , onSuccess}) => {
    const [from , setfrom] = useState({
        title:"",
        price:"",
        oldPrice:"",
        description:"",
        type:"Condominium",
        bedrooms:"",
        bathrooms:"",
        landSize:"",
        areaSize:"",
        badge:"Featured",

    });

    const [image , serImage]  = useState(null);

    const handleSubmit = async () => {
        if(!form.title || !form.price) {
            return alert("กรุณากรอกชื่อเเละราคา")
        }try {
            const formData = new FormData();
          
            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            if (image) {
                formData.append("image" , image);
            }

            await createproperty(formData);
            await onSuccess();
                onClose();

        } catch (err) {
            console.log(err);
            alert("เกิดข้อผิดพลาด");

        }
    };   

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl  overflow-auto max-h-[90vh]">

            </div>
        </div>
    )

    } 
    


export default ModalAddProperty