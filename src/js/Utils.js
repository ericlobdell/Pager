/**
 * Created by Eric on 3/20/2015.
 */
(function ( window ) {
    "use strict";

    window.Utils = {
        isFunction: function ( test ) {
            return Object.prototype.toString.call( test ) === "[object Function]";
        },

        isArray: function ( test ) {
            return Object.prototype.toString.call( test ) === "[object Array]";
        },

        isUnDefined: function ( test ) {
            return Object.prototype.toString.call( test ) === "[object Undefined]";
        }
    };

})( window );