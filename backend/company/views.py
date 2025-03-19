from django.shortcuts import render
from . serializer import CompanyRegistrationSerializer


from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = CompanyRegistrationSerializer(data = request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)
