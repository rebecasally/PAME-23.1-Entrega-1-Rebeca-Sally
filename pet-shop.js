"use strict";

const prompt = require("prompt-sync")({sigint:true});

class Cliente{

    constructor(idCliente,nomeCliente,pets,fidelizado){

        this.idCliente = idCliente;
        this.nomeCliente = nomeCliente;
        this.pets = pets;
        this.fidelizado = fidelizado;
    }

    get idCliente(){
        return this._idCliente;
    }

    set idCliente(novoIdCliente){
        this._id = novoIdCliente;
    }

    get nomeCliente(){
        return this._nomeCliente;
    }

    set nomeCliente(novoNomeCliente){
        this._nomeCliente= novoNomeCliente;
    }

    get pets(){
        return this._pets;
    }

    set pets(novoPet){
        this._pets=pets+novoPet;
    }

    get fidelizado(){
        return this._fidelizado;
    }

    set fidelizado(novoFidelizado){
        this._fidelizado = novoFidelizado;
    }

}


class Funcionario{

    #senha;

    constructor(idFunc,nomeUsuario,senha){
        this.idFunc = idFunc;
        this.nomeUsuario = nomeUsuario;
        this.#senha= senha;
    }

    get idFunc(){
        return this._idFunc;
    }

    set idFunc(novoIdFunc){
        this._idFunc = novoIdFunc;
    }

    get nomeUsuario(){
        return this._nomeUsuario;
    }

    set nomeUsuario(novoNomeUsuario){
        this._nomeUsuario = novoNomeUsuario;
    }

    get senha(){
        return this.#senha;
    }

    set senha(novoSenha){
        this.#senha= novoSenha;
    }

}


class Animal extends Cliente{

    constructor(idPet,nomeCliente,nomePet,consultas){
        super(nomeCliente)
        this.id = idPet;
        this.nomePet = nomePet;
        this.consultas= consultas;
    }

    get idPet(){
        return this._idPet;
    }

    set idPet(novoIdPet){
        this._id = novoIdPet;
    }

    get nomePet(){
        return this._nomePet;
    }

    set nomePet(novoNomePet){
        this._nomePet=novoNomePet;
    }

    get consultas(){
        return this._consultas;
    }

    set consultas(novoConsulta){
        this._consultas= consultas+novoConsulta;
    }

}

class Consultas extends Funcionario{

    constructor(idConsulta,nomeUsuario,nomePet,status,data){
        super(nomeUsuario)
        this.nomePet = nomePet;
        this.idConsulta = idConsulta;
        this.status= status;
        this.data= data;
    }

    get idConsulta(){
        return this._idConsulta;
    }

    set idConsulta(novoIdConsulta){
        this._idConsulta = novoIdConsulta;
    }

    get nomePet(){
        return this._nomePet;
    }

    set nomePet(novoNomePet){
        this._nomePet = novoNomePet;
    }

    get status(){
        return this._status;
    }

    set status(novoStatus){
        this._status= novoStatus;
    }

    get data(){
        return this._data;
    }

    set data(novoData){
        this._data= novoData;
    }

}

class Sistema{

    #senha; 

    constructor(usuario,senha){
        this.usuario=usuario;
        this.#senha=senha;
    }

    get usuario(){
        return this._usuario;
    }

    set usuario(novoUsuario){
        this._usuario=novoUsuario;
    }


    get senha(){
        return this.#senha;
    }

    set senha(novoSenha){
        this.#senha= novoSenha;
    }

}

function gerarId(){
    const min=1000
    const max=9999
    let id = Math.floor(Math.random() * (max - min + 1) ) + min;
    return id
}


function menuNaoLogado() {
    console.log('\n1- Fazer Login');
    console.log('2- Fazer Cadastro');
    console.log('3- Sair do Programa');
}

function menuLogado() {
    console.log('\n1- Ver meus dados');
    console.log('2- Modificar meus dados');
    console.log('3- Ver lista de Clientes');
    console.log('4- Ver lista de Pets');
    console.log('5- Ver lista de Consultas');
    console.log('6- Ver lista de Funcionarios');
    console.log('7- Marcar Consulta');
    console.log('8- Mudar Status de Consulta');
    console.log('9- Remover Cliente');
    console.log('10- Remover Pet');
    console.log('11- Cancelar Consulta');
    console.log('12- Remover Funcionario');
    console.log('13- Sair do Programa');

}

function Programa(){
    //funcao principal do programa
    let op1;
    let op2;
    let funcionarios=[];
    let consultas=[];
    let clientes=[];
    let animais=[];


    console.log('\nBem Vindo ao Pet Shop!\n');

    while (true){

        menuNaoLogado();
        console.log('\n')
        op1 = parseInt(prompt('Escolha uma das opções acima para continuar: '));

        if (op1==1){
            
            console.log('\n')
            let usuario = prompt("Digite o nome de usuário: ");
            let senha = prompt("Digite a senha: ");

            //Verificando se o usuário existe
            let achado=0;

            for (let i in funcionarios){
                console.log(funcionarios);

                if (funcionarios[i].nomeUsuario==usuario){
                    achado=1;
                }
            }

            if (achado!=1){
                console.log("\nUsuário não encontrado!\n")
            }

            else {
            
                const login = new Sistema(usuario,senha);
            
                console.log('\nLogin feito com sucesso!');

                let usuarioAtual = funcionarios.find(funcionario => funcionario.nomeUsuario=== login.usuario);
    
                let sair=0;
    
                while (sair==0){
                    menuLogado();
                    op2 = parseInt(prompt('\nEscolha uma das operações acima: '))
    
                    switch(op2-1){
                        case 0:
                            console.log("Usuário:",usuarioAtual.nomeUsuario);
                            console.log("Id:",usuarioAtual.idFunc);
                            console.log("Senha:",usuarioAtual.senha);
    
                            break
                        
                        case 1:
                            console.log("\nQual dado deseja alterar?");
                            console.log("\n1- Nome de usuário");
                            console.log("\n2- Senha\n")

                            let d;

                            d= parseInt(prompt("Escolha uma opção: "));

                            if (d==1){
                                let novoUsuario=prompt("Digite o novo nome de usuario: ");
                                usuarioAtual.nomeUsuario=novoUsuario;
                                
                            }

                            else if (d==2){
                                let novaSenha=prompt("Digite a nova senha: ");
                                usuarioAtual.senha=novaSenha;
                                
                            }

                            else {
                                console.log("\nOpção inválida!\n");
                            }


                            break

                        case 2:
                            let nomeClientes=[];
                            for (let n in clientes){
                                nomeClientes.push(clientes[n].nomeCliente);
                            }

                            nomeClientes = nomeClientes.sort()

                            for (x in nomeClientes){
                                console.log("\n",nomeClientes[x]);
                            }
                            
                            break

                        case 3:
                            sair=1;
                            console.log("\nO logout foi efetuado!");
                            break
    
                        default:
                            console.log("\nOpção inválida!");
                            break
    
                    }
                }

            }


        }

        else if (op1==2){
            let idFunc= gerarId()
            let usuario = prompt('Digite o nome de usuário: ');
            let senha = prompt('Digite a senha: ');


            const funcionario = new Funcionario(idFunc,usuario,senha);
            funcionarios.push(funcionario);
            console.log("\nCadastro realizado com sucesso!");
        }

        else if (op1==3){
            break;
        }

        else{
            console.log('\nOpção inválida!\n');
        }

        }


    }


Programa();

