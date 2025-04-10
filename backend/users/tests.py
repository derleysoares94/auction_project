from django.test import TestCase
from django.urls import reverse
from .models import CustomUser

class SetUpTests(TestCase):
    def setUp(self):
        # Create a user with username, email, and password
        self.user = CustomUser.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123"
        )
        self.registration_url = reverse("register")
        self.token_url = reverse("token_obtain_pair")
        self.logout_url = reverse("logout")
        self.protected_url = reverse("is_authenticated")

    def test_user_creation_in_setup(self):
        # Verify that the user created in setUp exists in the database
        user = CustomUser.objects.get(username="testuser")
        self.assertIsNotNone(user)
        self.assertEqual(user.email, "testuser@example.com")

    def test_urls_initialization_in_setup(self):
        # Verify that the URLs initialized in setUp are not None
        self.assertIsNotNone(self.registration_url)
        self.assertIsNotNone(self.token_url)
        self.assertIsNotNone(self.logout_url)
        self.assertIsNotNone(self.protected_url)