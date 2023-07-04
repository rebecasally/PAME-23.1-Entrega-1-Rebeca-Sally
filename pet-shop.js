"use strict";

const prompt = require("prompt-sync")({sigint:true});

//Classes do programa

class Cliente{

    constructor(nomeCliente,idCliente,pets,fidelizado){
        this.nomeCliente = nomeCliente;
        this.idCliente = idCliente;
        this.pets = pets;
        this.fidelizado = fidelizado; //Cliente fidelizado = 1; não fidelizado=0;
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

    constructor(nomeUsuario,senhaFunc,idFunc){
        this.nomeUsuario = nomeUsuario;
        this.#senhaFunc= senhaFunc;
        this.idFunc = idFunc;
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

    get idFunc(){
        return this._idFunc;
    }

    set idFunc(novoIdFunc){
        this._idFunc = novoIdFunc;
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

//Classe principal do programa
class Sistema{

    #senha; 

    constructor(funcionarios,clientes,animais,consultas){
        this.funcionarios=funcionarios;
        this.clientes=clientes;
        this.animais=animais;
        this.consultas=consultas;
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
    


    //Métodos do sistema

    mostrarDados(usuario){
        // Funcao para mostras os dados de um funcionario do Pet Shop

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
        }
        else {
            console.log("Usuário não encontrado!")
        }

    }

    alterarDados(usuario,senha){
        // Funcao para alterar os dados de um funcionario
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
        // Funcao para listar os clientes do Pet Shop
        console.log('\nClientes do Pet Shop:\n');

        //Adiciona o nome de todos os clientes a um array para poder sortear
        let nomeClientes=[];
        for (let n in this.clientes){
            nomeClientes.push(this.clientes[n].nomeCliente);
        }

        nomeClientes = nomeClientes.sort();

        for (let x in nomeClientes){
            //Procura cada cliente de acordo com o nome na lista em ordem alfabética
            let clienteAtual = this.clientes.find(cliente => cliente.nomeCliente===nomeClientes[x]);
            //Verifica se o cliente é fidelizado
            if(clienteAtual.fidelizado==1){
                console.log(`Nome do cliente: ${nomeClientes[x]} - Fidelizado!`);
            }
            else{
                console.log(`Nome do cliente: ${nomeClientes[x]}`);
            }
            
        }

        console.log('\n');
    }

    listaPets(){
        // Funcao para listar os animais do Pet Shop
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
    }

    listaConsultas(){
        // Funcao para listar as consultas do Pet Shop
        console.log('\nAgenda de consultas do Pet Shop: \n');

        let dataConsultas=[];
        for (let n in this.consultas){
            dataConsultas.push(this.consultas[n].data);
        }

        //Organiza a lista com as datas em ordem cronológica
        dataConsultas = dataConsultas.sort((date1, date2) => date1 - date2);

        for (let x in dataConsultas){
            let consultaAtual = this.consultas.find(consulta => consulta.data===dataConsultas[x]);
            console.log(`A consulta n° ${consultaAtual.idConsulta} do pet ${consultaAtual.nomePet} será com ${consultaAtual.nomeUsuario}`);
            console.log(`Data: ${consultaAtual.data.getDate()}/${consultaAtual.data.getMonth()}/${consultaAtual.data.getFullYear()} às ${consultaAtual.data.getHours()}h${consultaAtual.data.getMinutes()}`);
            console.log(`Status: ${consultaAtual.status}\n`)
        }
    }

    listaFuncionarios(){
        // Funcao para listar os funcionarios do Pet Shop
        console.log('\nFuncionarios do Pet Shop:\n');
        let nomeFuncionarios=[];
        for (let n in this.funcionarios){
            nomeFuncionarios.push(this.funcionarios[n].nomeUsuario);
        }

        nomeFuncionarios = nomeFuncionarios.sort();

        for (let x in nomeFuncionarios){
            console.log(`Nome de usuário do funcionário: ${nomeFuncionarios[x]}`);
        }
    }

    marcarConsulta(funcionario){
        //Funcao para marcar as consultas

        let petConsulta = prompt('Digite o nome do pet: ');
        let id= gerarId();
        let ano=2023;
        let mes;
        let dia;
        let hora;
        let minuto;
        let data;
        //Funcao com as horas que o petshop esta aberto
        let horas = arrayRange(8, 18, 1);
        let sair=0;

        //Verificando se o pet existe
        let achado=0

        for (let i in this.animais){
            if (this.animais[i].nomePet==petConsulta){
                achado=1
            }}
        
        //Se o pet nao for encontrado, sai da funcao
        if (achado!=1){
            console.log('\nPet não encontrado!');
            return}

        //Entra aqui se o pet foi encontrado
        else{

            //Definindo uma data válida
            //Data é válida se for real e o horário estiver dentro do horário de funcionamento do pet shop
            while(sair==0){
                mes=prompt('Digite o mês da consulta: ');
                dia=prompt('Digite o dia da consulta: ');
                hora=prompt('Digite a hora para a consulta, entre 8h e 18h: ');
                minuto=prompt('Digite os minutos: ')

                try {
                    //Tenta criar uma data a partir dos valores recebidos
                    data = new Date(ano,mes,dia,hora,minuto);
                    //Verificando se a hora está dentro do horario disponivel
                    let achar=0;
                    for (let h in horas){
                        if (hora==horas[h]){
                            achar=1;
                        }
                    }

                    if (achar!=1){
                        console.log('\nData Inválida')
                    }
                    else{
                        sair=1;
                    }
                  }
                catch(err) {
                    console.log('\nData Inválida');
                } 

            }

            //Verificar se consulta já existe:
            let v=0;

            for(let c in this.consultas){
            if ((this.consultas[c].data.toString()==data.toString()) && (this.consultas[c].nomeUsuario==funcionario) && (this.consultas[c].nomePet==petConsulta)){
                    v=1;
                }}

            //Entra aqui se a consulta já existir
            if (v==1){
                while(true){
                    //A funcao roda até uma opção válida ser selecionada

                    sair=0;

                    console.log('\n');
                    let remarcar = prompt('Essa consulta já existe, deseja remarcar? s/n');
                    console.log('\n');

                    //Se consulta nao é remarcada, sai da funcao
                    if (remarcar=='n'){
                        return
                    }

                    //Aqui a consulta será remarcada, uma nova data será adicionada
                    else if (remarcar=='s'){

                        //Definindo a consulta atual como a que tem a mesma data e funcionario
                        let consultaAtual = this.consultas.find(consulta => consulta.data.toString()===data.toString() && consulta.nomeUsuario===funcionario);
                        id=consultaAtual.idConsulta;


                        //Definindo uma data válida novamente    
                        while(sair==0){
                            mes=prompt('Digite o mês da consulta: ');
                            dia=prompt('Digite o dia da consulta: ');
                            hora=prompt('Digite a hora para a consulta, entre 8h e 18h: ');
                            minuto=prompt('Digite os minutos: ')
            
                            try {
                                //Tenta criar uma data a partir dos valores recebidos
                                data = new Date(ano,mes,dia,hora,minuto);
                                //Verificando se a hora está dentro do horario disponivel
                                let achar=0;
                                for (let h in horas){
                                    if (hora==horas[h]){
                                        achar=1;
                                    }
                                }
            
                                if (achar!=1){
                                    console.log('\nData Inválida')
                                }
                                else{
                                    sair=1;
                                }
                            }
                            catch(err) {
                                console.log('\nData Inválida');
                            } 
            
                        }

                        //Atualiza a data da consulta
                        consultaAtual.data=data;
                        return
                        }

                    else {
                        console.log('Opção inválida');
                    }  
                }}
                
            //Se a consulta não existe, cria um nova 
            //Também adiciona a consulta a lista de consultas do respectivo pet
            else {
                let consulta= new Consultas(funcionario,id,petConsulta,'pendente',data);
                this.consultas.push(consulta);

                //adicionando consulta ao pet
                let petAtual = this.animais.find(pet => pet.nomePet=== petConsulta);
                petAtual.consultas.push(consulta);
                }
        }    

        
    }

    mudarConsulta(id){
        //Função para alterar o status da consulta

        let consultaAtual = this.consultas.find(consulta => consulta.idConsulta===id);
        console.log('\nPara qual status deseja mudar sua consulta?\n');
        console.log('1- Pendente');
        console.log('2- Adiada');
        console.log('3- Realizada');
        console.log('4- Cancelada');
        let status;
        let op=parseInt(prompt('Escolha uma das opções: '));

        if (op==1){
            status='pendente';}
        else if (op==2){
            status='adiada';}   
        else if (op==3){
            status='realizada';}
        else if (op==4){
            status='cancelada';}
        else {
            console.log('\nOpção inválida! Operação não realizada');
            return
        }

        consultaAtual.status=status;
    }

    removerCliente(nome) {  
        //Funcao para remover o cliente e seus pets 
        let clienteAtual = this.clientes.find(cliente => cliente.nomeCliente=== nome);

        for (let c in this.clientes){
            if (this.clientes[c].nomeCliente==nome){
                this.clientes.splice(c, 1)
        }

    }
        for (let a in this.animais){
            if (this.animais[a].nomeCliente==nome){
                let petAtual = this.animais.find(pet => pet.nomeCliente=== nome);
                delete Animal.petAtual;
                this.animais.splice(a, 1)
        }

    }
        delete Cliente.clienteAtual;
}

    removerAnimal(nome) { 
        //Funcao para remover o pet e suas consultas

        let petAtual = this.animais.find(pet => pet.nomePet=== nome);
        let consultaAtual = this.consultas.find(consulta => consulta.nomeCliente=== nome);
    
        for (let a in this.animais){
            if (this.animais[a].nomePet==nome){
                this.animais.splice(a, 1)
            }
    
        }

        for (let c in this.consultas){
            if (this.consultas[c].nomePet==nome){
                this.consultas.splice(c, 1)
        }}


        delete Animal.petAtual;
        delete Consultas.consultaAtual;
}

    cancelarConsulta(id) {   
        //Funcao para definir status da consulta como cancelada
        let consultaAtual = this.consultas.find(consulta => consulta.idConsulta===id);
        consultaAtual.status='cancelada';

}

    removerFuncionario(nome){
        //Funcao para remover funcionario
        //Retorna 1 se algum funcionario foi removido, se não, retorna 0

        let usuarioAtual = this.funcionarios.find(funcionario => funcionario.nomeUsuario=== nome);


        for(let c in this.consultas){
            if (this.consultas[c].nomeUsuario==nome){
                console.log('\nEste usuário não pode ser removido pois existem consultas em seu nome')
                return 0
            }
        }

        for (let f in this.funcionarios){
            if (this.funcionarios[f].nomeUsuario==nome){
                this.funcionarios.splice(f, 1)
            }
    
        }

        delete Funcionario.usuarioAtual;
        console.log('\nFuncionario deletado com sucesso!');

        return 1

    }


}




//Funções do programa


//Funcao para gerar ids aleatorios
function gerarId(){
    const min=1000
    const max=9999
    let id;
    id = Math.floor(Math.random() * (max - min + 1) ) + min;
    return id;
}

//Verifica se existem clientes que podem ser fidelizados
function verificarFidelizacao(sistema){
    
    for(let c in sistema.clientes){
        let pet;
        let qtdConsultas=0;

        for (let p in sistema.clientes[c].pets){
            pet=sistema.clientes[c].pets[p];
            let petAtual = sistema.animais.find(animal => animal.nomePet===pet);
            qtdConsultas= qtdConsultas+petAtual.consultas.length;
            }
         
        if (qtdConsultas>4){
            sistema.clientes[c].fidelizado=1;
            }
    }
        
    }


//Funcao para gerar um array de range definido
const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );
    

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




//Criar clientes, pets e consultas para testar o programa
function criarClientes(sistema){
    //Cria clientes e adiciona ao sistema
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
    //Cria pets e adiciona ao sistema
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

function criarConsulta(sistema){
    //Cria consultas e adiciona ao sistema, além de adicionar as consultas do respectivo pet
    let id1= gerarId();
    let id2= gerarId();
    let id3= gerarId();
    let id4= gerarId();
    let id5= gerarId();
    let id6= gerarId();
    let id7= gerarId();
        
    let consulta1= new Consultas('maria',id1,'farofa','pendente',new Date(2023,8,2,14,20));
    let consulta2= new Consultas('joana',id2,'tchutchuca','pendente',new Date(2023,7,2,15,20));
    let consulta3= new Consultas('maria',id3,'banana','pendente',new Date(2023,8,5,13,30));
    let consulta4= new Consultas('joana',id4,'farofa','pendente',new Date(2023,9,8,10,40));
    let consulta5= new Consultas('maria',id5,'maricota','pendente',new Date(2023,11,5,14,50));
    let consulta6= new Consultas('maria',id6,'farofa','pendente',new Date(2023,9,30,9,30));
    let consulta7= new Consultas('maria',id7,'farofa','pendente',new Date(2023,10,30,9,30));

    let pet1 = sistema.animais.find(pet => pet.nomePet=== consulta1.nomePet);
    let pet2 = sistema.animais.find(pet => pet.nomePet=== consulta2.nomePet);
    let pet3 = sistema.animais.find(pet => pet.nomePet=== consulta3.nomePet);
    let pet4 = sistema.animais.find(pet => pet.nomePet=== consulta4.nomePet);
    let pet5 = sistema.animais.find(pet => pet.nomePet=== consulta5.nomePet);
    let pet6 = sistema.animais.find(pet => pet.nomePet=== consulta6.nomePet);
    let pet7 = sistema.animais.find(pet => pet.nomePet=== consulta7.nomePet);
    
    pet1.consultas.push(consulta1.idConsulta);
    pet2.consultas.push(consulta2.idConsulta);
    pet3.consultas.push(consulta3.idConsulta);
    pet4.consultas.push(consulta4.idConsulta);
    pet5.consultas.push(consulta5.idConsulta);
    pet6.consultas.push(consulta6.idConsulta);
    pet7.consultas.push(consulta7.idConsulta);

    sistema.consultas.push(consulta1);
    sistema.consultas.push(consulta2);
    sistema.consultas.push(consulta3);
    sistema.consultas.push(consulta4);
    sistema.consultas.push(consulta5);
    sistema.consultas.push(consulta6);
    sistema.consultas.push(consulta7);

}







//Funcao principal do programa
function Programa(){
    let op1;
    let op2;

    console.log('\nBem Vindo ao Pet Shop!\n');

    //Cria o sistema e dados
    let sistema=new Sistema([],[],[],[]);
    criarClientes(sistema);
    criarPets(sistema);
    criarConsulta(sistema);
    verificarFidelizacao(sistema);

    while (true){

        menuNaoLogado();
        console.log('\n')
        op1 = parseInt(prompt('Escolha uma das opções acima para continuar: '));

        //Opcao de fazer login
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

            //Aqui o login foi efetuado
            else {
                console.log('\nLogin feito com sucesso!');

                let usuarioAtual = sistema.funcionarios.find(funcionario => funcionario.nomeUsuario=== usuario);
    
                let sair=0;
                
                //Funcao com o menu de opções do programa e suas ações
                while (sair==0){

                    menuLogado();
                    op2 = parseInt(prompt('\nEscolha uma das operações acima: '))
    
                    switch(op2-1){
                        case 0:
                            sistema.mostrarDados(usuario);
                            break
                        
                        case 1:
                            let novosDados = sistema.alterarDados(usuario,senha);
                            console.log('\nDado alterado com sucesso!')
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
                            sistema.listaConsultas();
                            break
                        
                        case 5:
                            sistema.listaFuncionarios();
                            break

                        case 6:
                            console.log('\n')
                            let nomeFunc=prompt('Digite o nome do funcionário a realizar a consulta: ');

                            //Verifica se o funcionario existe para realizar a consulta
                            achado=0;

                            for (let i in sistema.funcionarios){
                                if (sistema.funcionarios[i].nomeUsuario==nomeFunc){
                                    achado=1;
                                }
                            }
                        
                            if (achado!=1){
                                console.log('\nFuncionario não encontrado!');

                            }
                            
                            else{
                                sistema.marcarConsulta(nomeFunc);
                            }  

                            break

                        case 7:
                            console.log('\nAbaixo se encontram todas as consultas na agenda:\n')
                            sistema.listaConsultas();
                            let idMudar = parseInt(prompt('Digite a Id da consulta a ser alterada: '));
                            
                            //Verifica se a consulta existe e altera o status
                            achado=0;

                            for (let c in sistema.consultas){
                                if (sistema.consultas[c].idConsulta==idMudar){
                                    achado=1;
                                }
                            }
                        
                            if (achado!=1){
                                console.log('\nConsulta não encontrada!');

                            }
                            
                            else{
                                sistema.mudarConsulta(idMudar);
                            }    

                            break

                        case 8:
                            let clienteRemover = prompt("Digite o nome do cliente que deseja remover: ");

                            //Verifica se o cliente existe e o remove
                            achado=0

                            for (let i in sistema.clientes){
                                if (sistema.clientes[i].nomeCliente==clienteRemover){
                                    achado=1
                                    }
                                }
                            
                            if (achado!=1){
                                console.log('\nCliente não encontrado!');

                            }
                                
                            else{
                                sistema.removerCliente(clienteRemover);
                                console.log('\nCliente removido com sucesso!');
                            }
                            
                            break

                        case 9:      
                            //Verifica se o pet existe, e o remove, bem como suas consultas
                            let petRemover = prompt("Digite o nome do pet que deseja remover: ");

                            achado=0

                            for (let i in sistema.animais){
                                if (sistema.animais[i].nomePet==petRemover){
                                    achado=1
                                }
                            }
                        
                            if (achado!=1){
                                console.log('\nPet não encontrado!');

                            }
                            
                            else{
                                sistema.removerAnimal(petRemover);
                                console.log('\nPet removido com sucesso!');
                            }                  
                            
                            break    

                        case 10:
                            console.log('Abaixo se encontram todas as consultas na agenda:\n')
                            sistema.listaConsultas();
                            let idRemover = parseInt(prompt('Digite a Id da consulta a ser cancelada: '));
                            

                            
                            //Verifica se a consulta existe e a cancela

                            achado=0

                            for (let i in sistema.consultas){
                                if (sistema.consultas[i].idConsulta==idRemover){
                                    achado=1;
                                }
                            }
                        
                            if (achado!=1){
                                console.log('\nConsulta não encontrada!');

                            }
                            
                            else{
                                sistema.cancelarConsulta(idRemover);
                                console.log('\nConsulta cancelada com sucesso!');
                            }    

                            break
                        
                        case 11:
                            let usuarioRemover = prompt('Digite o nome do funcionario a ser removido(a): ');
                            
                            //Verifica se o usuario exsite
                            achado=0

                            for (let i in sistema.funcionarios){
                                if (sistema.funcionarios[i].nomeUsuario==usuarioRemover){
                                    achado=1;
                                }
                            }
                        
                            if (achado!=1){
                                console.log('\nFuncionario não encontrado!');

                            }
                            
                            //A funcao remover funcionarioa retorna 1 se o funcionario foi removido
                            //Se o funcionario atual foi removido, então é feito o logout
                            else{
                                let retorno=sistema.removerFuncionario(usuarioRemover);
                                if (usuario==usuarioRemover && retorno==1){
                                    console.log('\nEste usuário foi apagado, você foi desconectado');
                                    sair=1;
                                }
                            }  

                            break

                        case 12:
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

        //Opcao de cadastrar funcionario
        else if (op1==2){
            //Cria funcionario e adiciona ao sistema
            let id= gerarId();
            let usuario = prompt('Digite o nome de usuário: ');
            let senha = prompt('Digite a senha: ');


            const funcionario = new Funcionario(usuario,senha,id);
            sistema.funcionarios.push(funcionario);
            console.log("\nCadastro realizado com sucesso!");
        }

        //Opcao de sair do programa
        else if (op1==3){
            break;
        }

        else{
            console.log('\nOpção inválida!\n');
        }

        }


    }



Programa();

