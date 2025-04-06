import axios from 'axios';
import { Repo, CommitActivity } from '@/types/github';

const GITHUB_API = 'https://api.github.com';

export const fetchUserRepos = async (username: string): Promise<Repo[]> => {
  const { data } = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
    params: { sort: 'updated', per_page: 100 }
  });
  return data;
};

export const fetchCommitActivity = async (
  username: string,
  repo: string
): Promise<CommitActivity[]> => {
  const { data } = await axios.get(
    `${GITHUB_API}/repos/${username}/${repo}/stats/commit_activity`
  );
  return data || [];
};