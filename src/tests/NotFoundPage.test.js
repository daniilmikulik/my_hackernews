import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import NewsHeader from "../components/NewsHeader";
import NotFoundPage from "../components/NotFoundPage";

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

it('Checks presence of NewsHeader', () => {
    act(() => {
        render(<NotFoundPage/>, container);
    });
    expect(getByTestId(container,'not-found')).toBeInTheDocument();

});