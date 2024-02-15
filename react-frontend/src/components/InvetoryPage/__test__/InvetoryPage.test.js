import React from "react";
import { render, screen } from "@testing-library/react";

import InvetoryPage from "../InvetoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders invetory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InvetoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("invetory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("invetory-add-button")).toBeInTheDocument();
});
