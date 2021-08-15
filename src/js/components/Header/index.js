import "../../../css/header.css";
import { store } from "../../store";

const Header = () => {
  store.subscribe((e) => {
    const currRoute = store.getState().route.href;

    let activeTabIndex;

    document.querySelectorAll(`a[data-value]`).forEach((a, index) => {
      if (a.dataset.value === currRoute) activeTabIndex = index;
    });

    const sliderEl = document.querySelector(".slider");
    sliderEl.style.left = `${activeTabIndex * 50}%`;
  });

  return `
      <header>
        <h1><a href="/" data-link>Github Stars</a></h1>
        <div class="wrapper">
          <div class="links">
            <a href="/" data-link data-value="/">API</a>
            <a href="/local" data-link data-value="/local">로컬</a>
            <div class="slider"/>
          </div>
        </div>
      </header>
  `;
};

export default Header;
