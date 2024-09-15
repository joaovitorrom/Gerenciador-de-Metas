const { select, input, checkbox } = require('@inquirer/prompts') // a desestruturação nesse caso serve para extrair funções do arquivo prompt.

let mensagem = "Boas vindas ao App de metas!"

let metas = [];

const cadastroMeta = async () => {
    const meta = await input({ message: "Digite a meta:"});

    if (meta.length == 0) {
        mensagem = "Não são permitidas metas vazias";
        return 
    }

    metas.push({
        value: meta,
        checked: false 
    })

    mensagem = "Meta cadastrada com sucesso!";
}

const listarMeta = async () => {
    if(metas.length == 0) { // adicionei esse caminho para evitar o erro caso metas esteja vazio
        mensagem = "Não há metas cadastradas";
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar meta, o espaço marcar/desmarcar e o Enter para finalizar essa procedimento",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false;  // arrow function para desmarcar as metas antes que entrem na lógica de marcação
    }) 

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada!";
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
                return m.value == resposta // lógica de marcação que utiliza dois métodos de arrays
            })
            
            meta.checked = true;        
        }
    )
        
    mensagem = "Meta(s) marcada(s) como concluídas";

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    
    if(realizadas.length == 0) {
        mensagem = "Nenhuma meta realizada ainda!";
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
        mensagem = "Nenhuma meta aberta!";
        return
    }

    await select({
        message: abertas.length + " Metas Abertas",
        choices: [...abertas]
    })
}

const removerMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => { // método map usado para alterar itens do array metas
        return {
            value: meta.value,
            checked: false
        }
    })

    if(metasDesmarcadas.length == 0) { // controle para que não ocorra erro caso não aja metas no array metasDesmarcadas
        mensagem = "Não há metas para serem removidas";
        return
    }

    const itensARemover = await checkbox({ // checkbox para selecionar metas que serão excluídas
        message: "Selecione item para ser removido",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensARemover.length == 0) {
        mensagem = "Nenhum item foi removido";
        return
    }

    itensARemover.forEach((item) => { // a exlusão das metas basicamente são filtros que alteram let metas = []
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Metas(s) removidas com sucesso!";
}

const mostrarMensagem = () => {
    console.clear(); // função que limpa o terminal

    if(mensagem != "") {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
}

const start = async () => {
   
    while(true) {
        mostrarMensagem();
         
        const opcao = await select({
            message: "Menu >",
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
                    name: "Remover metas",
                    value: "remover"
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
            case "remover":
                await removerMetas();
                break
            case "sair":
                console.log("Até a próxima");
                return
        }
    }
}

start();