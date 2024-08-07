import  Api  from "../Api/Api.js";
import React, { useEffect } from "react";
import Row from "./Row.jsx";
import "./Grid.css"

let Grid = () => {
    const [cars, setCars] = React.useState([]);

    useEffect(() => {
        Api.getInstance().getCars().then(
            (res) => setCars(res)
        )
    }, [])
    
    let carDataError = (manufacturer, model, year, price) =>{
        let errState = false;
        if(manufacturer.length === 0){
            errState = true;
        }

        if(model.length === 0){
            errState = true;
        }

        if(year.toString().length === 0){
            errState = true;
        } 
        else if(year < 1885 || year > new Date().getFullYear()){
            errState = true;
        }
        if(price.toString().length === 0){
            errState = true;
        }
        else if(price < 0 ){
            errState = true;
        }
        return errState;
    }

    let onSaveFormClick = () =>{
        const form = document.forms["carForm"];
        const manufacturer = form.elements["manufacturer"].value;
        const model = form.elements["model"].value;
        const year = form.elements["year"].value;
        const price = form.elements["price"].value;
        const carErrState = carDataError(manufacturer, model, year, price);

        if(!carErrState){
            Api.getInstance().createCar(manufacturer, model, year, price);
        }

    }

    let carDataUpdate = (carId, carManufacturer, carModel, carYear, carPrice) =>{
        const carErrState = carDataError(carManufacturer, carModel, carYear, carPrice);
        if(!carErrState){
            Api.getInstance().editCar(carId, carManufacturer, carModel, carYear, carPrice);
            return true;
        }
        else{
            alert("Wrong car data");
            return false;
        }
    }

    let DeleteCar = (carId) => {
        Api.getInstance().deleteCar(carId).then((res) => {
            setCars(cars.filter((carFilt)=> carFilt._id !== res._id))
        });
    }

    return(
    <div>
        <form name='carForm' className="form">
            <p>
                <label>Manufacturer(at least 1 character):</label><br/>
                <input name="manufacturer" type="text" />
            </p>
            <p>
                <label>Model(at least 1 character):</label><br/>
                <input name="model" type="text"/>
            </p>
            <p>
                <label>Year(from 1885 to the current year):</label><br/>
                <input name="year" type="number" />
            </p>
            <p>
                <label>Price(no less than 0):</label><br/>
                <input name="price" type="number"/>
            </p>
            <p>
                <input type="submit" value="Save" onClick={onSaveFormClick}></input>
            </p>
        </form>

        <table className="table">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    cars.map(car => {
                        return(
                            <Row key={car._id}
                                car={car}
                                carDataUpdate={carDataUpdate}
                                deleteCar={DeleteCar}
                                carDataError={carDataError}/>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    );
}
export default Grid;