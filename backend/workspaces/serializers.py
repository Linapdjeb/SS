from rest_framework import serializers
from .models import Workspace




class WorkspaceSerializer(serializers.ModelSerializer):

  class Meta:
    model = Workspace
    fields = '__all__'


class GetWorkspaceSerializer(serializers.ModelSerializer):

  class Meta:
    model = Workspace
    fields = [
            'id','title', 'description', 'company','website',
            'location', 'creator', 'categories'
          ]
