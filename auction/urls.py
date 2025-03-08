from django.urls import path
from . import views

urlpatterns = [
    path('auction/', views.Auction.as_view(), name='auction'),
]