from django.urls import path
from .views import RetrieveSearchView, RetrievePeopleSearchView

urlpatterns = [
    path('', RetrieveSearchView.as_view()),
    path('people', RetrievePeopleSearchView.as_view())
]
