import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const API_URL = "https://devhub-k9dg.onrender.com/api/";



// Custom Hook
const useFetchPlatformData = () => {
  const [linkedinData, setLinkedinData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [usernames, setUsernames] = useState(null);

  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
  const FIREBASE_USER_CACHE_KEY = "firebaseUser";

  // Utility: Check if data should be fetched (based on cache)
  const shouldFetchData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return true; // No cache, fetch new data

    const { timestamp } = JSON.parse(cached);
    return Date.now() - timestamp > CACHE_DURATION; // Check expiration
  };

  // Utility: Cache data to localStorage
  const cacheData = (key, data) => {
    const cacheObject = {
      timestamp: Date.now(),
      data: data,
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
  };

  // Utility: Retrieve cached data from localStorage
  const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data } = JSON.parse(cached);
    return data;
  };

  // Utility: Clear all cache except for the Firebase user
  const clearCacheExceptUser = () => {
    const firebaseUserCache = localStorage.getItem(FIREBASE_USER_CACHE_KEY);
    localStorage.clear();
    if (firebaseUserCache) {
      localStorage.setItem(FIREBASE_USER_CACHE_KEY, firebaseUserCache);
    }
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      if (!auth.currentUser) return;

      const db = getFirestore();
      const docRef = doc(db, "profiles", auth.currentUser.uid);
      const currentEmail = auth.currentUser.email;

      // Check if the cached Firebase user matches the current user
      const cachedUser = getCachedData(FIREBASE_USER_CACHE_KEY);
      if (!cachedUser || cachedUser.email !== currentEmail) {
        clearCacheExceptUser(); // Clear old cache for a new user
        cacheData(FIREBASE_USER_CACHE_KEY, { email: currentEmail });
      }

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsernames({
            linkedin: data.linkedin,
            github: data.github,
            leetcode: data.leetcode,
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      }
    };

    fetchUsernames();
  }, []);

  useEffect(() => {
    if (!usernames) return;

    const fetchLinkedinData = async () => {
      if (!shouldFetchData("linkedinCache")) {
        setLinkedinData(getCachedData("linkedinCache"));
        return;
      }
      try {
        const response = await axios.get(
          `${API_URL}linkedin/${usernames.linkedin}/`,
        );
        setLinkedinData(response.data);
        cacheData("linkedinCache", response.data);
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
          `${API_URL}github/${usernames.github}/`,
        );
        setGithubData(response.data);
        cacheData("githubCache", response.data);
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
          `${API_URL}leetcode/${usernames.leetcode}/`,
        );
        setLeetcodeData(response.data);
        cacheData("leetcodeCache", response.data);
      } catch (err) {
        console.error("Failed to fetch LeetCode data", err);
      }
    };

    // Trigger all API calls
    fetchLinkedinData();
    fetchGithubData();
    fetchLeetcodeData();
  }, [usernames]);

  return { linkedinData, githubData, leetcodeData };
};

export default useFetchPlatformData;
