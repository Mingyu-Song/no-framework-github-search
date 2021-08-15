import AbstractView from "./AbstractView.js";
import SearchResult from "../components/SearchResult/index.js";
import {
  addLocalSearchList,
  localTriggerSearch,
} from "../reducers/localUserList.js";
import debounce from "../../lib/utils/debounce";
import { $ } from "../../lib/utils/selector";
import sortByFirstChar from "../../lib/utils/sortByFirstChar";
import { store } from "../store/index.js";
import searchUser from "../../lib/api/search.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Local");
    this.state = {
      searchValue: "",
    };
  }

  inputHandler = (value) => {
    this.state.searchValue = value;
  };

  submitHandler = debounce(async (e) => {
    const response = await searchUser(this.state.searchValue);
    if (!localStorage.getItem("book_mark")) {
      localStorage.setItem("book_mark", JSON.stringify([]));
    }
    const bookMarkLocalData = JSON.parse(localStorage.getItem("book_mark"));
    const localUserInGithub = response.data.items.filter((user) => {
      return bookMarkLocalData.includes(user.login);
    });

    const sortedUsers = sortByFirstChar(localUserInGithub);
    addLocalSearchList(sortedUsers);
  }, 3000);

  getJs = () => {
    const renderUserList = () => {
      $("section").innerHTML = SearchResult(store.getState().localUserList);
    };
    store.subscribe(renderUserList);

    $("input").addEventListener("keyup", (e) => {
      this.inputHandler(e.target.value);
    });

    $("form").addEventListener("submit", (e) => {
      e.preventDefault();
      localTriggerSearch();
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
          <section>${SearchResult(store.getState().localUserList)}</section>
        `;
  }
}
