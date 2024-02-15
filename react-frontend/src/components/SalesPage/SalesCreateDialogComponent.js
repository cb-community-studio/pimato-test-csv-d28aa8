import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const SalesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            transactionId: _entity.transactionId,
            date: _entity.date,
            time: _entity.time,
            registerCashierId: _entity.registerCashierId,
            customerId: _entity.customerId,
            itemsSold: _entity.itemsSold,
            totalSaleAmount: _entity.totalSaleAmount,
            discounts: _entity.discounts,
            taxes: _entity.taxes,
            netSaleAmount: _entity.netSaleAmount,
        };

        setLoading(true);
        try {
            
        const result = await client.service("sales").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info sales created successfully" });
        props.onCreateResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="sales-create-dialog-component">
            <div>
                <p className="m-0">Transaction Id:</p>
                <InputText className="w-full mb-3" value={_entity?.transactionId} onChange={(e) => setValByKey("transactionId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Date:</p>
                <InputText className="w-full mb-3" value={_entity?.date} onChange={(e) => setValByKey("date", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Time:</p>
                <InputText className="w-full mb-3" value={_entity?.time} onChange={(e) => setValByKey("time", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Register Cashier Id:</p>
                <InputText className="w-full mb-3" value={_entity?.registerCashierId} onChange={(e) => setValByKey("registerCashierId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Customer Id:</p>
                <InputText className="w-full mb-3" value={_entity?.customerId} onChange={(e) => setValByKey("customerId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Items Sold:</p>
                <InputText className="w-full mb-3" value={_entity?.itemsSold} onChange={(e) => setValByKey("itemsSold", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Total Sale Amount:</p>
                <InputText className="w-full mb-3" value={_entity?.totalSaleAmount} onChange={(e) => setValByKey("totalSaleAmount", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Discounts:</p>
                <InputText className="w-full mb-3" value={_entity?.discounts} onChange={(e) => setValByKey("discounts", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Taxes:</p>
                <InputText className="w-full mb-3" value={_entity?.taxes} onChange={(e) => setValByKey("taxes", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Net Sale Amount:</p>
                <InputText className="w-full mb-3" value={_entity?.netSaleAmount} onChange={(e) => setValByKey("netSaleAmount", e.target.value)}  />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(SalesCreateDialogComponent);
