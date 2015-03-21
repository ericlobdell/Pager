/**
 * Created by Eric on 3/16/2015.
 */
(function ( window, $ ) {
    "use strict";

    var _controlTemplate = Pager.pagerTemplate,

        _pager = function ( items, config ) {
            var _numItems = items ? items.length : 0,
                _self = this, _cfg = config || {};


            _self.itemsPerPage = _cfg.itemsPerPage || 25;
            _self.maxPageIndicators = _cfg.maxPageIndicators || 5;
            _self.showMeta = !Utils.isUnDefined( _cfg.showMeta ) ? _cfg.showMeta : true;
            _self.itemsAlias = _cfg.itemsAlias || "items";

            _self.items = items;
            _self.batchStartNumber = 1;
            _self.batchEndNumber = _self.batchStartNumber + _self.itemsPerPage;
            _self.pageNumber = 1;
            _self.totalPageCount = Math.ceil( _numItems / _self.itemsPerPage );
            _self.onPageChange = new ObservableEvent( _self );

            if ( Utils.isFunction( _cfg.onPageChange ) )
                _self.onPageChange.attach( _cfg.onPageChange );

            $( "body" ).on( "click", ".pager-button", function () {
                var $sender = $( this ),
                    newPageNumber = $sender.data( "page-number" ),
                    isCurrentPage = $sender.hasClass( "current-page" );

                if ( isCurrentPage )
                    return;

                _self.loadPage( newPageNumber );
            } );

            if ( _cfg.deferFirstPageLoad !== false )
                _self.loadPage( 1 );

            return _self;
        };

    window.Pager = _pager;

    _pager.prototype.loadPage = function ( pageNumber ) {
        var startIndex = ( pageNumber - 1 ) * this.itemsPerPage,
            endIndex = startIndex + this.itemsPerPage,
            pageItems = this.items.slice( startIndex, endIndex ),
            eventArgs = {};

        this.pageNumber = pageNumber;
        this.batchStartNumber = startIndex + 1;
        this.batchEndNumber = endIndex > this.items.length ?
            this.items.length :
            endIndex;

        if ( this.onPageChange.hasHandlers() ) {
            eventArgs.pageNumber = pageNumber;
            eventArgs[ this.itemsAlias ] = pageItems;
            this.onPageChange.notify( eventArgs );
        } else {
            throw new Error( "No handler assigned to Pager.onPageChange event" );
        }

    };

    _pager.prototype.RenderPaginationControl = function ( $el ) {
        var templateArgs = {
                hasNextPage: this.hasNextPage(),
                nextPageNumber: this.pageNumber + 1,
                hasPreviousPage: this.hasPreviousPage(),
                previousPageNumber: this.pageNumber - 1,
                firstPage: 1,
                lastPage: this.totalPageCount,
                currentPage: this.pageNumber,
                batchStart: this.batchStartNumber,
                batchEnd: this.batchEndNumber,
                totalItemsCount: this.items.length,
                itemsAlias: this.itemsAlias,
                startPageNumber: this.getStartingIndicatorNumber(),
                endPageNumber: this.getEndingIndicatorNumber(),
                showAllIndicators: this.canShowAllIndicators(),
                showLastPageButton: this.canShowLastPageButton(),
                showFirstPageButton: this.canShowFirstPageButton(),
                showMeta: this.showMeta,
                hasPages: this.totalPageCount > 1
            },
            html = _controlTemplate( templateArgs );

        $el.html( html );
    };

    _pager.prototype.hasNextPage = function () {
        return this.pageNumber < this.totalPageCount;
    };

    _pager.prototype.hasPreviousPage = function () {
        return this.pageNumber > 1;
    };

    _pager.prototype.getStartingIndicatorNumber = function () {
        if ( this.canShowAllIndicators() )
            return 1;
        else {
            if ( this.pageNumber + this.maxPageIndicators > this.totalPageCount )
                return this.totalPageCount - this.maxPageIndicators + 1;
            else
                return this.pageNumber;
        }
    };

    _pager.prototype.getEndingIndicatorNumber = function () {
        var computedLastPageNumber = this.pageNumber + this.maxPageIndicators - 1;

        if ( this.canShowAllIndicators() )
            return this.totalPageCount;
        else {
            if ( computedLastPageNumber >= this.totalPageCount )
                return this.totalPageCount;
            else
                return computedLastPageNumber;
        }

    };

    _pager.prototype.canShowAllIndicators = function () {
        return ( this.totalPageCount <= this.maxPageIndicators );
    };

    _pager.prototype.canShowLastPageButton = function () {
        return this.totalPageCount > this.maxPageIndicators &&
            ( this.pageNumber + this.maxPageIndicators ) - 1 < this.totalPageCount;
    };

    _pager.prototype.canShowFirstPageButton = function () {
        return this.totalPageCount > this.maxPageIndicators &&
            this.getStartingIndicatorNumber() > 1;
    };

    Handlebars.registerHelper( 'indicatorsInRange', function ( from, to, block ) {
        var html = '';

        for ( var i = from; i <= to; i++ )
            html += block.fn( i );

        return html;
    } );

    Handlebars.registerHelper( 'isCurrentPage', function ( pageNumber, currentPageNumber ) {
        return pageNumber === currentPageNumber ? "current-page" : "";
    } );


})( window, jQuery );
