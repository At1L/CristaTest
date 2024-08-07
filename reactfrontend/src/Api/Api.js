

export default class Api {
    BASE_URL = 'http://localhost:4000';
    static instance = null;

    static getInstance(){
        if(Api.instance !== null){
            return Api.instance;
        }
        else {
            Api.instance = new Api();
            return Api.instance;
        }
    }
    async getCars() {
        try{
            const response = await fetch("http://localhost:4000/api/cars", {
            method: "GET",
            headers: { "Accept": "application/json" }});

            return response.json();
        } catch(error){
            console.log(error);
        }   
    }
    
    // Добавление пользователя
    async createCar(carManufacturer, carModel, carYear, carPrice) {
        try{
            const response = await fetch("http://localhost:4000/api/cars", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    manufacturer: carManufacturer,
                    model: carModel,
                    year: parseInt(carYear, 10),
                    price: parseInt(carPrice, 10)
                })
            });
        } catch(error){
            console.log(error);
        }   
    }
    // Изменение пользователя
    async editCar(carId, carManufacturer, carModel, carYear, carPrice) {
        try {
            const response = await fetch("http://localhost:4000/api/cars", {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: carId,
                    manufacturer: carManufacturer,
                    model: carModel,
                    year: parseInt(carYear, 10),
                    price: parseInt(carPrice, 10)
                })
            });
        } catch(error){
            console.log(error)
        }
    }
    
    // Удаление пользователя
    async deleteCar(id) {
        try{
            const response = await fetch("http://localhost:4000/api/cars/" + id, {
                method: "DELETE",
                headers: { "Accept": "application/json" }
            });
            return response.json();
        } catch(error){
            console.log(error);
        }
        
    }
}