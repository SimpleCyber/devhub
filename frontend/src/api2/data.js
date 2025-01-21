import React, { useEffect, useState } from "react";
import axios from "axios";

// Custom Hook
const useFetchPlatformData = () => {
  const [linkedinData, setLinkedinData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  // Check if data should be fetched (based on cache)
  const shouldFetchData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return true; // No cache, fetch new data

    const { timestamp } = JSON.parse(cached);
    return Date.now() - timestamp > CACHE_DURATION; // Check expiration
  };

  // Cache data to localStorage
  const cacheData = (key, data) => {
    const cacheObject = {
      timestamp: Date.now(),
      data: data,
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
  };

  // Retrieve cached data from localStorage
  const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data } = JSON.parse(cached);
    return data;
  };

  useEffect(() => {
    const fetchLinkedinData = async () => {
      if (!shouldFetchData("linkedinCache")) {
        setLinkedinData(getCachedData("linkedinCache"));
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/linkedin/dearcoder-satyam/"
        );
        setLinkedinData(response.data);
        cacheData("linkedinCache", response.data); // Cache the fetched data
      } catch (err) {
        console.error("Failed to fetch LinkedIn data", err);
      }
    };

    const fetchGithubData = async () => {
      if (!shouldFetchData("githubCache")) {
        setGithubData(getCachedData("githubCache"));
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/github/SimpleCyber/"
        );
        setGithubData(response.data);
        cacheData("githubCache", response.data); // Cache the fetched data
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
      }
    };

    const fetchLeetcodeData = async () => {
      if (!shouldFetchData("leetcodeCache")) {
        setLeetcodeData(getCachedData("leetcodeCache"));
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/leetcode/vitthalbiradar50/"
        );
        setLeetcodeData(response.data);
        cacheData("leetcodeCache", response.data); // Cache the fetched data
      } catch (err) {
        console.error("Failed to fetch LeetCode data", err);
      }
    };

    // Trigger all API calls
    fetchLinkedinData();
    fetchGithubData();
    fetchLeetcodeData();
  }, []);

  return { linkedinData, githubData, leetcodeData };
};

export default useFetchPlatformData;
