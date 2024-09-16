"use client";

import { fetchConfiguration, updateConfiguration } from "@/features/configurationSlice";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DutySolicitationForCoordinator() {
  const dispatch = useDispatch<AppDispatch>();
  const configuration = useSelector((state: RootState) => state.configuration.configurations);
  const loading = useSelector((state: RootState) => state.configuration.loading);

  useEffect(() => {
    dispatch(fetchConfiguration());
  }, [dispatch]);

  const handleCheckboxChange = (checked: boolean) => {
    dispatch(updateConfiguration({ should_cordinator_aprove_duties: checked }));
  };

  return (
    <div className="flex  bg-gray-50">
      <section className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transition-opacity duration-500 ease-in-out">
        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={configuration?.should_cordinator_aprove_duties || false}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className="h-6 w-6 text-blue-600 focus:ring-blue-500 rounded border-gray-300 transition duration-300 ease-in-out"
              />
              <label className="text-lg text-gray-700">
                Todos plantões precisam ser aprovados pelo coordenador
              </label>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
