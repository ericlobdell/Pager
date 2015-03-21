this["Pager"] = this["Pager"] || {};
this["Pager"]["templates"] = this["Pager"]["templates"] || {};
this["Pager"]["templates"]["pagerTemplate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"pager-meta\">Viewing "
    + alias3(((helper = (helper = helpers.batchStart || (depth0 != null ? depth0.batchStart : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"batchStart","hash":{},"data":data}) : helper)))
    + "-"
    + alias3(((helper = (helper = helpers.batchEnd || (depth0 != null ? depth0.batchEnd : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"batchEnd","hash":{},"data":data}) : helper)))
    + " of "
    + alias3(((helper = (helper = helpers.totalItemsCount || (depth0 != null ? depth0.totalItemsCount : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"totalItemsCount","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.itemsAlias || (depth0 != null ? depth0.itemsAlias : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"itemsAlias","hash":{},"data":data}) : helper)))
    + "</div>\r\n";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "        <ul class=\"pager-buttons\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showFirstPageButton : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.HasPreviousPage : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.indicatorsInRange || (depth0 && depth0.indicatorsInRange) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.startPageNumber : depth0),(depth0 != null ? depth0.endPageNumber : depth0),{"name":"indicatorsInRange","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.hasNextPage : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showLastPageButton : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <li class=\"pager-button first\" data-page-number=\""
    + alias3(((helper = (helper = helpers.firstPage || (depth0 != null ? depth0.firstPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstPage","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.firstPage || (depth0 != null ? depth0.firstPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstPage","hash":{},"data":data}) : helper)))
    + "</li>\r\n";
},"6":function(depth0,helpers,partials,data) {
    var helper;

  return "                <li class=\"pager-button previous\" data-page-number=\""
    + this.escapeExpression(((helper = (helper = helpers.previousPageNumber || (depth0 != null ? depth0.previousPageNumber : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"previousPageNumber","hash":{},"data":data}) : helper)))
    + "\"><span class=\"icon-angle-left\"></span></li>\r\n";
},"8":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.escapeExpression, alias2=this.lambda;

  return "                <li class=\"pager-button page-number "
    + alias1((helpers.isCurrentPage || (depth0 && depth0.isCurrentPage) || helpers.helperMissing).call(depth0,depth0,(depths[1] != null ? depths[1].currentPage : depths[1]),{"name":"isCurrentPage","hash":{},"data":data}))
    + "\" data-page-number=\""
    + alias1(alias2(depth0, depth0))
    + "\">"
    + alias1(alias2(depth0, depth0))
    + "</li>\r\n";
},"10":function(depth0,helpers,partials,data) {
    var helper;

  return "                <li class=\"pager-button next\" data-page-number=\""
    + this.escapeExpression(((helper = (helper = helpers.nextPageNumber || (depth0 != null ? depth0.nextPageNumber : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"nextPageNumber","hash":{},"data":data}) : helper)))
    + "\"><span class=\"icon-angle-right\"></span></li>\r\n";
},"12":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <li class=\"pager-button last\" data-page-number=\""
    + alias3(((helper = (helper = helpers.lastPage || (depth0 != null ? depth0.lastPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastPage","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.lastPage || (depth0 != null ? depth0.lastPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastPage","hash":{},"data":data}) : helper)))
    + "</li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"pagination-container\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showMeta : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.hasPages : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true,"useDepths":true});