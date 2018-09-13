import * as path from "path";
import * as UglifyJs from "uglifyjs-webpack-plugin";
import * as webpack from "webpack";

export function uglify(): webpack.Plugin {
    return new UglifyJs({
        cache: path.resolve(".cache/uglify"),
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
            compress: {
                arrows: false,
                booleans: false,
                collapse_vars: false,
                comparisons: false,
                computed_props: false,
                conditionals: true,
                dead_code: true,
                evaluate: true,
                hoist_funs: false,
                hoist_props: false,
                hoist_vars: false,
                if_return: false,
                inline: false,
                join_vars: false,
                keep_infinity: true,
                loops: false,
                negate_iife: false,
                properties: false,
                reduce_funcs: false,
                reduce_vars: false,
                sequences: false,
                side_effects: false,
                switches: false,
                top_retain: false,
                toplevel: false,
                typeofs: false,
                unused: false,
            },
            mangle: true,
            output: {
                comments: false,
            },
        },
    }) as any;
}