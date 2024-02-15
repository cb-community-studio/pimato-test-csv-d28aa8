
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const SalesDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.transactionId}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.date}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.time}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.registerCashierId}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.customerId}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.itemsSold}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.totalSaleAmount}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.discounts}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.taxes}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.netSaleAmount}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="transactionId" header="Transaction Id" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="date" header="Date" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="time" header="Time" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="registerCashierId" header="Register Cashier Id" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="customerId" header="Customer Id" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="itemsSold" header="Items Sold" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="totalSaleAmount" header="Total Sale Amount" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="discounts" header="Discounts" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="taxes" header="Taxes" body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="netSaleAmount" header="Net Sale Amount" body={pTemplate9} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default SalesDataTable;