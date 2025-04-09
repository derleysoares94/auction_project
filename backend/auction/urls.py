from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('auctions/', views.AuctionList.as_view(), name='auction'),
    path('auctions/user/<int:user_id>/', views.get_auction_by_user, name='auction_by_user'),
    path('<int:pk>/', views.get_auction_by_id, name='auction_by_id'),
    path('update/<int:pk>/', views.update_auction, name='update-auction'),
    path('delete-auction/<int:pk>/', views.delete_auction, name='delete_auction'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)