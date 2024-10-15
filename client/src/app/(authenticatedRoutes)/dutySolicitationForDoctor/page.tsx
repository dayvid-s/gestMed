"use client";

import { InfoOfSolicitation } from "@/components/solicitations/InfoOfSolicitation";
import { ListOfSolicitations } from "@/components/solicitations/ListOfSolicitations";
import { ListOfOldSolicitations } from "@/components/solicitations/ListOldSolicitations";
import { fetchConfiguration } from "@/features/configurationSlice";
import { getAllSolicitationsFromUser } from "@/features/dutySolicitationSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function DutySolicitationForDoctor() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.dutySolicitation);
  const [solicitations, setSolicitations] = useState<any[]>([]);

  const configuration = useAppSelector((state) => state.configuration.configurations);


  useEffect(() => {
    if (user) {
      dispatch(getAllSolicitationsFromUser({ user: user })).then((action: any) => {
        if (action.payload) {
          setSolicitations(action.payload);
        }
      });
    }
    dispatch(fetchConfiguration());
  }, [user, dispatch]);

  if (loading) {
    return <p>Carregando solicitações...</p>;
  }

  if (error) {
    return <p>Erro ao carregar solicitações: {error}</p>;
  }

  return (
    <div className="m-auto mb-20 max-w-screen-2xl">
      <h4 className="mb-5 text-3xl font-semibold mt-2">Solicitações de Plantão</h4>

      <InfoOfSolicitation />

      {solicitations?.length ? (
        <>
          <ListOfSolicitations solicitations={solicitations} />
          <ListOfOldSolicitations />
        </>
      ) : (
        <p>Você não possui solicitações ativas no momento.</p>
      )}
    </div>
  );
}