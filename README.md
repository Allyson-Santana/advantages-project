# Advantages
Criando um projeto com Node-js com express, typescript e mongoDB;
Seguindo e aplicando as melhores práticas de projeto, tais temas: Clean Architecture, Solid, Clean Code TDD.

## Possiveis problemas

Crie seu ambiente husky: <br /> 
No terminal digite: `yarn prepare` ou `npm prepare` 

Adicione o commit-msg do seu commit-msg-linter com: <br /> 
`npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"`

Adicione o pre-commit com o lint-staged com: <br 
`npx husky add .husky/pre-commit "npx lint-staged"`

Caso esteja usando `yarn` e se deparar com o seguinte erro:
`error Command failed with exit code 1.` 

 - Altere dentro do arquivo ".husky/pre-commit" de `npx lint-staged` para `yarn lint-staged`

Verifique também se adicionou a frag `--passWithNoTests` junto ao script do jest: 
 ```
   "scripts": {
    "test": "jest --passWithNoTests",
    "test:staged": "jest --passWithNoTests"
  }
 ```

 

