import "../css/main.css";
import SearchView from "./views/SearchView.js";
import LocalView from "./views/LocalView.js";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { $ } from "../lib/utils/selector";
import { store } from "./store";
import { changeRoute } from "./reducers/route";
import { removeLocalSearchList } from "./reducers/localUserList";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: SearchView },
    { path: "/local", view: LocalView },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));
  $("main").innerHTML = await view.getHtml();
  view.getJs();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  $("#app").innerHTML = Layout();
  changeRoute(location.pathname);

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      changeRoute(e.target.pathname);
      navigateTo(e.target.href);
    }
    if (e.target.matches(".star")) {
      if (!localStorage.getItem("book_mark")) {
        localStorage.setItem("book_mark", JSON.stringify([]));
      }
      const bookMarkLocalData = JSON.parse(localStorage.getItem("book_mark"));
      const isUserExist = bookMarkLocalData.includes(e.target.dataset.name);
      const filteredData = bookMarkLocalData.filter((user) => {
        return user !== e.target.dataset.name;
      });
      if (isUserExist) {
        e.target.classList.remove("fill");
        localStorage.setItem("book_mark", JSON.stringify(filteredData));
        removeLocalSearchList(e.target.dataset.name);
      } else if (!isUserExist) {
        e.target.classList.add("fill");
        localStorage.setItem(
          "book_mark",
          JSON.stringify([...bookMarkLocalData, e.target.dataset.name])
        );
      }
    }
  });

  router();
});
