# Delivery tracker

Timeline para o processo de entrega com as seguintes situações: Recebido pela transportadora, Em Viagem, Saída para Entrega e Entregue ao Destinatário.

Este projeto está dividido em duas parte o `tracking-timeline`é um back-end construido com NodeJS e busca se comunicar com outros serviços e fornecer os dados para a UI. Já o projeto `tracking-timeline-ui`é contruido com Angular 8 e é projetodo para ser uma UI "burra", ou seja, ela somente é responsável por exibir os dados fazendo o minimo de processamento possível, a parte visual deste projeto foi mantida no minimo pois está não é minha especialidade.

O projeto foi contruido desta maneira por que ela garante um maior desacoplamento da UI e do back-end, na prática, para esta situação, o projeto de back-end poderia ter sido suprimido e o projeto de UI poderia fazer todo o processamento, porém esta ideia não me agrada por dois motivos. Primeiro, na minha visão essa camada a mais garante maior flexibillidade se fosse necessário termos diversas UI diferente (mobile, desktop, smartwatch, etc) e segundo, sendo este projeto um teste para avaliação achei válido praticar esse "over engineering" para o avaliador ter mais material para a avaliação.


## Executando o projeto

### Rodando o projeto `tracking-timeline`

Dentro do diretorio /tracking-timeline rodar os comandos `npm install` para instalar as dependências após rodar o commando `npm start` para iniciar o servidor. Caso deseje rodar os testes unitários use o comando `npm test`.
Para garantir que o servidor está rodando acesse http://localhost:3030.

### Rodando o projeto `tracking-timeline-ui`

Dentro do diretorio /tracking-timeline-ui rodar os comandos `npm install` para instalar as dependências após rodar o commando `ng start` para iniciar a aplicação. Caso a mesma não abra automaticamente acessar  http://localhost:4200 no seu navegador.