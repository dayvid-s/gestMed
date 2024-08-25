import { Dispatch, SetStateAction } from "react";
import { Form } from "rsuite";


interface searchForDoctorProps {
  setQueryInfo: Dispatch<SetStateAction<{
    name: string;
    especiality: string;
  }>>;

  queryInfo: {
    name: string;
    especiality: string;
  }

}


export function SearchForDoctor({ queryInfo, setQueryInfo }: searchForDoctorProps) {

  const handleInputChange = (name: string, value: string) => {
    setQueryInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (

    <Form>
      <div className="flex flex-col flex-wrap items-baseline sm:flex-row ">
        <Form.Group controlId="name">
          <Form.ControlLabel className="font-medium ">
            Nome do Médico
          </Form.ControlLabel>
          <Form.Control
            name="name"
            value={queryInfo.name}
            onChange={(value) => handleInputChange("name", value)}
          />
        </Form.Group>
        <Form.Group className="ml-10" >
          <Form.ControlLabel className=" mlfont-medium">
            Especialidade
          </Form.ControlLabel>
          <Form.Control
            name="speciality"
            value={queryInfo.especiality}
            onChange={(value) => handleInputChange("especiality", value)}
          />
        </Form.Group>
      </div>
    </Form>
  )

}