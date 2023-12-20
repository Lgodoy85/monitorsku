/*global QUnit*/

sap.ui.define([
	"geo/skumonitor/controller/ItemsSku.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ItemsSku Controller");

	QUnit.test("I should test the ItemsSku controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
