from django.test import TestCase
from users.models import CustomUser
from .models import Auction
from datetime import datetime, timedelta
from decimal import Decimal

class AuctionModelTest(TestCase):
    def setUp(self):
        # Create a user with user_type 'company'
        self.company_user = CustomUser.objects.create_user(
            username='company_user',
            email='company@example.com',
            password='password123',
            user_type='company'
        )
        # Create a user with user_type 'user'
        self.individual_user = CustomUser.objects.create_user(
            username='individual_user',
            email='user@example.com',
            password='password123',
            user_type='user'
        )

    def test_create_auction_successfully(self):
        auction = Auction.objects.create(
            title="Test Auction",
            description="This is a test auction.",
            image="uploads/test_image.jpg",
            start_price=Decimal("100.00"),
            current_price=Decimal("100.00"),
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=7),
            user=self.company_user
        )
        self.assertEqual(Auction.objects.count(), 1)
        self.assertEqual(auction.title, "Test Auction")
        self.assertEqual(auction.user, self.company_user)

    def test_update_auction(self):
        auction = Auction.objects.create(
            title="Old Title",
            description="Old description.",
            image="uploads/old_image.jpg",
            start_price=Decimal("200.00"),
            current_price=Decimal("200.00"),
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=7),
            user=self.company_user
        )
        auction.title = "Updated Title"
        auction.description = "Updated description."
        auction.save()

        updated_auction = Auction.objects.get(id=auction.id)
        self.assertEqual(updated_auction.title, "Updated Title")
        self.assertEqual(updated_auction.description, "Updated description.")

    def test_delete_auction(self):
        auction = Auction.objects.create(
            title="Auction to Delete",
            description="This auction will be deleted.",
            image="uploads/delete_image.jpg",
            start_price=Decimal("300.00"),
            current_price=Decimal("300.00"),
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=7),
            user=self.company_user
        )
        auction_id = auction.id
        auction.delete()

        self.assertFalse(Auction.objects.filter(id=auction_id).exists())