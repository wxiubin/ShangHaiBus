function fetchLineBasic(linename, callback) {
  linename = linename.lastIndexOf("路") == -1 ? linename + "路" : linename
    $http.request({
        method: "GET",
        url: encodeURI("http://106.14.7.118:3389/bus/querylineinfo?linename=" + linename),
        handler: function(resp) {
          callback(resp.data)
        }
      })
}

function fetchLineInfo(lineID, linename, callback) {
  linename = linename.lastIndexOf("路") == -1 ? linename + "路" : linename
  $http.request({
      method: "GET",
      url: encodeURI("http://106.14.7.118:3389/bus/querystops?linename=" + linename + "&lineid=" + lineID),
      handler: function(resp) {
        callback(resp.data)
      }
    })
}

function fetchCar(lineID, linename, direction, stopid, callback) {
  console.log(linename)
  linename = linename.lastIndexOf("路") == -1 ? linename + "路" : linename
  let url = encodeURI("http://106.14.7.118:3389/bus/queryarrivalinfo?linename=" + linename + "&lineid=" + lineID + "&direction=" + direction + "&stopid=" + stopid)
  console.log(url)
  $http.request({
      method: "GET",
      url: url,
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