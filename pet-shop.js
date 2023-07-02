"use strict";

const prompt = require("prompt-sync")({sigint:true});

//Classes do sistema

class Cliente{

    constructor(nomeCliente,idCliente,pets,fidelizado){

        this.nomeCliente = nomeCliente;
        this.idCliente = idCliente;
        this.pets = pets;
        this.fidelizado = fidelizado;
    }

    get nomeCliente(){
        return this._nomeCliente;
    }

    set nomeCliente(novoNomeCliente){
        this._nomeCliente= novoNomeCliente;
    }

    get idCliente(){
        return this._idCliente;
    }

    set idCliente(novoIdCliente){
        this._idCliente = novoIdCliente;
    }

    get pets(){
        return this._pets;
    }

    set pets(novoPet){
        this._pets=novoPet;
    }

    get fidelizado(){
        return this._fidelizado;
    }

    set fidelizado(novoFidelizado){
        this._fidelizado = novoFidelizado;
    }

}


class Funcionario{

    #senhaFunc;

    constructor(idFunc,nomeUsuario,senhaFunc){
        this.idFunc = idFunc;
        this.nomeUsuario = nomeUsuario;
        this.#senhaFunc= senhaFunc;
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

    get senhaFunc(){
        return this.#senhaFunc;
    }

    set senhaFunc(novoSenhaFunc){
        this.#senhaFunc= novoSenhaFunc;
    }

}


class Animal extends Cliente{

    constructor(nomeCliente,idPet,nomePet,consultas){
        super(nomeCliente);
        this.idPet = idPet;
        this.nomePet = nomePet;
        this.consultas= consultas;
    }

    get idPet(){
        return this._idPet;
    }
    set idPet(novoIdPet){
        this._idPet = novoIdPet;
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
        this._consultas= novoConsulta;
    }


}


class Consultas extends Funcionario{

    constructor(nomeUsuario,idConsulta,nomePet,status,data){
        super(nomeUsuario)
        this.idConsulta = idConsulta;
        this.nomeUsuario= nomeUsuario
        this.nomePet = nomePet;
        this.status= status;
        this.data= data;
    }

    get idConsulta(){
        return this._idConsulta;
    }

    set idConsulta(novoIdConsulta){
        this._idConsulta = novoIdConsulta;
    }

    get nomeUsuario(){
        return this._nomeUsuario;
    }

