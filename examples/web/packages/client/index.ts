import "@web/styles/css-styles";
import "@web/styles/stylus-styles";

import("@web/core/async")
    .then(module => module.wowmuchgood())
    .then(() => console.log("idk"));

// import("./idk").then(module => module.idk());

console.log("wow that's cool i guess maybe lol");
