from rest_framework import serializers
from .models import Usuario, Disciplina, Ambiente, Sala
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Q

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    #criptografa a senha dos usuaios
    def create(self, validated_data):
        user = Usuario(**validated_data)
        user.set_password(validated_data['password'])  
        user.save()
        return user

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'
        
class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    sala = SalaSerializer(source = 'reserva', read_only=True)
    
    class Meta:
        model = Ambiente
        fields = '__all__'
        
    # se estiver criando ele bloqueia
    def validate(self, attrs):
        reserva = attrs.get('reserva')  # Sala
        dt_inicio = attrs.get('dt_inicio')
        dt_termino = attrs.get('dt_termino')
        periodo = attrs.get('periodo')

        if reserva and dt_inicio and dt_termino and periodo:
            conflitos = Ambiente.objects.filter(
                reserva=reserva,
                dt_inicio__lte=dt_termino,
                dt_termino__gte=dt_inicio
            )
            #se for integral ele não vai considerar
            conflitos = conflitos.filter(Q(periodo=periodo) | Q(periodo="I"))

            if self.instance:
                #editando ele vai ecluir a propria reserva da verificação
                conflitos = conflitos.exclude(pk=self.instance.pk)

            #se exitir reserva, lança uma mensagem que já existe uma reserva(conflito)
            if conflitos.exists():
                raise serializers.ValidationError(
                    "Este ambiente já está reservado nesse período e data."
                )

        return attrs #retorna os dados validados
    
    
class LoginSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True)

    # validar as informaçoes -> ver se o username e a senha estão corretas
    def validate(self, attrs):
        data = super().validate(attrs)

        data['user'] = {
            #o filho cria mais tres campos na aplicacao
            'username': self.user.username,
            'email': self.user.email,
            'tipo': self.user.tipo
        }

        return data

    
