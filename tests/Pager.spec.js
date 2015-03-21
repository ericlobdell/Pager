describe( "Pager", function () {
    var _pager,
        _items = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 ];

    it( "should be defined", function () {
        expect( Pager ).toBeDefined();
    } );

    describe( "totalPageCount", function () {
        it( "should return the right number of pages based on the number of items in the collection", function () {
            _pager = new Pager( _items, { itemsPerPage: 10, onPageChange: noop } );
            expect( _pager.totalPageCount ).toBe( 3 );

            _pager = new Pager( _items, { itemsPerPage: 15, onPageChange: noop } );
            expect( _pager.totalPageCount ).toBe( 2 );

            _pager = new Pager( _items, { itemsPerPage: 5, onPageChange: noop } );
            expect( _pager.totalPageCount ).toBe( 6 );
        } );

    } );

    describe( "itemsPerPage", function () {
        it( "should default to 25", function () {
            _pager = new Pager( _items, { onPageChange: noop } );
            expect( _pager.itemsPerPage ).toBe( 25 );
        } );

        it( "should be the the value passed in the config object", function () {
            _pager = new Pager( _items, { itemsPerPage: 10, onPageChange: noop } );
            expect( _pager.itemsPerPage ).toBe( 10 );
        } );
    } );

    describe( "maxPageIndicators", function () {
        it( "should be 5 by default", function () {
            _pager = new Pager( _items, { onPageChange: noop } );
            expect( _pager.maxPageIndicators ).toBe( 5 );
        } );

        it( "should be use value passed in config object", function () {
            _pager = new Pager( _items, {
                itemsPerPage: 15,
                maxPageIndicators: 12,
                onPageChange: noop
            } );
            expect( _pager.maxPageIndicators ).toBe( 12 );
        } );
    } );

    describe( "showMeta", function () {
        it( "should default to true", function () {
            _pager = new Pager( _items, { onPageChange: noop } );
            expect( _pager.showMeta ).toBe( true );
        } );

        it( "should be the value passed in the config object", function () {
            _pager = new Pager( _items, { showMeta: false, onPageChange: noop } );
            expect( _pager.showMeta ).toBe( false );
        } );
    } );

    describe( "itemsAlias", function () {
        it( "should default to 'items'", function () {
            _pager = new Pager( _items, { onPageChange: noop } );
            expect( _pager.itemsAlias ).toBe( "items" );
        } );

        it( "should be the value passed in the config object", function () {
            _pager = new Pager( _items, { itemsAlias: "apples", onPageChange: noop } );
            expect( _pager.itemsAlias ).toBe( "apples" );
        } );

        it( "should be the name of the collection property in the event arguments", function () {
            var handlePageChange = function ( sender, args ) {
                expect( args.customers ).toBeDefined();
            };

            _pager = new Pager( _items, { itemsAlias: "customers", onPageChange: handlePageChange } );
        } );
    } );

    describe( "loadPage", function () {
        it( "should update the current page number", function () {
            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            _pager.loadPage( 2 );
            expect( _pager.pageNumber ).toBe( 2 );
        } );

        it( "should fire the onPageChange event with the right items", function () {
            var spy = jasmine.createSpy( 'spy' );

            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            _pager.onPageChange.attach( spy );

            _pager.loadPage( 2 );
            expect( spy.calls.argsFor( 0 )[ 1 ].items ).toEqual( [ 4, 5, 6 ] );

            _pager.loadPage( 3 );
            expect( spy.calls.argsFor( 1 )[ 1 ].items ).toEqual( [ 7, 8, 9 ] );
        } );
    } )

    describe( "hasNextPage", function () {
        it( "should return true if current page is not last page", function () {
            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            _pager.loadPage( 2 );
            expect( _pager.pageNumber ).toBe( 2 );
            expect( _pager.hasNextPage() ).toBe( true );
        } )
    } )

    describe( "hasPreviousPage", function () {
        it( "should return true if current page is not the first or only page", function () {
            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            _pager.loadPage( 2 );
            expect( _pager.pageNumber ).toBe( 2 );
            expect( _pager.hasPreviousPage() ).toBe( true );
        } );

        it( "should return false if current page is the first or only page", function () {
            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            expect( _pager.pageNumber ).toBe( 1 );
            expect( _pager.hasPreviousPage() ).toBe( false );

            _pager = new Pager( [ 1, 2 ], { itemsPerPage: 3, onPageChange: noop } );
            expect( _pager.pageNumber ).toBe( 1 );
            expect( _pager.hasPreviousPage() ).toBe( false );

            console.log( "Pager: ", _pager );
        } );
    } );

    describe( "getStartingIndicatorNumber", function () {
        it( "should return 1 if the total number of pages <= the max number of indicators allowed", function () {
            _pager = new Pager( _items, { itemsPerPage: 10, onPageChange: noop } );
            expect( _pager.totalPageCount ).toBe( 3 );
            expect( _pager.getStartingIndicatorNumber() ).toBe( 1 );
        } );

        it( "should return the current page number if total number of pages > the max number of indicators allowed", function () {
            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            _pager.pageNumber = 4;
            expect( _pager.totalPageCount ).toBe( 9 );
            expect( _pager.getStartingIndicatorNumber() ).toBe( 4 );
        } );

        it( "should return the total pages - max inditacros + 1 if page number + max indicators > total pages", function () {
            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            _pager.pageNumber = 7;
            expect( _pager.totalPageCount ).toBe( 9 );
            expect( _pager.getStartingIndicatorNumber() ).toBe( 5 );
        } );
    } );

    describe( "getEndingIndicatorNumber", function () {
        it( "should return the total page count if the total number of pages <= the max number of indicators allowed", function () {
            _pager = new Pager( _items, { itemsPerPage: 10, onPageChange: noop } );
            expect( _pager.totalPageCount ).toBe( 3 );
            expect( _pager.getEndingIndicatorNumber() ).toBe( 3 );
        } );

        it( "should return the total page count if the currentPage + max number of indicators > totalPageCount", function () {
            _pager = new Pager( _items, { itemsPerPage: 3, onPageChange: noop } );
            _pager.pageNumber = 4;
            expect( _pager.totalPageCount ).toBe( 9 );
            expect( _pager.getStartingIndicatorNumber() ).toBe( 4 );
        } );

        it( "should return the current page number + the max number of indicators if total number of pages > the max number of indicators allowed", function () {
            _pager = new Pager( _items, {
                itemsPerPage: 3,
                maxPageIndicators: 3,
                onPageChange: noop
            } );
            _pager.pageNumber = 2;
            expect( _pager.totalPageCount ).toBe( 9 );
            expect( _pager.getEndingIndicatorNumber() ).toBe( 4 );
        } );

    } );

    describe( "canShowLastPageButton", function () {
        it( "should return true if current page + max indicators < total pages", function () {
            _pager = new Pager( _items, {
                itemsPerPage: 3,
                maxPageIndicators: 3,
                onPageChange: noop
            } );
            _pager.pageNumber = 2;
            expect( _pager.canShowLastPageButton() ).toBe( true );
        } );

        it( "should return false if current page + max indicators >= total pages", function () {
            _pager = new Pager( _items, {
                itemsPerPage: 10,
                maxPageIndicators: 5,
                onPageChange: noop
            } );
            _pager.pageNumber = 2;
            expect( _pager.canShowLastPageButton() ).toBe( false );
        } );
    } );

    describe( "canShowFirstPageButton", function () {
        it( "should return true if current page - max indicators > 1", function () {
            _pager = new Pager( _items, {
                itemsPerPage: 3,
                maxPageIndicators: 3,
                onPageChange: noop
            } );
            _pager.pageNumber = 5;
            expect( _pager.canShowFirstPageButton() ).toBe( true );
        } );

        it( "should return false if getStartingIndicatorNumber = 1", function () {
            _pager = new Pager( _items, {
                itemsPerPage: 3,
                maxPageIndicators: 5,
                onPageChange: noop
            } );
            _pager.pageNumber = 1;
            expect( _pager.canShowFirstPageButton() ).toBe( false );
        } );
    } );

    function noop() { }
} );