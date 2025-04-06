import axios from 'axios';
// import { Repo, CommitActivity } from '@/types/github';

// src/lib/githubApi.ts
const API_CACHE: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5-minute cache

export const fetchWithAuth = async (url: string) => {
  // Return cached data if available
  if (API_CACHE[url] && Date.now() - API_CACHE[url].timestamp < CACHE_DURATION) {
    return API_CACHE[url].data;
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_TOKEN 
        ? `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        : '',
      'Accept': 'application/vnd.github+json'
    }
  });

  // Cache the response
  API_CACHE[url] = {
    data: response.data,
    timestamp: Date.now()
  };

  return response.data;
};

// Updated API functions
export const fetchUserRepos = (username: string) => 
  fetchWithAuth(`https://api.github.com/users/${username}/repos?per_page=100`);

export const fetchCommitActivity = (username: string, repo: string) =>
  fetchWithAuth(`https://api.github.com/repos/${username}/${repo}/stats/commit_activity`);