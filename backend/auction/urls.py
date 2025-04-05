from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('auctions/', views.AuctionList.as_view(), name='auction')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)