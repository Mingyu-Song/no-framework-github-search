import AbstractView from "./AbstractView.js";
import { $ } from "../../lib/utils/selector";
import { store } from "../store/index.js";
import SearchResult from "../components/SearchResult/index.js";
import debounce from "../../lib/utils/debounce";
import sortByFirstChar from "../../lib/utils/sortByFirstChar";
import { addSearchList, triggerSearch } from "../reducers/userList.js";
import searchUser from "../../lib/api/search.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Search");
    this.state = {
      searchValue: "",
    };
  }

  inputHandler = (value) => {
    this.state.searchValue = value;
  };

  submitHandler = debounce(async (e) => {
    const response = await searchUser(this.state.searchValue);
    const users = response.data.items;
    const sortedUsers = sortByFirstChar(users);
    addSearchList(sortedUsers);
  }, 3000);

  getJs = () => {
    const renderUserList = () => {
      $("section").innerHTML = SearchResult(store.getState().userList);
    };
    store.subscribe(renderUserList);

    $("input").addEventListener("keyup", (e) => {
      this.inputHandler(e.target.value);
    });

    $("form").addEventListener("submit", (e) => {
      e.preventDefault();
      triggerSearch();
      this.submitHandler(e);
    });
  };

  async getHtml() {
    const { searchValue } = this.state;
    return `
            <form action="." >
              <input type="text" placeholder="유저 이름" autoComplete="off" value="${searchValue}" name="search" />
              <button type="submit">찾기</button>
            </form>
            <section>${SearchResult(store.getState().userList)}</section>
        `;
  }
}
