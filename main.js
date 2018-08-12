var path = "scripts/app";
if ($app.env == $env.today ) {
    path = "scripts/widget"
} else if ($app.env == $env.siri) {
    path = "scripts/siri"
}
var module = require(path);
module.init();