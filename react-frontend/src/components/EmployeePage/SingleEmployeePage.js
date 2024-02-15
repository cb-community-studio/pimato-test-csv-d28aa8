import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';

const SingleEmployeePage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [userId, setuserId] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("employee")
            .get(urlParams.singleEmployeeId, { query: { $populate: ["userId"] }})
            .then((res) => {
                set_entity(res || {});
                const userId = Array.isArray(res.userId)
            ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userId
                ? [{ _id: res.userId._id, name: res.userId.name }]
                : [];
        setuserId(userId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Employee", type: "error", message: error.message || "Failed get employee" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/employee", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Employee</h3>
                </div>
                <p>employee/{urlParams.singleEmployeeId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">userId</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.userId?.name}</p></div>
                    <label className="text-sm text-primary">First</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.first}</p></div>
                    <label className="text-sm text-primary">Last</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.last}</p></div>
                    <label className="text-sm text-primary">Employee</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.employee}</p></div>
                    <label className="text-sm text-primary">date</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.date}</p></div>
                    <label className="text-sm text-primary">birth</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.birth}</p></div>
                    <label className="text-sm text-primary">Phone </label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.phone}</p></div>
                    <label className="text-sm text-primary">Email </label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.email}</p></div>
                    <label className="text-sm text-primary">Address </label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.address}</p></div>
                    <label className="text-sm text-primary">Employment</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.employment}</p></div>
                    <label className="text-sm text-primary">status</label>
                    <div className="ml-3"><Checkbox checked={_entity?.status} onChange={ (e) => setValByKey("status", e.checked)}  ></Checkbox></div>
                    <label className="text-sm text-primary">hire</label>
                    <div className="ml-3"><i className={`pi ${_entity?.hire?"pi-check": "pi-times"}`}  ></i></div>
                    <label className="text-sm text-primary">termination</label>
                    <div className="ml-3"><InputSwitch checked={rowData.termination} onChange={ (e) => setValByKey("termination", e.value)}  /></div>
                    <label className="text-sm text-primary">Job</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.job}</p></div>
            <label className="text-sm">userId</label>
            {userId.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
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

export default connect(mapState, mapDispatch)(SingleEmployeePage);
