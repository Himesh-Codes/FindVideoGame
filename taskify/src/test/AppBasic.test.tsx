import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

// app heading availability test
test('initial screen check header', () => { //description of test
    render(<App/>); // render the test component
    const header = screen.getByText(/Taskify/i); // find the elements
    expect(header).toBeInTheDocument(); //jest-dom based assert the result
});

// negation test to confirm the above test works
test('header negation confimation test', () => { //description of test
    render(<App/>); // render the test component
    const header = screen.queryByText(/Bubbly/i); // find the elements
    expect(header).toBeNull(); //jest-dom based assert the result
}, 8); // timeout on max time we wait for test to execute
