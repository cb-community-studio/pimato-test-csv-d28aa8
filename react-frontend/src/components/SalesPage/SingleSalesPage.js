import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleSalesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    
    useEffect(() => {
        //on mount
        client
            .service("sales")
            .get(urlParams.singleSalesId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Sales", type: "error", message: error.message || "Failed get sales" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/sales", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Sales</h3>
                </div>
                <p>sales/{urlParams.singleSalesId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Transaction Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.transactionId}</p></div>
                    <label className="text-sm text-primary">Date</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.date}</p></div>
                    <label className="text-sm text-primary">Time</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.time}</p></div>
                    <label className="text-sm text-primary">Register Cashier Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.registerCashierId}</p></div>
                    <label className="text-sm text-primary">Customer Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.customerId}</p></div>
                    <label className="text-sm text-primary">Items Sold</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.itemsSold}</p></div>
                    <label className="text-sm text-primary">Total Sale Amount</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.totalSaleAmount}</p></div>
                    <label className="text-sm text-primary">Discounts</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.discounts}</p></div>
                    <label className="text-sm text-primary">Taxes</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.taxes}</p></div>
                    <label className="text-sm text-primary">Net Sale Amount</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.netSaleAmount}</p></div>
            
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleSalesPage);
