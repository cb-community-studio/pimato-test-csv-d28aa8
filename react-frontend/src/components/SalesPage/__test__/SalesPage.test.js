import React from "react";
import { render, screen } from "@testing-library/react";

import SalesPage from "../SalesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sales page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SalesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sales-datatable")).toBeInTheDocument();
    expect(screen.getByRole("sales-add-button")).toBeInTheDocument();
});
