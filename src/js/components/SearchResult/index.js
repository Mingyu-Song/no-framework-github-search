import AlphabetList from "../AlphabetList";

const SearchResult = ({ users, status }) => {
  switch (status) {
    case null:
      return `<p>검색어를 입력해주세요</p>`;
      break;
    case "loading":
      return `<p>유저를 찾고있어요! 😀</p>`;
      break;
    case "no_result":
      return `<p>결과가 없습니다</p>`;
      break;
    case "stale":
      return `
        <ul class="alphabet_list">
          ${AlphabetList(users)}
        </ul>
        `;
    default:
      return `<p>에러가 발생했습니다</p>`;
  }
};

export default SearchResult;
