import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';

const genderArray = ["M","F"];
const genderOptions = genderArray.map((x,i) => ({ name: x, value: i }));

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

const EmployeeCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [userId, setuserId] = useState([])
    const [users, setusers] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            userId: _entity.userId,
            first: _entity.first,
            last: _entity.last,
            employee: _entity.employee,
            date: _entity.date,
            birth: _entity.birth,
            gender: _entity.gender,
            phone: _entity.phone,
            email: _entity.email,
            address: _entity.address,
            employment: _entity.employment,
            status: _entity.status,
            hire: _entity.hire,
            termination: _entity.termination,
            job: _entity.job,
        };

        setLoading(true);
        try {
            
        const result = await client.service("employee").create(_data);
        const eagerResult = await client
            .service("employee")
            .find({ query: { $limit: 100 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "userId",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info employee updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
     useEffect(() => {
                    //on mount
                    client
                        .service("users")
                        .find({ query: { $limit: 100 } })
                        .then((res) => {
                            setusers(res.data);
                            setuserId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

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
    const userIdOptions = userId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="employee-create-dialog-component">
            <div>
                <p className="m-0">userId:</p>
                <Dropdown value={_entity?.userId} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey("userId", e.value)} />
            </div>
            <div>
                <p className="m-0">First:</p>
                <InputText className="w-full mb-3" value={_entity?.first} onChange={(e) => setValByKey("first", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Last:</p>
                <InputText className="w-full mb-3" value={_entity?.last} onChange={(e) => setValByKey("last", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Employee:</p>
                <InputText className="w-full mb-3" value={_entity?.employee} onChange={(e) => setValByKey("employee", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">date:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.date)} onChange={ (e) => setValByKey("date", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">birth:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.birth)} onChange={ (e) => setValByKey("birth", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">gender:</p>
                <Dropdown value={_entity?.gender} optionLabel="name" optionValue="value" options={genderOptions} onChange={(e) => setValByKey("gender", e.value)} />
            </div>
            <div>
                <p className="m-0">Phone :</p>
                <InputText className="w-full mb-3" value={_entity?.phone} onChange={(e) => setValByKey("phone", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Email :</p>
                <InputText className="w-full mb-3" value={_entity?.email} onChange={(e) => setValByKey("email", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Address :</p>
                <InputText className="w-full mb-3" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Employment:</p>
                <InputText className="w-full mb-3" value={_entity?.employment} onChange={(e) => setValByKey("employment", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">status:</p>
                <Checkbox checked={_entity?.status} onChange={ (e) => setValByKey("status", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">hire:</p>
                <Checkbox checked={_entity?.hire} onChange={ (e) => setValByKey("hire", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">termination:</p>
                <Checkbox checked={_entity?.termination} onChange={ (e) => setValByKey("termination", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">Job:</p>
                <InputText className="w-full mb-3" value={_entity?.job} onChange={(e) => setValByKey("job", e.target.value)}  />
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

export default connect(null, mapDispatch)(EmployeeCreateDialogComponent);
