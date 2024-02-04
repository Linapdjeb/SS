from django.urls import path
from .views import (
  CreateWorkspaceView, 
  RetrieveWorkspaceView, 
  AddPeopleToWorkspace,
  EditWorkspaceView, 
  RetrieveArchivedWorkspaceView
) 


urlpatterns = [
  path('create', CreateWorkspaceView.as_view()),
  path('<int:workspace_id>', RetrieveWorkspaceView.as_view()),
  path('add-people/<int:workspace_id>', AddPeopleToWorkspace.as_view()),
  path('edit/<int:workspace_id>', EditWorkspaceView.as_view()),
  path('archived', RetrieveArchivedWorkspaceView.as_view()),
]