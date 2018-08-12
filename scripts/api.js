function fetchLineBasic(linename, callback) {
    $http.request({
        method: "GET",
        url: encodeURI("http://106.14.7.118:3389/bus/querylineinfo?linename=" + linename + "路"),
        handler: function(resp) {
          callback(resp.data)
        }
      })
}

function fetchLineInfo(lineID, linename, callback) {
  $http.request({
      method: "GET",
      url: encodeURI("http://106.14.7.118:3389/bus/querystops?linename=" + linename + "路&lineid=" + lineID),
      handler: function(resp) {
        callback(resp.data)
      }
    })
}

function fetchCar(lineID, linename, direction, stopid, callback) {
  console.log("http://106.14.7.118:3389/bus/queryarrivalinfo?linename=" + linename + "路&lineid=" + lineID + "&direction=" + direction + "&stopid=" + stopid)
  $http.request({
      method: "GET",
      url: encodeURI("http://106.14.7.118:3389/bus/queryarrivalinfo?linename=" + linename + "路&lineid=" + lineID + "&direction=" + direction + "&stopid=" + stopid),
      handler: function(resp) {
        callback(resp.data)
      }
    })
}

module.exports = {
    fetchLineBasic: fetchLineBasic,
    fetchLineInfo: fetchLineInfo,
    fetchCar: fetchCar
  }