var api = require("./api");
var dataManager = require("./data");

let basicLabelY = 58
let basicLabelHght = 36
let carLabelY = basicLabelY + basicLabelHght
let carLabelHght = 56
let tableViewY = carLabelY + carLabelHght

var basic = {}; // 公交线基础信息
var car = {};   // 到站车辆信息
var siteData = {};  // 公交线站点信息
var direction = 0 // 方向

var basicLabel = {
  type: "label",
  props: {
    id: "basicLabel",
    font: $font(14),
    lines: 0
  },
  layout: function(make, view) {
    make.top.inset(basicLabelY);
    make.left.right.inset(8);
    make.height.equalTo(basicLabelHght);
  },
}

var carLabel = {
  type: "label",
  props: {
    id: "carLabel",
    textColor: $color("#FFA07A"),
    font: $font(14),
    lines: 0
  },
  layout: function(make, view) {
    make.top.inset(carLabelY);
    make.left.right.inset(8);
    make.height.equalTo(carLabelHght)
  },
}

var list = {
  type: "list",
  props: {
    actions: [
      {
        title: "上班",
        handler: function(sender, indexPath) {
          let listData = direction ? siteData.lineResults1 : siteData.lineResults0
          dataManager.saveGoWork(basic.data.line_id, basic.data.line_name, direction, listData.stops[indexPath.row].id)
        }
      },
      {
        title: "回家",
        handler: function(sender, indexPath) {
          let listData = direction ? siteData.lineResults1 : siteData.lineResults0
          dataManager.saveBackHome(basic.data.line_id, basic.data.line_name, direction, listData.stops[indexPath.row].id)
        }
      },
    ]
  },
  layout: function(make, view) {
    make.top.inset(tableViewY);
    make.left.right.inset(0);
    make.bottom.inset(5);
  },
  events: {
    didSelect: function(sender, indexPath, object) {
      fetchCar(object, indexPath.row)
    },
  }
};

var directionButton = {
  type: "button",
  props: {
    src: "assets/exchange.png"
  },
  layout: function(make, view) {
    make.size.equalTo($size(27, 27));
    make.top.inset(16);
    make.right.inset(15);
  },
  events: {
    tapped: function(sender) {
      direction = direction ? 0 : 1
      reloadBasic()
      reloadData()
      sender.rotate(direction ? Math.PI : 0)
    }
  }
}

var searchButton = {
  type: "button",
  props: {
    title: "点击搜索公交路线",
  },
  layout: function(make, view) {
    make.height.equalTo(33);
    make.right.inset(55);
    make.top.left.inset(12);
  },
  events: {
    tapped: function(sender) {
      $input.text({
        type: $kbType.search,
        placeholder: "eg.406",
        handler: function(text) {
          api.fetchLineBasic(text ? text : "406", function(data) { 
            basic = data
            reloadBasic()
            if (!basic.data) return;
            api.fetchLineInfo(basic.data.line_id, basic.data.line_name, function(data) {
              siteData = data.data;
              reloadData()
            })
          })
        }
      })
    }
  }
}

function fetchCar(object, index) {
  let listData = direction ? siteData.lineResults1 : siteData.lineResults0
  api.fetchCar(basic.data.line_id, basic.data.line_name, direction, listData.stops[index].id, function(data) {
    car = data.data
    console.log(data)
    reloadCar(object)
  })
}

function reloadBasic() {
  $("basicLabel").text = dataManager.formatBasic(basic, direction)
}

function reloadCar(object) {
  $("carLabel").text = object + ": " + dataManager.formatCar(car)
}

function reloadData() {
  let listData = direction ? siteData.lineResults1 : siteData.lineResults0
  var sites = []
  for (var i=0; i < listData.stops.length; i++) {
    sites.push(listData.stops[i].id + ". " + listData.stops[i].zdmc)
  }
  $("list").data = sites
}

function init() {
  $ui.render({
    props: { title: "上海公交" },
    views: [searchButton, directionButton, basicLabel, carLabel, list]
  })
}

module.exports = {
  init: init
}