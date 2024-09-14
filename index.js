const { select, input } = require('@inquirer/prompts') // a desestruturação nesse caso serve para extrair funções do arquivo prompt.

let metas = [];

const cadastroMeta = async () => {
    const meta = await input({ message: "Digite a meta: "});

    if (meta.length == 0) {
        console.log("Não são permitidas metas vazias\n");
        return 
    }

    metas.push({
        value: meta,
        cheked: false 
    })
}

const start = async () => {
   
    while(true) {
         
        const opcao = await select({
            message: " Menu >",
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
                await cadastroMeta();
                console.log(metas);
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