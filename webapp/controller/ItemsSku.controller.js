sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("geo.skumonitor.controller.ItemsSku", {
            onInit: function () {
                this.smartfilter = this.byId("smartFilterBar");
                this.oSmartTable = this.byId("idSmartTable");
                //Seteamos el idioma a español
                sap.ui.getCore().getConfiguration().setLanguage('es');
            },

            anularDocu: function (oEvent) {
                let oObject = oEvent.getSource().getParent().getBindingContext().getObject();
                let oModel = this.getOwnerComponent().getModel();
                var oEntry = {};
                var that = this;
                oEntry.Documento = oObject.Documento;
                oEntry.Ejercicio = oObject.Ejercicio;
                oEntry.Anulacion = true;
                oModel.create("/ItemsskuSet", oEntry, {
                    // method: "POST",
                    success: function (data) {
                        sap.m.MessageBox.success(data.Message);
                    },
                    error: function (response) {
                        sap.m.MessageBox.error(response.message);
                    }
                });
            },

            onCallBapi: function (oEvent) {
                let oObject = oEvent.getSource().getParent().getBindingContext().getObject();
                let oModel = this.getOwnerComponent().getModel();
                let oEntry = {};
                oEntry.Sku = oObject.Sku;
                oEntry.Sociedad = oObject.Sociedad;
                oEntry.Centro = oObject.Centro;
                oEntry.Diferencia = oObject.Diferencia;
                oEntry.Ejercicio = oObject.Ejercicio;
                oEntry.Preciore = oObject.Preciore;
                oEntry.Precio = oObject.Precio;
                if(oObject.Semaforo === '100'){
                    sap.m.MessageBox.error("No existe diferencia a compensar");    
                }else{
                    oModel.create("/ItemsskuSet", oEntry, {
                        success: function (data) {
                            sap.m.MessageBox.success("Contabilizado Correctamente");
                        },
                        error: function (response) {
                            // let error = JSON.parse(response.responseText).error.message.value;
                            let error = $(response.responseText).find('message').first().text()
                            sap.m.MessageBox.error(error);
                        }
                    });
                }        
            }

        });
    });
