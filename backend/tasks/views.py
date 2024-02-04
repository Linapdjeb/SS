from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import TaskSerializer, GetTaskSerializer
from .models import Task

from accounts.models import UserAccount
from workspaces.models import Workspace


class CreateTaskView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def post(self, request):
    serializer = TaskSerializer(data=request.data)
    assignee = UserAccount.objects.filter(id=assigned_to).first()
    workspace_added = Workspace.objects.filter(id=workspace).first()

    if serializer.is_valid():

      data = serializer.save(creator=request.user, assigned_to=assignee, workspace=workspace_added)

      return Response(data, status=status.HTTP_200_OK)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RetrieveTaskView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    task_id = kwargs.get('id')
    
    try:
      task = Task.objects.get(id=task_id)
      return Response(GetTaskSerializer(task).data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
      return Response({'error': "No task found"}, status=status.HTTP_404_NOT_FOUND)
  

  
class EditTaskView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def put(self, request, *args, **kwargs):
    task_id = kwargs.get('id')
    serializer = TaskSerializer(data=request.data)
    
    try:
      task = Task.objects.get(id=task_id)
      if task.creator == request.user:
        data = serializer.update()
        return Response(data, status=status.HTTP_200_OK)
      else:
        return Response({'error': "this user can edit task"}, status=status.HTTP_401_UNAUTHORIZED)
      
    except ObjectDoesNotExist:
      return Response({'error': "Could not edit task"}, status=status.HTTP_304_NOT_MODIFIED)



class DeleteTaskView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def delete(self, request, *args, **kwargs):
    task_id = kwargs.get('id')
    
    try:
      task = Task.objects.get(id=task_id)
      if task.creator == request.user:
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
      else:
        return Response({'error': "this user can delete task"},status=status.HTTP_401_UNAUTHORIZED)
      
    except ObjectDoesNotExist:
      return Response({'error': "Could not delete task"}, status=status.HTTP_304_NOT_MODIFIED)
