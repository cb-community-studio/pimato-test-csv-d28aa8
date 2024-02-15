import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleStoresPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    
    useEffect(() => {
        //on mount
        client
            .service("stores")
            .get(urlParams.singleStoresId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Stores", type: "error", message: error.message || "Failed get stores" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/stores", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Stores</h3>
                </div>
                <p>stores/{urlParams.singleStoresId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Store Name</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.storeName}</p></div>
                    <label className="text-sm text-primary">Address</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.address}</p></div>
                    <label className="text-sm text-primary">Phone Number</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.phoneNumber}</p></div>
                    <label className="text-sm text-primary">Opening Hours</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.openingHours}</p></div>
                    <label className="text-sm text-primary">Menu</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.menu}</p></div>
                    <label className="text-sm text-primary">Seating Capacity</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.seatingCapacity}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleStoresPage);
