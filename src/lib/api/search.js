import { Octokit } from "@octokit/core";

const octokit = new Octokit();
const searchUser = async (value) => {
  const res = await octokit.request("/search/users", {
    q: value + "in:name",
    page: 1,
    per_page: 100,
  });
  return res;
};

export default searchUser;
