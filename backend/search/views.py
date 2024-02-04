from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db.models import Q

from accounts.models import UserAccount
from accounts.serializers import UserSerializer
from workspaces.models import Workspace
from workspaces.serializers import GetWorkspaceSerializer


class RetrieveSearchView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    search = request.GET.get('q', '')

    try:
      workspaces = Workspace.objects.filter(
          Q(title__icontains=search) | Q(description__icontains=search) | 
          Q(company__icontains=search) | Q(location__icontains=search), is_archived=False
      )

      users = UserAccount.objects.filter(
          Q(first_name__icontains=search) | Q(last_name__icontains=search) | Q(email__icontains=search)
      )

      data = [GetWorkspaceSerializer(workspaces), UserSerializer(users)]

      return Response(data=data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
      return Response({'error': f"No {search} found"}, status=status.HTTP_404_NOT_FOUND)

    
class RetrievePeopleSearchView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    search = request.GET.get('q', '')

    try:
      users = UserAccount.objects.filter(
          Q(first_name__icontains=search) | Q(last_name__icontains=search) | Q(email__icontains=search)
      )

      data = UserSerializer(users)

      return Response(data=data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
      return Response({'error': f"No {search} found"}, status=status.HTTP_404_NOT_FOUND)