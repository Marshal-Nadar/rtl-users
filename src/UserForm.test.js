import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two input and a button", () => {
  // render component
  render(<UserForm />);

  // Manipulate the component or find a element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  //Assertiion  -make sure the component is doing
  // What we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  // NOT THE BEST IMPLEMENTATION
  // Try to render my component
  // const argList = [];
  // const callback = (...args) => {
  //   argList.push(args);
  // };

  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs

  // const [nameInput, emailInput] = screen.getAllByRole("textbox");  //Old way
  await waitFor(() => {
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    // Stimulate typing in a name
    user.click(nameInput);
    user.keyboard("Micheal");

    // Stimulate typing in a email
    user.click(emailInput);
    user.keyboard("micheal@gmail.com");

    //Find the button
    const button = screen.getByRole("button");

    //Stimulate clicking the button
    user.click(button);

    // Assertion to make sure 'onUserAdd' gets called name/email
    // expect(argList).toHaveLength(1);
    // expect(argList[0][0]).toEqual({
    //   name: "Micheal",
    //   email: "micheal@gmail.com",
    // });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({
      name: "Micheal",
      email: "micheal@gmail.com",
    });
  });
});

test("empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  await waitFor(() => {
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const button = screen.getByRole("button");

    user.click(nameInput);
    user.keyboard("micheal");
    user.click(emailInput);
    user.keyboard("micheal@micheal");

    fireEvent.click(button);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
