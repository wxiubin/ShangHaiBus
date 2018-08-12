function saveBackHome(lineID, linename, direction, stopid) {
    $cache.set("BackHome", {
        "line_id": lineID,
        "line_name": linename,
        "direction": direction,
        "stopid": stopid,
      })
      console.log("saveBackHome: " + lineID + linename + direction + stopid)
}

function saveGoWork(lineID, linename, direction, stopid) {
    $cache.set("GoWork", {
        "line_id": lineID,
        "line_name": linename,
        "direction": direction,
        "stopid": stopid,
      })
      console.log("saveGoWork: " + lineID + linename + direction + stopid)
}

var goWorkData = $cache.get("GoWork") || {
    "line_id": "040600",
    "line_name": "406路",
    "direction": 1,
    "stopid": 20,
  }
var backHomeData = $cache.get("BackHome") || {
    "line_id": "040600",
    "line_name": "406路",
    "direction": 0,
    "stopid": 1,
  }

function formatCar(data) {
  if (JSON.stringify(data) == "{}") {
    return "尚未发车，请耐心等待！"
  } 
  let car = data.cars[0]
  let m = Math.floor(car.time / 60)
  let s = car.time % 60
  return car.terminal + "\n还有" + car.stopdis + "站，约" + car.distance + "米\n需要" + m + "分" + s + "秒"
}

function formatBasic(basic, direction) {
    if (!basic.data) {
        return "没有查到该路公交信息"
    }
    let stopSite = direction ? basic.data.start_stop : basic.data.end_stop
    let startSite = direction ? basic.data.end_stop : basic.data.start_stop
    let lineName = "公交路线: " + basic.data.line_name + "    "
    let lineSite = startSite + "->" + stopSite + "\n"
    let startTime = "首班车: " + basic.data.start_earlytime + "    "
    let stopTime = "末班车: " + basic.data.end_latetime
    return lineName + lineSite + startTime + stopTime
}

module.exports = {
    saveBackHome: saveBackHome,
    saveGoWork: saveGoWork,
    goWorkData: goWorkData,
    backHomeData: backHomeData,
    formatCar: formatCar,
    formatBasic: formatBasic
}