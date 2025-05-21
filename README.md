# Cadastro Professores 📓
O projeto consiste em fazer o cadastro de um ambiente estudantil, sendo possivel cadastrar, os usuários que podem existir na aplicação de duas maneiras, como gestor e professor. 
O gestor pode fazer todo o monitoramento e supervisão do ambiente de forma integral e de livre acesso. O gestor pode atualizar, deletar, criar e visualizar todos os itens das tabelas presentes no banco. O professor pode visualizar apenas o que se diz referente a ele, como o ambiente onde ele irá ministrar a sua aula, assim como a disciplina que pertence a ele.

### Passo a Passo 🖊️
Para rodar a aplicação é necessário fazer algumas checagens.
1. Primeiro verifique se na sua máquina tem instalado o `MySql Workbench`
2. Se na sua máquina não estiver instalado o banco, realize a instalação acessando a documentação [Instalação MySql (docx)](back/docs/BCD-Aula01-1-Instalação_MYSQL.docx).
3. Após realizar toda a configuração do documentto crie uma tabela chamada `cadastro` e execute o comando.
4. Depois de fazer a verificação do banco, verifique se na sua máquina tem instalado as dependências do python, caso não encontre é necessário fazer a instalção dele também.
5. Você pode instalar o python clicando no link [Instalação do Python](https://www.python.org/downloads/).
6. Após criar o banco com todas as tabelas e instalar o python, nós vamos para o VisualCode rodar a aplicação.


### No VisualCode 💻
Para clonar o repositório você precisa dar um `git clone [link do repositório]`, depois de clonado nós vamos acessar a pasta do projeto.
1. Entrar na pasta `back` no VsCode e acessar o terminal que pode ser no próprio VsCode.
2. No terminal, dentro da pasta do projeto você vai instalar a `env` que vai ser o ambiente virtual onde vai rodar a aplicação.
3. Com o comando `python -m venv env` você cria a sua env
4. Após a criação da env é preciso ativar ela com o comando 
`.\env\Scripts\activate`
5. Depois de ativar a env, é necessário instalar as bibliotecas que o projeto irá utilizar, para isso utilize o comando `pip install -r .\requirements.txt`.
6. Após a instalação de todas as dependências necessárias, verifique no `settings.py` do projeto se as configurações do database estão corretas.
~~~
 DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.mysql',
         'NAME':'cadastro', #nome do banco de dados
         'USER': 'root', #usuario no workbench
         'PASSWORD': 'senai', #senha no workbench
         'HOST': 'localhost', #endereço
         'PORT': '3306' #porta onde vai rodar a aplicação
     }
}
~~~
No seu `settings.py` é para parecer algo assim, caso não exista, você pode copiar e colar, e fazer a alteração de acordo com o banco instalado e configurado na sua máquina.

7. Após essa verificação, com o comando `python .\manage.py runserver` a aplicação vai estar disponivel em um endereço http.
8. Seguindo os endereços das páginas disponiveis na `urls.py` da aplicação, você conseguirá visualizar todas as funcionalidades do projeto.
---
### Informações Adicionais 📝
Seguindo todos esses passos o seu projeto estará rodando da forma correta, mas para testar de forma eficiente, você terá que criar um acesso e logar como um gestor, para ter
a experiência por completo.
1. Para criar um usuário você usará o comando `python .\manage.py createsuperuser`, ao executar esse comando, você vai informar os campos que foram pré definidos no `models.py`, mas lembre *no tipo de usuário, você terá que colocar 'G' para ser cadastrado no banco como gestor* e conseguir executar todas as funcionalidades do sistema.
2. Para qualquer modificação feita nas `models.py` do projeto, precisa fazer a migração para o banco novamente
3. Para fazer as migrações utilize o comando `python .\manage.py makemigrations`, depois o comando `python .\manage.py migrate`.
4. O seu banco foi atualizado, depois disso, é só rodar o servidor novamente.
5. Verifique se você está dentro da pasta correta, pois os comandos funcionaram apenas dentro da pasta e com o ambiente virtual ativado.

### Considerações Finais
Para toda e qualquer dúvida, você pode acessar a documentação completa de todo o projeto no arquivo de [Documentação](https://documenter.getpostman.com/view/41755077/2sB2qZDMw6).
Esta documentação está localizada no Postman, onde você pode encontrar todas as funcionalidades, exemplos de uso e saidas esperadas.

**Francisca Yasmin**
