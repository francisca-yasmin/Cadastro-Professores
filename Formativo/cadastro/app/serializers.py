from rest_framework import serializers
from .models import Usuario, Disciplina, Ambiente
from rest_framework_simplejwt.views import TokenObtainPairView

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'

class LoginSerializer(TokenObtainPairView):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True)

    # validar as informaçoes -> ver se o username e a senha estão corretas
    def validate(self, attrs):
        data = super().validate(attrs)

        data['user'] = {
            #o filho cria masi tres campos na aplicacao
            'username': self.user.username,
            'email': self.user.email,
            'tipo': 'self.user.tipo'
        }

        return data
    
