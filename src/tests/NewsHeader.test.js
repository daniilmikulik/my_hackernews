import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import NewsHeader from "../components/NewsHeader";

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
        render(<NewsHeader/>, container);
    });
    expect(getByTestId(container,'news-header')).toBeInTheDocument();

});