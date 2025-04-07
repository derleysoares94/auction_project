from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = '__all__'
        
class AuctionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = ['title', 'description', 'image', 'start_price', 'current_price', 'start_date', 'end_date']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance