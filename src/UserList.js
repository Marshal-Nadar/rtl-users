function UserList({ users }) {
  const renderedUsers = users.map((user, index) => {
    console.log(index, user);
    return (
      <tr key={user.name}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody data-testid='users'>{renderedUsers}</tbody>
      <div>
        <button>Go Back</button>
        <button>Clear</button>
      </div>
    </table>
  );
}

export default UserList;
