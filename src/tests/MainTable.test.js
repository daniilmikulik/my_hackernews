import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import MainTable from "../components/MainTable";
import {MemoryRouter} from "react-router";

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

it('Checks presence of MainTable', () => {
    act(() => {
        render(<MainTable/>, container);
    });
    expect(getByTestId(container,'main-table')).toBeInTheDocument();

    const stories = [{
        'title': 'a',
        'by': 'b',
        'score': 1,
        'id': 0,
        'time': 1314211127
    }];
    act(() => {
        render(<MemoryRouter> <MainTable stories={stories}/> </MemoryRouter>, container);
    });
    expect(getByTestId(container,'main-table')).toBeInTheDocument();
});
