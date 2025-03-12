from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('auction/', views.AuctionList.as_view(), name='auction'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    path('authenticated/', views.is_authenticated),
]