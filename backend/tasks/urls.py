from django.urls import path
from .views import CreateTaskView, RetrieveTaskView, EditTaskView, DeleteTaskView


urlpatterns = [
  path('create', CreateTaskView.as_view()),
  path('<int:task_id>', RetrieveTaskView.as_view()),
  path('edit/<int:task_id>', EditTaskView.as_view()),
  path('delete/<int:task_id>', DeleteTaskView.as_view())
]

