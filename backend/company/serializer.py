from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class CompanyRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model=Company
        fields = ['name', 'email', 'password']
        
    def create(self, validated_data):
        company = Company(
            name = validated_data['name'],
            email = validated_data['email'],
            password = make_password(validated_data['password'])
        )
        company.save()
        return company
    
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'