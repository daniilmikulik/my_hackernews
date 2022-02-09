import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import MainDescription from "../components/MainDescription";

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

it('Checks presence of MainDescription', () => {
    act(() => {
        render(<MainDescription/>, container);
    });
    expect(getByTestId(container,'main-description')).toBeInTheDocument();
});