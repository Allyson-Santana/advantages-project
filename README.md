# Advantages
Criando e configurando um ambiente limpo com typescript, eslint, commit-msg e jest

## Possiveis problemas

Crie seu ambiente husky:
`yarn prepare` ou `npm prepare` 

Adicione o commit-msg do seu commit-msg-linter com:
`npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"`

Adicione o pre-commit com o lint-staged com:
`npx husky add .husky/pre-commit "npx lint-staged"`

Caso esteja usando yarn e se depara com o seguinte erro: `error Command failed with exit code 1.` 
 - Altere dentro do arquivo ".husky/pre-commit" de `npx lint-staged` para `yarn lint-staged`

Verifique também se adicionou a frag `--passWithNoTests` junto ao script do jest: 
 ```
   "scripts": {
    "test": "jest --passWithNoTests",
    "test:staged": "jest --passWithNoTests"
  }
 ```

 

