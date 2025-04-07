from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('auctions/', views.AuctionList.as_view(), name='auction'),
    path('auctions/user/<int:user_id>/', views.get_auction_by_user, name='auction-by-id'),
    path('delete-auction/<int:auction_id>/', views.delete_auction, name='delete_auction'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)