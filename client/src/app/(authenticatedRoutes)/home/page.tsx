"use client";

// import { Welcome } from '../../../components/Welcome';
import { WrapperWithSchedulesOfAllDoctors } from "../../../components/WrapperWithSchedulesOfAllDoctors";


export default function Page() {

  return (
    <div >
      {/* <Welcome /> */}

      <section className='mt-4 '>
        <WrapperWithSchedulesOfAllDoctors />

      </section>
    </div>
  );
}

