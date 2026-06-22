import {useState} from "react"
import Menu from "./components/Menu"
import Equipamento from "./components/Equipamento"

function App(){
const [pagina,setPagina] = useState("inicio")    
const [nome,setNome] = useState("")
const [setor,setSetor] = useState("")
const [equipamentos,setEquipamentos] = useState([])
const [cidades, setCidades] = useState([])
const [nomeCidade, setNomeCidade] = useState("")

const [funcionarios, setFuncionarios] = useState([])
const [nomeFuncionario, setNomeFuncionario] = useState("")
const [cargoFuncionario, setCargoFuncionario] = useState("")

const [servicos, setServicos] = useState([])
const [descricaoServico, setDescricaoServico] = useState("")

function cadastrar(){
const novoEquipamento = {
    nome: nome, 
    setor:setor
}
setEquipamentos([...equipamentos,novoEquipamento])
setNome("")
setSetor("")
alert("O equipamento foi cadastrado com sucesso!")
}
function cadastrarCidade(){
    setCidades([...cidades, { nome: nomeCidade }])
    setNomeCidade("")
    alert("Cidade cadastrada com sucesso!")
}

function cadastrarFuncionario(){
    setFuncionarios([...funcionarios, { nome: nomeFuncionario, cargo: cargoFuncionario }])
    setNomeFuncionario("")
    setCargoFuncionario("")
    alert("Funcionário cadastrado com sucesso!")
}

function cadastrarServico(){
    setServicos([...servicos, { descricao: descricaoServico }])
    setDescricaoServico("")
    alert("Serviço cadastrado com sucesso!")
}



return (
    <div>

        <Menu mudarPagina={setPagina}/>
        <hr/>

        {
            pagina === "inicio" && (
                <div>
                    <h1> Sistema de Controle de Equipamentos</h1>
                    <p>
                        Bem-vindo ao sistema da mineradora.
                    </p>
                    <p>Utilize o menu para navegar.</p>
                </div>
            )
        }

        {
            pagina === "cadastro" && (
                <div>
            <h1>Cadastro de Equipamentos</h1>
        <input
        type="text"
        placeholder="Nome do Equipamento"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        />
    <br/><br/>
        <input
        type="text"
        placeholder="Setor do equipamento"
        value={setor}
        onChange={(e) => setSetor(e.target.value)}
        />
<br /><br />
<button onClick={cadastrar}> Cadastrar </button>
                </div>
            )
        }

{
    pagina === "relatorio" && (
        <div>
            <h2> Relatório de Equipamentos </h2>
            <p>
                Total de Equipamentos cadastrados:
                {equipamentos.length}
            </p>
                {
    equipamentos.map((equipamento,index) => (
        <Equipamento
        key={index}
        nome={equipamento.nome}
        setor={equipamento.setor}
        />
))
}
        </div>
    )
}
        


{
    pagina === "cidades" && (
        <div>
            <h2>Cidades</h2>
            <input
                type="text"
                placeholder="Nome da cidade"
                value={nomeCidade}
                onChange={(e) => setNomeCidade(e.target.value)}
            />
            <br/><br/>
            <button onClick={cadastrarCidade}>Cadastrar</button>
            <h3>Cidades cadastradas:</h3>
            {cidades.map((cidade, index) => (
                <p key={index}>{cidade.nome}</p>
            ))}
        </div>
    )
}
{
    pagina === "funcionarios" && (
        <div>
            <h2>Funcionários</h2>
            <input
                type="text"
                placeholder="Nome do funcionário"
                value={nomeFuncionario}
                onChange={(e) => setNomeFuncionario(e.target.value)}
            />
            <br/><br/>
            <input
                type="text"
                placeholder="Cargo"
                value={cargoFuncionario}
                onChange={(e) => setCargoFuncionario(e.target.value)}
            />
            <br/><br/>
            <button onClick={cadastrarFuncionario}>Cadastrar</button>
            <h3>Funcionários cadastrados:</h3>
            {funcionarios.map((func, index) => (
                <p key={index}>{func.nome} - {func.cargo}</p>
            ))}
        </div>
    )
}
{
    pagina === "servicos" && (
        <div>
            <h2>Serviços</h2>
            <input
                type="text"
                placeholder="Descrição do serviço"
                value={descricaoServico}
                onChange={(e) => setDescricaoServico(e.target.value)}
            />
            <br/><br/>
            <button onClick={cadastrarServico}>Cadastrar</button>
            <h3>Serviços cadastrados:</h3>
            {servicos.map((servico, index) => (
                <p key={index}>{servico.descricao}</p>
            ))}
        </div>
    )
}
    </div>
)

}
export default App