import React from "react";

let Row = (props) => {
    const [manufacturer, setManufacturer] = React.useState(props.car.manufacturer);
    const [model, setModel] = React.useState(props.car.model);
    const [year, setYear] = React.useState(props.car.year);
    const [price, setPrice] = React.useState(props.car.price);

    const [buttonState, setBtnState] = React.useState("edit");
    const [readOnlyState, setReadOnlyState] = React.useState(true);

    let modelRef = React.createRef();
    let manufacturerRef = React.createRef();
    let yearRef = React.createRef();
    let priceRef = React.createRef(); 

    let editCar = () =>{
        if(buttonState === "edit"){
            setBtnState("save");
            setReadOnlyState(false);
        }
        else {
            let dataCorrect = props.carDataUpdate(props.car._id, manufacturer, model, year, price)
            if(dataCorrect)
            {
                setBtnState("edit");
                setReadOnlyState(true);
            }
        }
    }
    let deleteCar = () =>{
        props.deleteCar(props.car._id)
    }
return(
    <tr>
        <td>
            <input value={manufacturer} ref={manufacturerRef} readOnly={readOnlyState} onChange={() => setManufacturer(manufacturerRef.current.value)} ></input>
        </td>
        <td>
            <input value={model} ref={modelRef} readOnly={readOnlyState} onChange={() => setModel(modelRef.current.value)}></input>
        </td>
        <td>
            <input value={year} type="number" ref={yearRef} readOnly={readOnlyState} onChange={() => setYear(yearRef.current.value)}></input>
        </td>
        <td>
            <input value={price} type="number" ref={priceRef} readOnly={readOnlyState} onChange={() => setPrice(priceRef.current.value)}></input>
        </td>
        <td>
            <input type="button" onClick={editCar} value={buttonState}></input>
        </td>
        <td>
            <input type="button" onClick={deleteCar} value='delete'></input>
        </td>
    </tr>                        
);
}

export default Row;