from django.urls import path
from . import views

urlpatterns = [
    path('auctions/', views.AuctionList.as_view(), name='auction')
]