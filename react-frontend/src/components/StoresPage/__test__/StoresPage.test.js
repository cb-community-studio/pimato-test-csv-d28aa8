import React from "react";
import { render, screen } from "@testing-library/react";

import StoresPage from "../StoresPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stores page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StoresPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stores-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stores-add-button")).toBeInTheDocument();
});
