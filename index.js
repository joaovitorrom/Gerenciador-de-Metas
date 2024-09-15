const { select, input, checkbox } = require('@inquirer/prompts') // a desestruturação nesse caso serve para extrair funções do arquivo prompt.

let metas = [];

const cadastroMeta = async () => {
    const meta = await input({ message: "Digite a meta:"});

    if (meta.length == 0) {
        console.log("Não são permitidas metas vazias\n");
        return 
    }

    metas.push({
        value: meta,
        checked: false 
    })
}

const listarMeta = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar meta, o espaço marcar/desmarcar e o Enter para finalizar essa procedimento",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false;  // arrow function para desmarcar as metas antes que entrem na lógica de marcação
    }) 

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!");
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
                return m.value == resposta // lógica de marcação que utiliza dois métodos de arrays
            })
            
            meta.checked = true;        
        }
    )
        
    console.log("Meta(s) marcada(s) como concluídas");

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    
    if(realizadas.length == 0) {
        console.log("Nenhuma meta realizada ainda!");
        return
    }

    await select({
        message: realizadas.length + " Metas Realizadas",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })
    
    if(abertas.length == 0) {
        console.log("Nenhuma meta aberta!");
        return
    }

    await select({
        message: abertas.length + " Metas Abertas",
        choices: [...abertas]
    })
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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
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
            case "realizadas":
                await metasRealizadas();
                break
            case "abertas":
                 await metasAbertas();
                break
            case "sair":
                console.log("Até a próxima");
                return
        }
    }
}

start();