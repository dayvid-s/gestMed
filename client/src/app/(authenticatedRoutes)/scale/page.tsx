"use client";
import { ScaleBackendModel } from "@/@types/scaleTypes";
import { ChoiceScale } from "@/components/ChoiceScale";
import { ScalesModel } from "@/components/ModelScales";
import { useState } from "react";


export default function Scale() {
  const [actualModelScaleInfo, setActualModelScaleInfo] = useState<ScaleBackendModel | null>(null);


  return (
    <div className='m-auto mb-20 max-w-screen-2xl'  >
      <h4 className='mb-5 text-3xl font-semibold ' >Modelos de Escala</h4>

      <ChoiceScale actualModelScaleInfo={actualModelScaleInfo} setActualModelScaleInfo={setActualModelScaleInfo} />

      <ScalesModel actualModelScaleInfo={actualModelScaleInfo} setActualModelScaleInfo={setActualModelScaleInfo} />

    </div>
  );
}