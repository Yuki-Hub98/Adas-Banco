let banco = []
let contas = []
let historico = []

class Cliente {
    constructor(nome, cpf){
        this.cliente = {
            nome: nome,
            cpf: cpf
        }
        
    }
}

class Conta{
    static numeroConta = 0;
    #saldo
    constructor(conta){
            this.dados = conta;
            this.contaNumero = Conta.numeroConta++;
            this.#saldo = 0;
            contas.push({dados: this.dados, contaNumero: this.contaNumero, saldo:this.#saldo})
        }
        sacar(nome, valorSaque){
            let valor = this.#saldo;
            if(valorSaque <= valor){
                valor = valor - valorSaque
                for (const key in contas) {
                    if(contas[key].dados.cliente.nome === nome[key]) {
                        contas[key].saldo = valor
                        historico.push({operacao:"Saque", nome:nome[key], valor:valorSaque})
                    }
                }
                this.#saldo = valor
                console.log(`Foi efetuado um saque no valor de: R$${valorSaque}\nAtualmente o valor que consta na conta é: R$${valor}`);
            }else{
                console.log("Seu saldo não é op suficiente para realizar está operação")
            } 
             
        }

        deposito(nome, valorDeposito){
            let valor = this.#saldo;
            if (valorDeposito > 0) {
                valor = valor + valorDeposito
                for (const key in contas) {
                    if(contas[key].dados.cliente.nome === nome[key]) {
                        contas[key].saldo = valor
                        historico.push({operacao:"Deposito", nome:nome[key], valor:valorDeposito})
                    }
                }
            }
            this.#saldo = valor
            console.log(`Foi efetuado um deposito no valor de: R$${valorDeposito}\nAtualmente o valor que consta na conta é: R$${valor}`);
            
        }

        transferir(valorTransferencia, ...nome){
            let usuarioTransferir = nome[0]
            let usuarioRecebendo = nome[1]
            for (let i = 0; i < contas.length; i++) {
                if (contas[i].dados.cliente.nome === usuarioTransferir) {
                    if(valorTransferencia <= contas[i].saldo){
                        contas[i].saldo = contas[i].saldo - valorTransferencia
                        console.log(`Transação efetuada com sucesso:\nUsuário: ${usuarioTransferir} transferiu R$${valorTransferencia}\npara o usuário: ${usuarioRecebendo}`)
                        historico.push({operacao:"Transferencia", nome:usuarioTransferir, valor:valorTransferencia})
                    }else{
                        console.log("Você não tem saldo o suficiente para realizar essa transação")
                    }
                    
                }  
            }
            for (let i = 0; i < contas.length; i++) {
                if (contas[i].dados.cliente.nome === usuarioRecebendo) {
                    contas[i].saldo = contas[i].saldo + valorTransferencia
                    historico.push({operacao:"Transferencia Recebida", nome:usuarioRecebendo, valor:valorTransferencia}) 
                }
            }
            
        }

        historico(nome){
            let result = historico.filter((histor => {
               if (histor.nome === nome[0]) {
                console.log(`Historico da conta:\nCliente: ${histor.nome}\nOperação: ${histor.operacao}\nValor: ${histor.valor}`)
               } 
            }))
            return result
            
        }

        detalhes(){
           console.log(`Nome do cliente: ${this.dados.cliente.nome} cpf: ${this.dados.cliente.cpf}\nNumero da conta: ${this.contaNumero}\nConta: R$${this.#saldo}`)
        } 
   
    }

    class ContaCorrente extends Conta {
        constructor(conta, tipo){
            super(conta);
            this.tipo = tipo
        }

        realizarOperacao(valor, opcao, ...nome){
            switch (opcao) {
                case "saque":
                    this.sacar(nome,valor)
                    break;
                case "deposito":
                   this.deposito(nome,valor)
                    break;
                case "transferir":
                    this.transferir(valor, ...nome)
                    break;
                case "historico":
                    this.historico(nome)
                    break;
                default:
                    console.log("Opcao invalida")
                    break;
            }
        }
       
    }

    class ContaPoupanca extends Conta {
        constructor(conta, tipo){
            super(conta);
            this.tipo = tipo
        }

        realizarOperacao(valor, opcao, ...nome){
            switch (opcao) {
                case "saque":
                    this.sacar(nome,valor)
                    break;
                case "deposito":
                   this.deposito(nome,valor)
                    break;
                case "transferir":
                    this.transferir(valor, ...nome)
                    break;
                case "historico":
                    this.historico(nome)
                    break;
                default:
                    console.log("Opcao invalida")
                    break;
            }
        }
    }

    const cadastro = (nome, cpf, tipo) =>{
        for (const key in banco) {
            if ( banco[key].dados.cliente.nome === nome && banco[key].dados.cliente.cpf === cpf && banco[key].tipo === tipo ) {
                console.log(`Essa pessoa ${nome} com cpf ${cpf} já existe cadastrada`)
                if (key > -1) {
                    banco.splice(key, 1);
                    contas.splice(key, 1);
                  }
            }
        }
        let cliente = new Cliente (nome, cpf);
        switch (tipo) {
            case "corrente":
                let corrente = new ContaCorrente(cliente, tipo)
                banco.push(corrente) 
                break;
            case "poupança":
                let poupanca = new ContaPoupanca(cliente, tipo)
                banco.push(poupanca)
                break;
            default:
                console.log("Opção invalida")
                break;
        }
        

    }

   const operacao = (valor, opcao, ...nome) =>{
        switch (opcao) {
            case "saque":
                for (let i = 0; i < 1; i++) {
                    if (banco[i].dados.cliente.nome === nome[i]) {
                       banco[i].realizarOperacao(valor, opcao, nome[i])
                    }
                }
                break;
            case "deposito":
                for (let i = 0; i < 1; i++) {
                    if (banco[i].dados.cliente.nome === nome[i]) {
                        banco[i].realizarOperacao(valor, opcao, nome[i])
                        }
                }
                break;
            case "transferir":
                for (let i = 0; i < 1; i++) {
                    if (nome.length > 1 && nome.length < 3) {
                        banco[i].realizarOperacao(valor, opcao, ...nome)
                    }
                }
                break;
            case "historico":
                for (let i = 0; i < 1; i++) {
                    if (banco[i].dados.cliente.nome === nome[0]){
                        banco[i].realizarOperacao(undefined, opcao, nome[0])
                    }
                }
                break;
            default:
                console.log("Os parâmetros recebidos não estão de acordo");
                break;
        }
       
   } 

   /*
cadastro("yago", "52555255", "corrente")
cadastro("teste", "1111111", "corrente")
operacao(500, "deposito", "yago")
operacao(250, "transferir", "yago", "teste")
operacao(undefined, "historico", "yago")
console.log(contas)
*/