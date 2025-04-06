from django.shortcuts import render
from rest_framework.views import APIView
from . models import Auction
from . serializer import AuctionSerializer

from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

@permission_classes([IsAuthenticated])
class AuctionList(APIView):
    def get(self, request):
        auctions = Auction.objects.all()
        serializer = AuctionSerializer(auctions, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AuctionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_auction_by_user(request, user_id):
    auctions = Auction.objects.filter(user=user_id)
    auctions_data = list(auctions.values('id', 'title', 'description', 'current_price'))
    return Response({'auctions': auctions_data})