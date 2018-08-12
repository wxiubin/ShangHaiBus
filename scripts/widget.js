var api = require("./api");

function baHome() {
  request("http://106.14.7.118:3389/bus/queryarrivalinfo?lineid=040600&linename=406%E8%B7%AF&direction=0&stopid=2")
}

function goWork() {
  request("http://106.14.7.118:3389/bus/queryarrivalinfo?lineid=040600&linename=406%E8%B7%AF&direction=1&stopid=20")
}

function request(URLString) {
  $http.request({
    method: "GET",
    url: encodeURI(URLString),
    handler: function(resp) {
      console.log(resp.data)
      alert(formatData(resp.data.data))
    }
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

function alert(text) {
  $ui.alert(text)
}

function init() {
  $ui.menu({
    items: ["去公司", "回家"],
    handler: function(title, idx) {
      if (idx == 0) {
        goWork()
      } else {
        baHome()
      }
    }
  })
}

module.exports = {
  init: init
}