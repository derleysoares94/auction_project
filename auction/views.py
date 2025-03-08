from django.shortcuts import render
from rest_framework.views import APIView
from . models import Auction
from . serializer import AuctionSerializer
from rest_framework.response import Response

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
