"use client";

import { DutySolicitation } from "@/@types/dutySolicitationtypes";
import { InfoOfSolicitation } from "@/components/solicitations/InfoOfSolicitation";
import { ListOfSolicitations } from "@/components/solicitations/ListOfSolicitations";
import { ListOfOldSolicitations } from "@/components/solicitations/ListOldSolicitations";
import { fetchConfiguration } from "@/features/configurationSlice";
import { getAllSolicitationsFromUser } from "@/features/dutySolicitationSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface SolicitationsState {
  previousSolicitations: DutySolicitation[];
  actualSelectedSolicitation: DutySolicitation | null;
  recentSolicitations: DutySolicitation[];
}

export default function DutySolicitationForDoctor() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.dutySolicitation);
  const [solicitations, setSolicitations] = useState<SolicitationsState>({
    previousSolicitations: [],
    actualSelectedSolicitation: null,
    recentSolicitations: [],
  });

  useEffect(() => {
    if (user) {
      dispatch(getAllSolicitationsFromUser({ user: user })).then((action) => {
        if (Array.isArray(action.payload)) {
          setSolicitations((prevState) => ({
            ...prevState,
            recentSolicitations: action.payload.slice(0, 10) || [],
            previousSolicitations: action.payload.slice(10) || [],
            actualSelectedSolicitation: prevState.actualSelectedSolicitation,
          }));
        } else {
          console.error("Erro ao carregar solicitações:", action.payload);
        }
      });
    }
    dispatch(fetchConfiguration());
  }, [user, dispatch]);


  const updateActualSelectedSolicitation = (solicitation: DutySolicitation) => {
    setSolicitations((prevState) => ({
      ...prevState,
      actualSelectedSolicitation: solicitation,
    }));
  };


  if (loading) {
    return <p>Carregando solicitações...</p>;
  }

  if (error) {
    return <p>Erro ao carregar solicitações: {error}</p>;
  }

  return (
    <div className="m-auto mb-20 max-w-screen-2xl">
      <h4 className="mb-5 text-3xl font-semibold mt-2">Solicitações de Plantão</h4>
      {solicitations.actualSelectedSolicitation &&
        <InfoOfSolicitation solicitation={solicitations.actualSelectedSolicitation} />
      }

      {solicitations.recentSolicitations.length ? (
        <>
          <ListOfSolicitations
            solicitations={solicitations.recentSolicitations}
            updateActualSelectedSolicitation={updateActualSelectedSolicitation}

          />
          <ListOfOldSolicitations
            solicitations={solicitations.previousSolicitations}
            updateActualSelectedSolicitation={updateActualSelectedSolicitation}

          />
        </>
      ) : (
        <p>Você não possui solicitações ativas no momento.</p>
      )}
    </div>
  );
}