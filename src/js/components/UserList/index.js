import User from "../User";

const UserList = (firstChar) => {
  return `<ul class="user_list">
    ${firstChar.record
      .map((user) => {
        return `<li>${User(user)}</li>`;
      })
      .join("")}
    </ul>`;
};

export default UserList;
