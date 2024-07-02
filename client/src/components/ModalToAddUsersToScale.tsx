import { Button, Form, Modal, SelectPicker } from 'rsuite';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from '../services/axiosClient';
import Dayvid from '../assets/dayvid 1.png'
import Image from 'next/image';
import { Manrope } from 'next/font/google';
const manrope = Manrope({ subsets: ['latin'] })

export interface ImodalProps {
    modalIsOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function AddUsersToScaleModal({ modalIsOpen, setIsOpen }: ImodalProps) {
    const handleClose = () => setIsOpen(false);

    const quantityOfDaysOptions = [
        { label: 'SD', value: 'SD' },
        { label: 'SN', value: 'SN' },
    ];

    const [doctorInfo, setDoctorInfo] = useState({
        name: '',
        especiality: "",
        quantityOfDays: 'null', // Valor inicial atualizado para 'SD'
    });

    const handleInputChange = (name: string, value: string) => {
        setDoctorInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div className={manrope.className}  >
            <Modal className={manrope.className}
                backdrop={true} size="lg" open={modalIsOpen} onClose={handleClose}>
                
                
                <Modal.Header>
                    <h4 className='text-4xl font-semibold'>Adicionar Médicos na Escala</h4>
                </Modal.Header>
                <Modal.Body style={{ height: "80vh" }}>


                    <Form>
                        <div className='flex flex-col sm:flex-row flex-wrap gap-y-3.5 justify-between items-center'>
                            <Form.Group controlId="name">
                                <Form.ControlLabel className='font-medium' >Nome do Médico</Form.ControlLabel>
                                <Form.Control name="name" value={doctorInfo.name} />
                            </Form.Group>


                            <Form.Group>
                                <Form.ControlLabel className='font-medium'  >Especialidade</Form.ControlLabel>

                                <Form.Control name="speciality" value={doctorInfo.especiality} />
                            </Form.Group>



                            <Form.Group>

                                <Form.ControlLabel className='font-medium'  >Turno</Form.ControlLabel>
                                <SelectPicker
                                    searchable={false}
                                    value={doctorInfo.quantityOfDays}
                                    name="quantityOfDays"
                                    // onChange={handleScaleType}
                                    data={quantityOfDaysOptions}
                                />
                            </Form.Group>
                            <Form.Group>
                                {/* <Checkbox
                                    checked={doctorInfo.isAutoFilled}
                                    onChange={handleIsAutoFilledChange}>
                                    Preencher Automaticamente
                                </Checkbox> */}
                            </Form.Group>
                        </div>
                    </Form>



                    
                    <div title="Editar conta" className='flex flex-row flex-wrap items-center justify-start w-full gap-x-6 gap-y-4 ' >
                        
                        
                        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row  bg-green500' >
                        
                        <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

                        {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

                        <div className='flex flex-col cursor-pointer ' >

                            <p className='text-xl font-extrabold text-white '>
                                Dr. Dayvid Santos
                                {/* {userName} */}
                            </p>

                                <span className='text-gray-900 ' > Cardiologista</span>
                                <span className='text-slate-950 font-medium ' > 07:00 - 19:00</span>

                        </div>

                            
                            
                            
                        </div>

                        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

                            <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

                            {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

                            <div className='flex flex-col cursor-pointer ' >

                                <p className='text-xl font-extrabold text-black '>
                                    Dr. Dayvid Santos
                                    {/* {userName} */}
                                </p>

                                <span className='text-slate-500 ' > Cardiologista</span>
                                <span className='text-slate-500 ' > 07:00 - 19:00</span>

                            </div>




                        </div>
                        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

                            <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

                            {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

                            <div className='flex flex-col cursor-pointer ' >

                                <p className='text-xl font-extrabold text-black '>        
                                    Dr. Dayvid Santos
                                    {/* {userName} */}
                                </p>

                                <span className='text-slate-500 ' > Cardiologista</span>
                                <span className='text-slate-500 ' > 07:00 - 19:00</span>

                            </div>




                        </div>
                        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

                            <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

                            {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

                            <div className='flex flex-col cursor-pointer ' >

                                <p className='text-xl  text-black '>
                                    Dr. Dayvid Santos
                                    {/* {userName} */}
                                </p>

                                <span className='text-slate-500 ' > Cardiologista</span>
                                <span className='text-slate-500 ' > 07:00 - 19:00</span>

                            </div>




                        </div>
                        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

                            <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

                            {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

                            <div className='flex flex-col cursor-pointer ' >

                                <p className='text-xl font-extrabold text-black '>
                                    Dr. Dayvid Santos
                                    {/* {userName} */}
                                </p>

                                <span className='text-slate-500 ' > Cardiologista</span>
                                <span className='text-slate-500 ' > 07:00 - 19:00</span>

                            </div>




                        </div>
                    </div>
                    
                    
                    

                </Modal.Body>
                <Modal.Footer>
                    <button
                        className='ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white'
                        type="button"
                    >
                        Redefinir
                    </button>
                    <button
                        className='ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white'
                        type="button"
                    >
                        Adicionar Médicos
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
