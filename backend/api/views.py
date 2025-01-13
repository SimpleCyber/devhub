import requests
from django.http import JsonResponse

import os

from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

GIT_HUB_KEY = os.getenv('GIT_HUB_KEY')
LINKEDIN_API_KEY = os.getenv('LINKEDIN_API_KEY')



def fetch_leetcode_profile(request, username):

    url = "https://leetcode.com/graphql/"
    
    query = """
    query userProfile($username: String!) {
        matchedUser(username: $username) {
            username
            profile {
                realName
                aboutMe
                company
                school
                websites
                countryName
                userAvatar
                reputation
                ranking
            }
            badges {
                name
                icon
                displayName
            }
            submitStats {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
        }
        allQuestionsCount {
            difficulty
            count
        }
        recentSubmissionList(username: $username) {
            title
            titleSlug
            timestamp
            statusDisplay
            lang
        }
    }
    """
    # Variables for the GraphQL query
    variables = {"username": username}

    try:
        # Send POST request to LeetCode GraphQL API
        response = requests.post(url, json={"query": query, "variables": variables})
        response.raise_for_status()  
        response_data = response.json()  
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": f"Request failed: {str(e)}"}, status=500)
    except ValueError:
        return JsonResponse({"error": "Failed to parse JSON response"}, status=500)

    data = response_data.get("data", {})
    matched_user = data.get("matchedUser")

    if matched_user:
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "User not found"}, status=404)




def fetch_github_data(request, username):
    base_url = "https://api.github.com"
    headers = {"Authorization": GIT_HUB_KEY}

    # Fetch Profile Data
    user_url = f"{base_url}/users/{username}"
    user_response = requests.get(user_url, headers=headers)
    if user_response.status_code != 200:
        return JsonResponse({"error": "GitHub user not found"}, status=user_response.status_code)
    user_data = user_response.json()

    # Extract Profile Info
    profile = {
        "avatar": user_data.get("avatar_url"),
        "username": user_data.get("login"),
        "full_name": user_data.get("name"),
        "email": user_data.get("email"),
        "location": user_data.get("location"),
        "followers": user_data.get("followers"),
        "following": user_data.get("following"),
        "public_repos": user_data.get("public_repos"),
    }

    # Fetch Repositories
    repos_url = f"{base_url}/users/{username}/repos"
    repos_response = requests.get(repos_url, headers=headers, params={"sort": "created", "per_page": 100})
    repos_data = repos_response.json()

    # Filter Top 5 Non-Forked Repositories
    top_repos = []
    for repo in repos_data:
        if not repo.get("fork") and len(top_repos) < 5:
            top_repos.append({
                "name": repo.get("name"),
                "html_url": repo.get("html_url"),
                "language": repo.get("language"),
                "topics": repo.get("topics"),
                "created_at": repo.get("created_at"),
                "updated_at": repo.get("updated_at"),
            })

    # Fetch Contributions and Commit Activity
    contribution_stats = []
    for repo in top_repos:
        owner = username
        repo_name = repo["name"]
        stats_url = f"{base_url}/repos/{owner}/{repo_name}/stats/contributors"
        stats_response = requests.get(stats_url, headers=headers)
        if stats_response.status_code == 200:
            repo_stats = stats_response.json()
            for contributor in repo_stats:
                if contributor.get("author", {}).get("login") == username:
                    contribution_stats.append({
                        "repo": repo_name,
                        "total": contributor.get("total"),
                        "weeks": contributor.get("weeks"),
                    })

    # Fetch Detailed Repository Statistics for Commits, PRs, Issues
    detailed_stats = []
    for repo in top_repos:
        owner = username
        repo_name = repo["name"]

        # Commits
        commits_url = f"{base_url}/repos/{owner}/{repo_name}/commits"
        commits_response = requests.get(commits_url, headers=headers, params={"per_page": 5})
        commits = commits_response.json() if commits_response.status_code == 200 else []

        # Pull Requests
        prs_url = f"{base_url}/repos/{owner}/{repo_name}/pulls"
        prs_response = requests.get(prs_url, headers=headers, params={"state": "all", "per_page": 5})
        pull_requests = prs_response.json() if prs_response.status_code == 200 else []

        # Issues
        issues_url = f"{base_url}/repos/{owner}/{repo_name}/issues"
        issues_response = requests.get(issues_url, headers=headers, params={"state": "all", "per_page": 5})
        issues = issues_response.json() if issues_response.status_code == 200 else []

        detailed_stats.append({
            "repo": repo_name,
            "commits": commits,
            "pull_requests": pull_requests,
            "issues": issues,
        })

    # Combine All Data
    result = {
        "profile": profile,
        "top_repositories": top_repos,
        "contributions": contribution_stats,
        "detailed_statistics": detailed_stats,
    }

    return JsonResponse(result, safe=False)




