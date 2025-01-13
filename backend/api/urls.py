from django.urls import path
from .views import fetch_leetcode_profile, fetch_github_data, fetch_linkedin_data

urlpatterns = [
    path('leetcode/<str:username>/', fetch_leetcode_profile, name='fetch_leetcode_profile'),
    path('github/<str:username>/', fetch_github_data, name='fetch_github_data'),
    path('linkedin/<str:username>/', fetch_linkedin_data, name='fetch_linkedin_data'),
]
