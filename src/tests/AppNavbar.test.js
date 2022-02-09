import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AppNavbar from "../components/AppNavbar"
import {getByTestId} from "@testing-library/react";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Checks the name of the reload button", () => {
    act(() => {
        render(<AppNavbar />, container);
    });
    expect(getByTestId(container,'nav-button').textContent).toBe(' Назад ');

    act(() => {
        render(<AppNavbar load={() => {return null;}}/>, container);
    });
    expect(getByTestId(container,'nav-button').textContent).toBe(' Перезагрузить ');
});

it("Checks presence of the main navbar", () => {
    act(() => {
        render(<AppNavbar />, container);
    });
    expect(getByTestId(container,'app-navbar')).toBeInTheDocument();
});