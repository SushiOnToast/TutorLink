from django.urls import path
from .views import CreateConnectionRequestView, UpdateConnectionRequestView, ListConnectionRequestView, ListOngoingConnectionsView

urlpatterns = [
    path("", CreateConnectionRequestView.as_view(), name="create_connection_request"),
    path("requests/", ListConnectionRequestView.as_view(), name="list_connection_requests"),
    path("update/<int:pk>/<str:new_status>/", UpdateConnectionRequestView.as_view(), name="update_connection_request"),
    path("ongoing/", ListOngoingConnectionsView.as_view(), name="list_ongoing_connections"),  # New path for ongoing connections
]
