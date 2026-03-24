import { useState } from "react"
import { createproperty } from "../Service/api";

const ModalAddProperty = ({onClose , onSuccess}) => {
    const [form , setForm] = useState({
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

    const [image , setImage]  = useState(null);

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
                    <div className=" flex justify-between items-center">
                        <h2 className="text-2xl font-bold  text-gray-800">เพิ่มประกาศ</h2>
                        <button onClick={onClose} className=" text-gray-500 hover:text-red-500 cursor-pointer">X</button>
                    </div>
                             {/*  Input เเบบ grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-sm font-medium">ชื่อประกาศ</label>
                            <input 
                                    className="w-full border rotate-lg p-2 mt-1 outline-none focus:ring-2 focus:right-blue-500"
                                    placeholder="ชื่อ"
                                    onChange={e => setForm({...form, title: e.target.value})} />
                        </div>

                        <div>
                            <label className="text-sm font-medium">ราคา</label>
                            <input 
                                    type="number"
                                    className="w-full border rounded-lg p-2 mt-1"
                                    placeholder="ราคา" 
                                    onChange={e => setForm({...form , price: e.target.value })}/>
                        </div>

                        <div>
                            <label className="text-sm font-medium">ราคาเดิม (ถ้ามี)</label>
                            <input      
                                        type="number"
                                    className="w-full border rounded-lg p-2 mt-1"
                                        placeholder="ราคาเดิม"
                                        onChange={e => setForm({...form , oldPrice: e.target.value})} />
                        </div>

                        <div className="col-span-2">
                            <label className="text-sm font-medium">สถานที่</label>
                            <input 
                                    className="w-full border rounded-lg p-2 mt-1"
                                     onChange={e => setForm({...form , location: e.target.value})}/>
                        </div>
                            
                            <div>
                                <label className="text-sm font-medium">ประเภท</label>
                                <select className="w-full border rounded-lg p-2 mt-1 cursor-pointer" 
                                        onChange={e => setForm({...form, type: e.target.value})}>
                                        <option>Condominium</option>
                                        <option>House</option>
                                        <option>Townhouse</option>
                                        </select>
                            </div>

                            <div>
                                <label  className="text-sm font-medium">ห้องนอน</label>
                                <input 
                                        type="number"
                                className="w-full border rounded-lg p-2 mt-1"
                                placeholder="0"
                                onChange={e => setForm({...form, bedrooms: e.target.value})} />
                            </div>

                            <div>
                                <label className="txt-sm font-medium">ห้องน้ำ</label>
                                <input 
                                        type="number"
                                        className="w-full border rounded-lg p-2 mt-1"
                                        placeholder="0"
                                        onChange={e => setForm({...form, bathrooms: e.target.value})} />
                            </div>

                            <div>
                                <label className="text-sm font-medium">พื้นที่ (ตร.ว)</label>
                                <input 
                                        type="number"
                                        className="w-full border rounded-lg p-2 mt-1" 
                                        placeholder="ตร.ว"
                                        onChange={e => setForm({...form, landSize: e.target.value})}/>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium">พื้นที่ (ตร.ม)</label>
                                <input 
                                type="number"
                                className="w-full border rounded-lg p-2 mt-1"
                                placeholder="ตร.ม"
                                onChange={e => setForm({...form, areaSize: e.target.value})} />
                            </div>

                    </div>

                            <div>
                                <label className="text-sm font-medium">รายละเอียด</label>
                                   <textarea 
                                   className="w-full border rounded-lg p-2 mt-1 h-24"
                                   placeholder="รายละเอียดเพิ่มเติม..."
                                   onChange={e => setForm({...form, description: e.target.value})}>

                                   </textarea>
                            </div>

                            <div>
                                <label className="text-sm font-medium block mb-1">รูปภาพ</label>
                                <input 
                                type="file" 
                                className="w-full border rounded-lg p-2 mt-1 cursor-pointer"
                                onChange={e => setImage(e.target.files[0])}/>
                            </div>

                            <button 
                                    onClick={handleSubmit}
                                    className="bg-black hover:bg-gray-600 text-white font-bold py-3 rounded-lg w-full transition discrete-200 shadow-md cursor-pointer">บันทึกประกาศ

                            </button>
                    
            </div>
        </div>
    );

    } ;
    


export default ModalAddProperty;