def fetch_linkedin_data(request, username):
    url = "https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url"

    # 🌿🌿🌿 Determine whether input is a URL or username
    if username.startswith("http"):
        querystring = {"url": username}  # Use URL if it starts with "http"
    else:
        querystring = {"url": f"https://www.linkedin.com/in/{username}"}  # Construct URL if it's a username

    print("🌿",LINKEDIN_API_KEY)


    headers = {
        "x-rapidapi-key": LINKEDIN_API_KEY,
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    # 🌿🌿🌿 Perform API request
    try:
        response = requests.get(url, headers=headers, params=querystring)
    except requests.RequestException as e:
        return JsonResponse({"error": f"An error occurred while making the request: {str(e)}"}, status=500)

    # 🌿🌿🌿 Handle response status codes
    if response.status_code == 200:
        try:
            data = response.json()
        except ValueError:
            return JsonResponse({"error": "Invalid JSON response received from API"}, status=500)

        # 🌿🌿🌿 Extract required data
        result = {
            "Username": data.get("username"),
            "Name": data.get("firstName"),
            "lastName": data.get("lastName"),
            "isCreator": data.get("isCreator"),
            "isOpenToWork": data.get("isOpenToWork"),
            "isHiring": data.get("isHiring"),
            "profilePicture": data.get("profilePicture"),
            "Bio": data.get("summary"),
            "headline": data.get("headline"),
            "Location": data.get("geo", {}).get("full"),
            "Education": [
                edu.get("fieldOfStudy") for edu in data.get("education", []) if "fieldOfStudy" in edu
            ]
        }

        # 🌿🌿🌿 Fetch posts data and handle errors
        posts_data = fetch_linkedin_posts(username)
        if isinstance(posts_data, dict) and "error" in posts_data:
            result["PostsError"] = posts_data["error"]
        else:
            result["Posts"] = posts_data

        return JsonResponse(result, safe=False)
    else:
        return JsonResponse({"error": f"Failed to fetch data. Status code: {response.status_code}, Response: {response.text}"}, status=500)

def fetch_linkedin_posts(username):
    url = "https://linkedin-data-api.p.rapidapi.com/get-profile-posts"

    querystring = {"username": username}

    headers = {
        "x-rapidapi-key": LINKEDIN_API_KEY,
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    # 🌿🌿🌿 Perform API request for posts
    try:
        response = requests.get(url, headers=headers, params=querystring)
    except requests.RequestException as e:
        return {"error": f"An error occurred while making the request: {str(e)}"}

    # 🌿🌿🌿 Handle response status codes
    if response.status_code == 200:
        try:
            posts = response.json().get("data", [])
        except ValueError:
            return {"error": "Invalid JSON response received from API"}

        # 🌿🌿🌿 Process each post and extract required details
        post_details = []
        for post in posts:
            image_url = None
            if post.get("image") and isinstance(post["image"], list) and len(post["image"]) > 0:
                image_url = post["image"][0].get("url")

            post_info = {
                "Caption": post.get("text"),
                "Total Reactions": post.get("totalReactionCount"),
                "Likes": post.get("likeCount"),
                "Comments": post.get("commentsCount"),
                "Reposts": post.get("repostsCount"),
                "Post URL": post.get("postUrl"),
                "Posted Date": post.get("postedDate"),
                "Image URL": image_url
            }
            post_details.append(post_info)

        return post_details
    else:
        return {"error": f"Failed to fetch posts. Status code: {response.status_code}, Response: {response.text}"}
