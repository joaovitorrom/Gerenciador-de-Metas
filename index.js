const { select, input, checkbox } = require('@inquirer/prompts') // a desestruturação nesse caso serve para extrair funções do arquivo prompt.

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

const listarMeta = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar meta, o espaço marcar/desmarcar e o Enter para finalizar essa procedimento",
        choices: [...metas]
    })

    if(respostas.length == 0) {
        console.log("nenhuma meta selecionada!");
        return
    }

    metas.forEach((m) => {
        m.checked = false;
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
                return m.value == resposta
            })
            
            meta.checked = true;
        }
    )
        
    console.log("Meta(s) marcada(s) como concluídas");

}

const start = async () => {
   
    while(true) {
         
        const opcao = await select({
            message: "\n Menu >",
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
                await listarMeta();
                break
            case "sair":
                console.log("Até a próxima");
                return
        }
    }
}

start();