import UserList from "../UserList";

const AlphabetList = (users) => {
  return users
    .map((firstChar) => {
      return `<li>
                  <div>${firstChar.alphabet}</div>
                  ${UserList(firstChar)}
              </li>
            `;
    })
    .join("");
};
export default AlphabetList;
