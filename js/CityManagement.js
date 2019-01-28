CityManagement = {
    addCity: function(xPoint, yPoint){
        let tmpCity = new City(xPoint, yPoint);
        ApproxCenters.cities.push(tmpCity);
    }
}