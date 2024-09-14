const { select } = require('@inquirer/prompts') // a desestruturação nesse caso serve para extrair apenas a função select.

const start = async () => {
   
    while(true) {
         
        const opcao = await select({
            message: "> Menu",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
         });

        switch (opcao) {
            case "cadastrar":
                console.log("Cadastrar meta\n");
                break
            case "listar":
                console.log("Vamos listar\n");
                break
            case "sair":
                console.log("Até a próxima");
                return
        }
    }
}

start();