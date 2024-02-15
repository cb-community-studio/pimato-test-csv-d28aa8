
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';


const EmployeeDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.userId?.name?.name}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.first}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.last}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.employee}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.date}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.birth}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.phone}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.email}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.address}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.employment}</p>
    const checkboxTemplate11 = (rowData, { rowIndex }) => <Checkbox checked={rowData.status}  ></Checkbox>
    const tickTemplate12 = (rowData, { rowIndex }) => <i className={`pi ${rowData.hire?"pi-check": "pi-times"}`}  ></i>
    const switchTemplate13 = (rowData, { rowIndex }) => <InputSwitch checked={rowData.termination}  />
    const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.job}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="userId?.name" header="userId?.name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="first" header="First" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="last" header="Last" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="employee" header="Employee" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="date" header="date" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="birth" header="birth" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="phone" header="Phone " body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="email" header="Email " body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="address" header="Address " body={pTemplate9} style={{ minWidth: "8rem" }} />
            <Column field="employment" header="Employment" body={pTemplate10} style={{ minWidth: "8rem" }} />
            <Column field="status" header="status" body={checkboxTemplate11} style={{ minWidth: "8rem" }} />
            <Column field="hire" header="hire" body={tickTemplate12} style={{ minWidth: "8rem" }} />
            <Column field="termination" header="termination" body={switchTemplate13} style={{ minWidth: "8rem" }} />
            <Column field="job" header="Job" body={pTemplate14} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default EmployeeDataTable;