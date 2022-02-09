import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import NewsPage from "../components/NewsPage";

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

it('Checks presence of NewsPage', () => {
    act(() => {
        render(<NewsPage/>, container);
    });
    expect(getByTestId(container,'news-page')).toBeInTheDocument();

});