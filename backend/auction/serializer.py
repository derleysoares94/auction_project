from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = '__all__'