from django.urls import path
from . import views

urlpatterns = [
    path('', views.AuctionList.as_view(), name='auction'),
]