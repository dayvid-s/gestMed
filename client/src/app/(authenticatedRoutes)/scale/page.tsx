"use client";
import { ChoiceScale } from "@/components/ChoiceScale";
import { ScalesModel } from "@/components/ModelScales";


export default function Scale() {



  return (
    <div className='m-auto mb-20 max-w-screen-2xl'  >
      <h4 className='mb-5 text-3xl font-semibold ' >Modelos de Escala</h4>

      <ChoiceScale />

      <ScalesModel />
    </div>
  );
}