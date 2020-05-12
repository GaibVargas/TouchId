# TouchId
Uma aplicação simples que utiliza, caso haja a possibilidade, a digital do usuário como login.

# Tecnologias
* React Native
* Expo
* TouchId ([LocalAuthentication](https://docs.expo.io/versions/latest/sdk/local-authentication/))

# Objetivos
Estudar o processo de login por digital.

# Processo
Foi uma experiência divertida e relativamente fácil, já que a documentação do [LocalAuthentication](https://docs.expo.io/versions/latest/sdk/local-authentication/) é direta e de fácil entendimento.

# Como testar
No projeto há uma pasta de utils com dois usuários, para testes rápidos, contudo a integração com um banco de dados não representa uma grande dificuldade. Essa estratégia foi escolhida apenas para poupar tempo e focar apenas no que era o objetivo da aplicação.
Vale ressaltar que o login com a digital só pode ser feita uma vez que o usuário já tenha logado ao menos uma vez com seu email.
