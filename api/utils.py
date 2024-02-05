from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

def update_note(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)