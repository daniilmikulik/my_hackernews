import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import CommentsTree from "../components/CommentsTree";

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

it('Checks presence of CommentsTree', () => {
    let articleId = '8863';
    act(() => {
        render(<CommentsTree ident={articleId}/>, container);
    });
    expect(getByTestId(container,'comments-tree')).toBeInTheDocument();

    act(() => {
        render(<CommentsTree/>, container);
    });
    expect(getByTestId(container,'comments-tree')).toBeInTheDocument();
});