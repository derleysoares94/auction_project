from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView, status
from . models import Auction
from . serializer import AuctionSerializer, AuctionUpdateSerializer

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_auction_by_id(request, pk):
    try:
        auction = Auction.objects.get(id=pk)
    except Auction.DoesNotExist:
        return Response({"error": "Auction not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AuctionSerializer(auction)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_auction_by_user(request, user_id):
    auctions = Auction.objects.filter(user=user_id)
    serializer = AuctionSerializer(auctions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_auction(request, pk):
    try:
        auction = Auction.objects.get(pk=pk)
    except Auction.DoesNotExist:
            return Response({"error": "Auction not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AuctionUpdateSerializer(auction, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_auction(request, pk):
    auction = get_object_or_404(Auction, id=pk)
    if auction:
        auction.delete()
        return Response({"message": "Auction deleted successfully"}, status=status.HTTP_200_OK)
    return Response({"error": "Was not possible to delete the auction"}, status=status.HTTP_400_BAD_REQUEST)
        