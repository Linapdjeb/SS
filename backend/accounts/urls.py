from django.urls import path
from .views import (
  RegisterView,
  RetrieveUserView,
  ProfileView,
  SingleProfileView
)


urlpatterns = [
  path('register', RegisterView.as_view()),
  path('me', RetrieveUserView.as_view()),

  path('profile/me', ProfileView.as_view()),
  path('profile/<int:id>', SingleProfileView.as_view()),

]