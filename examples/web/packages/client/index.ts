import "@web/styles/css-styles";
import "@web/styles/stylus-styles";

import("@web/core/async")
    .then(module => module.wowmuchgood())
    .then(() => console.log("hi"));
