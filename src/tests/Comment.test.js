import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {getByTestId} from "@testing-library/react";
import {Comment} from "../components/Comment";

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

it("Checks presence of the comment", () => {
    let comment = {
        'text': '<h1>test</h1>',
        'by': 'unknown',
        'kids': []
    }
    act(() => {
        render(<Comment comment={comment}/>, container);
    });
    expect(getByTestId(container,'comment-by').textContent).toBe('Пользователь unknown пишет: ');
    act(() => {
        render(<Comment comment={comment}/>, container);
    });
    expect(getByTestId(container,'comment-text').textContent).toBe('test');
});