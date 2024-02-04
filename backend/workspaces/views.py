from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import WorkspaceSerializer, GetWorkspaceSerializer
from .models import Workspace

from accounts.models import UserAccount, Profile
from accounts.serializers import GetProfileSerializer
from tasks.models import Task
from tasks.serializers import GetTaskSerializer


class CreateWorkspaceView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def post(self, request):
    serializer = WorkspaceSerializer(data=request.data)

    if serializer.is_valid():

      data = serializer.save(creator=request.user)

      return Response(data, status=status.HTTP_200_OK)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AddPeopleToWorkspace(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def post(self, request, *args, **kwargs):
    workspace_id = kwargs.get('workspace_id')
    people_added = kwargs.get('people')

    try:
      workspace = Workspace.objects.get(id=workspace_id)

      for person in people_added:
        user = UserAccount.objects.get(email=person)
        profile = Profile.objects.get_or_create(user=user)
        profile.workspaces.add(workspace)
        profile.save()

      return Response(GetWorkspaceSerializer(workspace), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
      return Response({'error': 'Workspace or Profile not found'}, status=status.HTTP_400_BAD_REQUEST)



class RetrieveWorkspaceView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    workspace_id = kwargs.get('id')
    
    try:
      workspace = GetWorkspaceSerializer(Workspace.objects.get(id=workspace_id)).data
      tasks = GetTaskSerializer(Tasks.objects.filter(workspace=workspace, is_private=False)).data
      profiles = GetProfileSerializer(Profile.objects.filter(workspace=workspace)).data

      return Response({workspace, tasks, profiles}, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
      return Response({'error': "No workspace found"}, status=status.HTTP_404_NOT_FOUND)
  


class RetrieveArchivedWorkspaceView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request):
    try:
      workspace = Workspace.objects.get(creator=request.user, is_archived=True)
      return Response(GetWorkspaceSerializer(workspace).data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
      return Response({'error': "No workspace found"}, status=status.HTTP_404_NOT_FOUND)



class EditWorkspaceView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def put(self, request, *args, **kwargs):
    workspace_id = kwargs.get('id')
    serializer = WorkspaceSerializer(data=request.data)
    
    try:
      workspace = Workspace.objects.get(id=workspace_id)
      if workspace.creator == request.user:
        data = serializer.update()
        return Response(data, status=status.HTTP_200_OK)
      else:
        return Response({'error': "this user can edit workspace"},status=status.HTTP_401_UNAUTHORIZED)
      
    except ObjectDoesNotExist:
      return Response({'error': "Could not edit workspace"}, status=status.HTTP_304_NOT_MODIFIED)