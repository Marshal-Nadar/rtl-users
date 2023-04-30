import { screen, render, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "Micheal", email: "micheal@micheal" },
    { name: "Sara", email: "sara@sara" },
  ];
  render(<UserList users={users} />);
  return { users };
}

test("render one row per user", () => {
  // Render the component
  renderComponent();
  // const { container } = render(<UserList users={users} />); // new way

  // Find all the rows in the table
  // screen.logTestingPlaygroundURL();  // For generating Link
  // const rows = screen.getAllByRole("row"); //Old ways

  const rows = within(screen.getByTestId("users")).getAllByRole("row"); //Old way

  // const rows = container.querySelectorAll("tbody tr");  // new way
  // console.log("rowsrowsrows", rows);

  // Assertion: correct no of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the name & email of each user", () => {
  // const users = [
  //   { name: "Micheal", email: "micheal@micheal" },
  //   { name: "Sara", email: "sara@sara" },
  // ];
  // render(<UserList users={users} />);

  const { users } = renderComponent();
  // console.log("userhsbfbhfdhjs", users);
  // renderComponent();

  // screen.logTestingPlaygroundURL();

  for (let user of users) {
    console.log("user.name", user.name);
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
