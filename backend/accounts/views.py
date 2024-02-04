from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer, UserSerializer, ProfileSerializer, GetProfileSerializer
from .models import UserAccount, Profile

from tasks.models import Task
from tasks.serializers import GetTaskSerializer
from workspaces.models import Workspace
from workspaces.serializers import GetWorkspaceSerializer



class RegisterView(APIView):
  def post(self, request):
    data = request.data

    serializer = UserCreateSerializer(data=data)

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.create(serializer.validated_data)
    user = UserSerializer(user)

    return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request):
    user = request.user
    user = UserSerializer(user)

    return Response(user.data, status=status.HTTP_200_OK)


class ProfileView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    try:
      profile = request.user.profile
    except ObjectDoesNotExist:
      return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)
    
    private_tasks = GetTaskSerializer(Task.objects.get(assigned_by=request.user, is_private=True)).data
    assigned_tasks = GetTaskSerializer(Task.objects.get(assigned_to=request.user)).data
    profile_data = GetProfileSerializer(request.user.profile).data
    return Response(data=[profile_data, private_tasks, assigned_tasks], status=status.HTTP_200_OK)

  def post(self, request):
    has_profile = Profile.objects.filter(user=request.user).exists()

    if has_profile:
      instance = request.user.profile
      serializer = ProfileSerializer(instance, data=request.data)
    else:
      serializer = ProfileSerializer(data=request.data)
    
    if serializer.is_valid():
      serializer.save(user=request.user)
      
      profile_data = GetProfileSerializer(request.user.profile).data
      return Response(data=profile_data, status=status.HTTP_200_OK)
    else:
      return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # edit profile or leave workspace
  def put(self, request, *args, **kwargs):
    serializer = ProfileSerializer(data=request.data)
    
    try:
      profile = Profile.objects.get(user=request.user)
      if profile.user == request.user:
        data = serializer.update()
        return Response(data, status=status.HTTP_200_OK)
      else:
        return Response({'error': "this user can't edit profile"}, status=status.HTTP_401_UNAUTHORIZED)
      
    except ObjectDoesNotExist:
      return Response({'error': "Could not edit profile"}, status=status.HTTP_304_NOT_MODIFIED)


class SingleProfileView(APIView):
  permissions_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    try:
      user = UserAccount.objects.get(id=kwargs.get('profile_id'))
      profile_data = GetProfileSerializer(user.profile).data
      return Response(data=profile_data, status=status.HTTP_200_OK)
        
    except ObjectDoesNotExist:
      return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)


