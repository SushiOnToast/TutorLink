from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.db.models import Q


class CreateConnectionRequestView(generics.CreateAPIView):
    queryset = ConnectionRequest.objects.all()
    serializer_class = ConnectionRequestSerialiser
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        sender = self.request.user
        receiver = serializer.validated_data["receiver"]

        # Prevent sending requests to oneself
        if sender == receiver:
            return Response(
                {"error": "You cannot send a connection request to yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Prevent sending duplicate requests
        if ConnectionRequest.objects.filter(sender=sender, receiver=receiver).exists():
            return Response(
                {"error": "Connection request already sent."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save(
            sender=sender, sender_email=sender.email, receiver_email=receiver.email
        )


class UpdateConnectionRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, new_status):
        # Ensure status is one of the allowed values
        if new_status not in ["pending", "accepted", "rejected"]:
            return Response(
                {"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            connection_request = ConnectionRequest.objects.get(
                pk=pk, receiver=request.user
            )

            if new_status == "accepted":
                # Create an ongoing connection
                OngoingConnection.objects.create(
                    student=(
                        connection_request.sender
                        if connection_request.sender.role == "student"
                        else connection_request.receiver
                    ),
                    volunteer=(
                        connection_request.sender
                        if connection_request.sender.role == "volunteer"
                        else connection_request.receiver
                    ),
                )

            connection_request.delete()  # Delete the connection request

            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except ConnectionRequest.DoesNotExist:
            return Response(
                {"error": "Connection request not found or unauthorized"},
                status=status.HTTP_404_NOT_FOUND,
            )


class ListConnectionRequestView(generics.ListAPIView):
    serializer_class = ConnectionRequestSerialiser
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConnectionRequest.objects.filter(
            Q(sender=user) | Q(receiver=user)
        )


class ListOngoingConnectionsView(generics.ListAPIView):
    serializer_class = OngoingConnectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return OngoingConnection.objects.filter(student=user).union(
            OngoingConnection.objects.filter(volunteer=user)
        )
