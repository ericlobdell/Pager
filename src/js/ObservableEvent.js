/**
 * Created by Eric on 3/16/2015.
 */
(function ( window ) {
    "use strict";

    window.ObservableEvent = _event;

    function _event ( sender ) {
        this.sender = sender;
        this.listeners = [];
    }

    _event.prototype.attach = function ( listeners ) {
        if ( Utils.isArray( listeners ) ) {
            this.listeners.concat( listeners );
        } else {
            this.listeners.push( listeners );
        }
    };

    _event.prototype.notify = function ( args ) {
        this.listeners.forEach( function ( fn ) {
            if ( Utils.isFunction( fn ) ) {
                fn( this.sender, args );
            }
        }, this )
    };

    _event.prototype.hasHandlers = function () {
        return this.listeners.length > 0;
    }

})( window );
