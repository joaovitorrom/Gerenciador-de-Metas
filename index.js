const { select } = require('@inquirer/prompts') // a desestruturação nesse caso serve para extrair apenas a função select.

const start = async () => {
   
    while(true) {
         
        const opcao = await select({
            message: "> Menu",
            choices: [
                {
                    name: "Cadastar meta",
                    value: "cadastar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
         });

        switch (opcao) {
            case "cadastrar":
                console.log("Vamos iniciar o cadastro");
                break
            case "listar":
                console.log("Vamos listar");
                break
            case "sair":
                return
        }
    }
}

start();