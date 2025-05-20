from django.contrib import admin
from .models import Usuario, Disciplina, Sala, Ambiente
from django.contrib.auth.admin import UserAdmin

#campos que irão aparecer no admin ao logar no banco
class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets +(
        (None, {
            "fields":(
                'tipo', 'ni', 'telefone', 'data_contratacao', 'nascimento'
            ),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets +(
        (None, {
            "fields":(
                'tipo', 'ni', 'telefone', 'data_contratacao', 'nascimento'
            ),
        }),
    )

#registra todas as tabelas e os campos que foram criadas no modelo
admin.site.register(Usuario, UsuarioAdmin) #registrar no banco a tabela usuario
admin.site.register(Disciplina) #regitra disciplina
admin.site.register(Sala) #registra sala
admin.site.register(Ambiente) #registra ambiente