    set nomeUsuario(novoNomeUsuario){
        this._nomeUsuario = novoNomeUsuario;
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

    constructor(funcionarios,clientes,animais,consultas,ids){
        this.funcionarios=funcionarios;
        this.clientes=clientes;
        this.animais=animais;
        this.consultas=consultas;
        this.ids=ids;
    }

    get funcionarios(){
        return this._funcionarios;
    }
    set funcionarios(novoFuncionarios){
        this._funcionarios=novoFuncionarios;
    }


    get clientes(){
        return this._clientes;
    }
    set clientes(novoClientes){
        this._clientes= novoClientes;
    }

    get animais(){
        return this._animais;
    }
    set animais(novoAnimais){
        this._animais=novoAnimais;
    }


    get consultas(){
        return this._consultas;
    }
    set consultas(novoConsultas){
        this._consultas=novoConsultas;
    }
    
    get ids(){
        return this._ids;
    }
    set ids(novoId){
        this._ids=novoId;
    }


    mostrarDados(usuario){

        let achado=0;

        for (let n in this.funcionarios){
            if (this.funcionarios[n].nomeUsuario==usuario){
                achado=1;
            }
        }

        if (achado==1){
            let usuarioAtual = this.funcionarios.find(funcionario => funcionario.nomeUsuario=== usuario);
            console.log("Usuário:",usuarioAtual.nomeUsuario);
            console.log("Id:",usuarioAtual.idFunc);
            console.log("Senha:",usuarioAtual.senha);
        }
        else {
            console.log("Usuário não encontrado!")
        }

    }

    alterarDados(usuario,senha){
        let novoUsuario=usuario;
        let novaSenha=senha;
        let usuarioAtual = this.funcionarios.find(funcionario => funcionario.nomeUsuario=== usuario);

        console.log("\nQual dado deseja alterar?");
        console.log("\n1- Nome de usuário");
        console.log("\n2- Senha\n")

        let d= parseInt(prompt("Escolha uma opção: "));

        if (d==1){
            novoUsuario=prompt("Digite o novo nome de usuario: ");
            usuarioAtual.nomeUsuario=novoUsuario;                  
            }

        else if (d==2){
            novaSenha=prompt("Digite a nova senha: ");
            usuarioAtual.senhaFunc=novaSenha;                   
            }

        else {
            console.log("\nOpção inválida!\n");
            }

        return [novoUsuario,novaSenha]

    }

    listaClientes(){
        console.log('\n Clientes do Pet Shop');
        let nomeClientes=[];
        for (let n in this.clientes){
            nomeClientes.push(this.clientes[n].nomeCliente);
        }

        nomeClientes = nomeClientes.sort();

        for (let x in nomeClientes){
            console.log(nomeClientes[x]);
        }

        console.log('\n');
    }

    listaPets(){
        console.log('\nAnimais cadastrados no Pet Shop: \n')
        let nomeAnimais = [];
        for (let n in this.animais){;
            nomeAnimais.push(this.animais[n].nomePet);
        }

        nomeAnimais = nomeAnimais.sort();


        for (let x in nomeAnimais){
            let petAtual = this.animais.find(animal => animal.nomePet===nomeAnimais[x]);
            console.log(`Pet: ${nomeAnimais[x]}; Tutor: ${petAtual.nomeCliente}`);
        }
        console.log('\n');
    }

}



//Funcoes do sistema

function gerarId(){
    const min=1000
    const max=9999
    let id;
    id = Math.floor(Math.random() * (max - min + 1) ) + min;
    return id;
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
    console.log('13- Fazer Logout');

}


function criarClientes(sistema){
    let id1= gerarId();
    let id2= gerarId();
    let id3= gerarId();
        
    let cliente1= new Cliente('maria',id1,['farofa','banana'],0);
    let cliente2= new Cliente('fernanda',id2,['tchutchuca'],0);
    let cliente3= new Cliente('zoe',id3,['maricota'],0);

    sistema.clientes.push(cliente1);
    sistema.clientes.push(cliente2);
    sistema.clientes.push(cliente3);

}

function criarPets(sistema){
    let id1= gerarId();
    let id2= gerarId();
    let id3= gerarId();
    let id4= gerarId();
            
    let pet1= new Animal('maria',id1,'farofa',[]);
    let pet2= new Animal('maria',id2,'banana',[]);
    let pet3= new Animal('fernanda',id3,'tchutchuca',[]);
    let pet4= new Animal('zoe',id4,'maricota',[]);
    
    sistema.animais.push(pet1);
    sistema.animais.push(pet2);
    sistema.animais.push(pet3);
    sistema.animais.push(pet4);
    }












function Programa(){
    //funcao principal do programa
    let op1;
    let op2;

    console.log('\nBem Vindo ao Pet Shop!\n');

    let sistema=new Sistema([],[],[],[],[0]);
    criarClientes(sistema);
    criarPets(sistema);

    while (true){

        menuNaoLogado();
        console.log('\n')
        op1 = parseInt(prompt('Escolha uma das opções acima para continuar: '));

        if (op1==1){
            //Fazendo o Login
            
            console.log('\n')
            let usuario = prompt("Digite o nome de usuário: ");
            let senha = prompt("Digite a senha: ");

            //Verificando se o usuário existe
            let achado=0;

            for (let i in sistema.funcionarios){
                if (sistema.funcionarios[i].nomeUsuario==usuario){
                    if (sistema.funcionarios[i].senhaFunc==senha){
                        achado=1
                    }
                }
            }

            if (achado!=1){
                console.log("\nUsuário não encontrado ou senha incorreta.\n")
            }

            else {
                console.log('\nLogin feito com sucesso!');

                let usuarioAtual = sistema.funcionarios.find(funcionario => funcionario.nomeUsuario=== usuario);
    
                let sair=0;
    
                while (sair==0){
                    menuLogado();
                    op2 = parseInt(prompt('\nEscolha uma das operações acima: '))
    
                    switch(op2-1){
                        case 0:
                            sistema.mostrarDados(usuario);
                            break
                        
                        case 1:
                            let novosDados = sistema.alterarDados(usuario,senha);
                            usuario=novosDados[0];
                            senha=novosDados[1];

                            break

                        case 2:
                            sistema.listaClientes();
                            break
                            
                        case 3:
                            sistema.listaPets();
                            break

                        case 4:
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
            let id= gerarId();
            let usuario = prompt('Digite o nome de usuário: ');
            let senha = prompt('Digite a senha: ');


            const funcionario = new Funcionario(id,usuario,senha);
            sistema.funcionarios.push(funcionario);
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

