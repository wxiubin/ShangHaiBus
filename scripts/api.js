let config = "https://raw.githubusercontent.com/wxiubin/ShangHaiBus/master/host.json"
var host = $cache.get("host", host) || "http://118.89.160.44:3389"

function fetchLineBasic(linename, callback) {
  linename = linename.lastIndexOf("路") == -1 ? linename + "路" : linename
    $http.request({
        method: "GET",
        url: encodeURI(host + "/bus/querylineinfo?linename=" + linename),
        timeout: 10,
        handler: function(resp) {
          callbackResp(resp, function() {
            callback(resp.data)
          })
        }
      })
}

function fetchLineInfo(lineID, linename, callback) {
  linename = linename.lastIndexOf("路") == -1 ? linename + "路" : linename
  $http.request({
      method: "GET",
      url: encodeURI(host + "/bus/querystops?linename=" + linename + "&lineid=" + lineID),
      handler: function(resp) {
        callbackResp(resp, function() {
          callback(resp.data)
        })
      }
    })
}

function fetchCar(lineID, linename, direction, stopid, callback) {
  console.log(linename)
  linename = linename.lastIndexOf("路") == -1 ? linename + "路" : linename
  let url = encodeURI(host + "/bus/queryarrivalinfo?linename=" + linename + "&lineid=" + lineID + "&direction=" + direction + "&stopid=" + stopid)
  $http.request({
      method: "GET",
      url: url,
      handler: function(resp) {
        callbackResp(resp, function() {
          callback(resp.data)
        })
      }
    })
}

function callbackResp(resp, callback) {
  console.log(resp.error)
  if (resp.error && resp.error.code) {
    fetchHost(function() {
      $ui.toast("Host 已更新，请重新获取！")
    })
  } else {
    callback()
  }
}

function fetchHost(callback) {
  $http.request({
    method: "GET",
    url: encodeURI(config),
    handler: function(resp) {
      let json = resp.data.host
      host = json
      $cache.set("host", host)
      callback(host)
    }
  })
}

module.exports = {
    fetchLineBasic: fetchLineBasic,
    fetchLineInfo: fetchLineInfo,
    fetchCar: fetchCar
  }