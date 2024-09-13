const start = () => {
    while(true) {
        let opcao = "sair";
        switch (opcao) {
            case "cadastrar":
                console.log("Vamos iniciar o cadastro");
                break
            case "listar":
                console.log("Vamos listar");
            case "sair":
                return
        }
    }
}

start();