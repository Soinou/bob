<template lang="pug">
    //- RIP <marquee>
    marquee.wrapper(direction="down" behavior="alternate")
        marquee.content(behavior="alternate")
            //- RIP <blink>
            blink Hello World!
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="stylus" scoped>
.wrapper
    height 100%
    margin 0
    padding 0
    width 100%

.content
    color purple
    font-size 10rem
    font-family "Comic Sans MS"
</style>
