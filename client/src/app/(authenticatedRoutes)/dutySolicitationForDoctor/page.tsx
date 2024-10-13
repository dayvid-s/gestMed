"use client";

import { InfoOfSolicitation } from "@/components/solicitations/InfoOfSolicitation";
import { ListOfSolicitations } from "@/components/solicitations/ListOfSolicitations";
import { ListOfOldSolicitations } from "@/components/solicitations/ListOldSolicitations";
import { fetchConfiguration } from "@/features/configurationSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DutySolicitationForDoctor() {
  const dispatch = useDispatch<AppDispatch>();
  const configuration = useAppSelector((state) => state.configuration.configurations);

  useEffect(() => {
    dispatch(fetchConfiguration());
  }, [dispatch]);


  return (
    <div className="m-auto mb-20 max-w-screen-2xl">
      <h4 className='mb-5 text-3xl font-semibold mt-2' >Solicitações de Plantão</h4>

      <InfoOfSolicitation />




      <ListOfSolicitations />

      <ListOfOldSolicitations />





    </div>
  );
}
