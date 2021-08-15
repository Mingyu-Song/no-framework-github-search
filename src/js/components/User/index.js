const User = (data) => {
  const { avatar_url, login } = data;
  if (!localStorage.getItem("book_mark")) {
    localStorage.setItem("book_mark", JSON.stringify([]));
  }
  const bookMarkLocalData = JSON.parse(localStorage.getItem("book_mark"));
  const userExist = bookMarkLocalData.includes(login);

  return `
    <div>
      <div class="user_info">
        <img src="${avatar_url}"/>
        <span>${login}</span>
      </div>
      <div class="book_mark">
        <svg class="star${
          userExist ? " fill" : ""
        } "version="1.1" data-src="${avatar_url}" data-name="${login}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80" xml:space="preserve">
          <polygon class="star svg-star" points="40,10 49.1,28.4 69.5,31.4 54.7,45.8 58.2,66 40,56.5 21.8,66 25.3,45.8 10.5,31.4 30.9,28.4 " />
        </svg>
    </div>
    </div>
  `;
};

export default User;
