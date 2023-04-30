import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("can receive a new user and show it on a list", async () => {
  // render(<App />);
  const { container } = render(<App />);

  await waitFor(() => {
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    // const button = screen.getByRole("button");

    user.click(nameInput);
    user.keyboard("jane");

    user.click(emailInput);
    user.keyboard("micheal@micheal");

    //Working
    fireEvent.click(container.querySelector(".btn-how-to-choose-provider"));
    screen.logTestingPlaygroundURL();

    // user.click(button);

    screen.debug();

    // By using 'row'
    // const another = screen.getByRole("row", {
    //   name: /jane micheal@micheal/i,
    // });

    const name = screen.getByRole("cell", { name: "jane" });
    const email = screen.getByRole("cell", { name: "micheal@micheal" });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    // expect(another).toBeInTheDocument();
  });
});
