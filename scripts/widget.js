var api = require("./api");
var dataManager = require("./data");

function requestCar(carInfo) {
  console.log(carInfo)
  api.fetchCar(carInfo.line_id, carInfo.line_name, carInfo.direction, carInfo.stopid, function(data) {
    car = data.data
    console.log(car)
    $ui.alert(dataManager.formatCar(car))
  })
}

function init() {
  $ui.menu({
    items: ["去公司", "回家"],
    handler: function(title, idx) {
      if (idx == 0) {
        requestCar(dataManager.goWorkData)
      } else {
        requestCar(dataManager.backHomeData);
      }
    }
  })
}

module.exports = {
  init: init
}