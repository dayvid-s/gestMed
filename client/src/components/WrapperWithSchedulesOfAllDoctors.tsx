
export function WrapperWithSchedulesOfAllDoctors() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1;
  const totalDiasMes = new Date(ano, mes, 0).getDate();
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dias = Array.from({ length: totalDiasMes }, (_, i) => i + 1);
  const diasDaSemana = ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"];
  return (
    <div className='bg-[#F8F8F8] items-center flex b rounded-lg flex-col	  '  >

      <h1 className='text-3xl font-extrabold ' >
        Plantões de &lt;{meses[mes]}&gt;
      </h1>

      <div className='flex flex-wrap items-start justify-center mt-5'>
        {dias.map((dia) =>

          // aqui a coluna 
          <div className='flex flex-col ' key={dia}>




            {/* aqui os 2 textos que indicam a semana  */}
            <div className='flex justify-between px-3 w-60 bg-green500 ' >
              <h4 className='text-white ' >{diasDaSemana[new Date(ano, mes - 1, dia).getDay()]}</h4>
              <h4 className='text-white ' >{dia.toString().padStart(2, "0")}/{mes.toString().padStart(2, "0")}</h4>
            </div>


            {/* aqui os cards com info do plantao */}

            <div className='border-r-2	p-2	border-[#e2e2e2]  '  >
              <div
                title="Mostrar informações desse plantão"
                className=' p-2 bg-[#C4E7E7] border-l-8 cursor-pointer	border-[#025959]	   rounded-r-lg		min-h-20		 ' >

                <p className='font-bold '>Dr. Dayvid Santos </p>
                <p className='font-bold '>07:00 - 19:00 (SD/SN)</p>
                <p  >Cardiologista</p>
              </div>
            </div>


            <div className='border-r-2	p-2	border-[#e2e2e2]'  >
              <div
                title="Mostrar informações desse plantão"
                className=' p-2 bg-[#C4E7E7] border-l-8 cursor-pointer	border-[#025959]	   rounded-r-lg		min-h-20		 ' >

                <p className='font-bold '>Dr. Dayvid Santos </p>
                <p className='font-bold '>07:00 - 19:00 (SD/SN)</p>
                <p  >Cardiologista</p>
              </div>
            </div>


            <div className='border-r-2	p-2	border-[#e2e2e2]'  >
              <div
                title="Mostrar informações desse plantão"
                className=' p-2 bg-[#C4E7E7] border-l-8 cursor-pointer	border-[#025959]	   rounded-r-lg		min-h-20		 ' >

                <p className='font-bold '>Dr. Dayvid Santos </p>
                <p className='font-bold '>07:00 - 19:00 (SD/SN)</p>
                <p  >Cardiologista</p>
              </div>
            </div>

            <div className='border-r-2	p-2	border-[#e2e2e2]'  >
              <div
                title="Mostrar informações desse plantão"
                className=' p-2 bg-[#C4E7E7] border-l-8 cursor-pointer	border-[#025959]	   rounded-r-lg		min-h-20		 ' >

                <p className='font-bold '>Dr. Dayvid Santos </p>
                <p className='font-bold '>07:00 - 19:00 (SD/SN)</p>
                <p  >Cardiologista</p>
              </div>
            </div>

          </div>
        )}
      </div>


    </div>
  );
}
