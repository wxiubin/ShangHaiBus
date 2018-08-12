var api = require("./api");
var dataManager = require("./data");

var backHomeData;
var goWorkData

function baHome() {
  let carInfo = dataManager.backHomeData
  api.fetchCar(carInfo.line_id, carInfo.line_name, carInfo.direction, carInfo.stopid, function(data) {
    backHomeData = data.data
    reload()
  })
}

function goWork() {
  let carInfo = dataManager.goWorkData
  api.fetchCar(carInfo.line_id, carInfo.line_name, carInfo.direction, carInfo.stopid, function(data) {
    goWorkData = data.data
    reload()
  })
}

function formatData(data) {
  if (JSON.stringify(data) == "{}") {
    return "尚未发车，请耐心等待！"
  } 
  let car = data.cars[0]
  let m = Math.floor(car.time / 60)
  let s = car.time % 60
  return car.terminal + "\n还有" + car.stopdis + "站，约" + car.distance + "米\n需要" + m + "分" + s + "秒"
}

function reload() {
  var text = "";
  if (backHomeData) {
    text = text + "\n回家的公交：\n\n" + formatData(backHomeData)
  }
  if (goWorkData) {
    text = text +"\n\n\n上班的公交：\n\n" + formatData(goWorkData)
  }
  $("label").text = text
}


var label = {
  type: "label",
  props: {
    id: "label",
    font: $font(22),
    lines: 0
  },
  layout: function(make, view) {
    make.top.left.right.bottom.inset(8);
  },
}

function init() {
  baHome()
  goWork()
  $ui.render({
    props: { title: "上海公交" },
    views: [label]
  })
}

module.exports = {
  init: init
}