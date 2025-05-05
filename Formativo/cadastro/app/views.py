from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Usuario, Disciplina, Ambiente
from .serializers import UsuarioSerializer, DisciplinaSerializer, AmbienteSerializer, LoginSerializer
from .permissions import IsGestor, IsProfessor,  IsDonoOuGestor
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

# CRUD -> Usuario (professor, gestor)
class UsuarioListCreate(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]

#get, put e delete
class UsuarioRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]
    # o usuario vai procurar pelo id do usuario(professor/gestor)
    lookup_field = 'pk' 

# CRUD -> disciplina
class DisciplinaListCreate(ListCreateAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET': #se não for get eh post
            return [IsAuthenticated()]
        return [IsGestor]

#get, put e delete
class DisciplinaRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

#permite que o professor visualize a lista das disciplinas dos professores
class DisciplinaProfessorList(ListAPIView):
    serializer_class = DisciplinaSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        #filtra pela requisição feita pelo usuário
        return Disciplina.objects.filter(professor=self.request.user)
    
#CRUD -> ambiente
class AmbienteListCreate(ListCreateAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer

    #define permissões
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated]
        return [IsGestor]

    #define a consulta que o usuario vai fazer
    def get_queryset(self):
        queryset = super().get_queryset()
        professor_id = self.request.query_params.get('professor', None)
        if professor_id:
            queryset = queryset.filter(professor_id=professor_id)
        return queryset

class AmbienteRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsDonoOuGestor]

#ver as reservas feita pelo proprio professor
class AmbienteProfessorList(ListAPIView):
    serializer_class = AmbienteSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        #filtra reservas daqueele professor que tá fazendo a consulta
        return Ambiente.objects.filter(professor=self.request.user)

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

