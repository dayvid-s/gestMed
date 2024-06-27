import React, { Dispatch, SetStateAction } from 'react';
import { Checkbox, Form } from 'rsuite';
import { SelectPicker } from 'rsuite';
import { ScaleData, QuantityOfDaysTypes } from '@/@types/scaleTypes';

type UserFormProps = {
    handleInputChange: Dispatch<SetStateAction<ScaleData>>;
    scaleData: ScaleData;
    handleScaleType: (value: QuantityOfDaysTypes | null) => void;
    handleIsAutoFilledChange: () => void;
};

export function CreateScaleForm({ handleInputChange, scaleData,
    handleScaleType,
    handleIsAutoFilledChange
}: UserFormProps) {

    const handleInput = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        handleInputChange(prevState => ({ ...prevState, [name]: value }));
    };

    const quantityOfDaysOptions = [
        { label: "7 dias", value: 7 as QuantityOfDaysTypes },
        { label: "30 dias", value: 30 as QuantityOfDaysTypes }
    ];

    return (
        <Form>
            <div className='flex flex-col sm:flex-row flex-wrap gap-6 justify-start align-baseline'>
                <Form.Group controlId="name">
                    <Form.ControlLabel>Nome da Escala</Form.ControlLabel>
                    <Form.Control name="name" value={scaleData.name} onChange={handleInput} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Tipo de Escala</Form.ControlLabel>
                    <SelectPicker
                        searchable={false}
                        value={scaleData.quantityOfDays}
                        name="quantityOfDays"
                        onChange={handleScaleType}
                        data={quantityOfDaysOptions}
                    />
                </Form.Group>
                {/* <Form.Group>
                    <Checkbox
                        checked={scaleData.isAutoFilled}
                        onChange={handleIsAutoFilledChange}>
                        Preencher Automaticamente
                    </Checkbox>
                </Form.Group> */}
            </div>
        </Form>
    );
}
