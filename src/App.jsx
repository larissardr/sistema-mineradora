import { useState, useEffect } from "react"
import Menu from "./components/Menu"
import Equipamento from "./components/Equipamento"
import supabase from "./services/supabase"

function App() {
  const [pagina, setPagina] = useState("inicio")
  const [equipamentos, setEquipamentos] = useState([])
  const [nome, setNome] = useState("")
  const [setor, setSetor] = useState("")
  const [cidades, setCidades] = useState([])
  const [nomeCidade, setNomeCidade] = useState("")
  const [funcionarios, setFuncionarios] = useState([])
  const [nomeFuncionario, setNomeFuncionario] = useState("")
  const [cargoFuncionario, setCargoFuncionario] = useState("")
  const [servicos, setServicos] = useState([])
  const [descricaoServico, setDescricaoServico] = useState("")

  useEffect(() => {
    if (pagina === "cadastro") carregarEquipamentos()
    if (pagina === "cidades") carregarCidades()
    if (pagina === "funcionarios") carregarFuncionarios()
    if (pagina === "servicos") carregarServicos()
  }, [pagina])

  async function carregarEquipamentos() {
    const { data } = await supabase.from("equipamentos").select("*")
    setEquipamentos(data || [])
  }
  async function carregarCidades() {
    const { data } = await supabase.from("cidades").select("*")
    setCidades(data || [])
  }
  async function carregarFuncionarios() {
    const { data } = await supabase.from("funcionarios").select("*")
    setFuncionarios(data || [])
  }
  async function carregarServicos() {
    const { data } = await supabase.from("servicos").select("*")
    setServicos(data || [])
  }

  async function cadastrar() {
    if (!nome || !setor) return alert("Preencha todos os campos!")
    await supabase.from("equipamentos").insert([{ nome, setor }])
    setNome(""); setSetor("")
    carregarEquipamentos()
  }
  async function cadastrarCidade() {
    if (!nomeCidade) return alert("Preencha o nome!")
    await supabase.from("cidades").insert([{ nome: nomeCidade }])
    setNomeCidade("")
    carregarCidades()
  }
  async function cadastrarFuncionario() {
    if (!nomeFuncionario || !cargoFuncionario) return alert("Preencha todos os campos!")
    await supabase.from("funcionarios").insert([{ nome: nomeFuncionario, cargo: cargoFuncionario }])
    setNomeFuncionario(""); setCargoFuncionario("")
    carregarFuncionarios()
  }
  async function cadastrarServico() {
    if (!descricaoServico) return alert("Preencha a descrição!")
    await supabase.from("servicos").insert([{ descricao: descricaoServico }])
    setDescricaoServico("")
    carregarServicos()
  }

  return (
    <div>
      <Menu mudarPagina={setPagina} />
      <hr />
      {pagina === "inicio" && (
        <div>
          <h1>Sistema de Controle de Equipamentos</h1>
          <p>Bem-vindo ao sistema da mineradora.</p>
          <p>Utilize o menu para navegar.</p>
        </div>
      )}
      {pagina === "cadastro" && (
        <div>
          <h1>Cadastro de Equipamentos</h1>
          <input type="text" placeholder="Nome do Equipamento" value={nome} onChange={(e) => setNome(e.target.value)} />
          <br /><br />
          <input type="text" placeholder="Setor do equipamento" value={setor} onChange={(e) => setSetor(e.target.value)} />
          <br /><br />
          <button onClick={cadastrar}>Cadastrar</button>
          <h3>Equipamentos cadastrados:</h3>
          {equipamentos.map((eq) => (
            <Equipamento key={eq.id} nome={eq.nome} setor={eq.setor} />
          ))}
        </div>
      )}
      {pagina === "relatorio" && (
        <div>
          <h2>Relatório de Equipamentos</h2>
          <p>Total: {equipamentos.length}</p>
          {equipamentos.map((eq, index) => (
            <Equipamento key={index} nome={eq.nome} setor={eq.setor} />
          ))}
        </div>
      )}
      {pagina === "cidades" && (
        <div>
          <h2>Cidades</h2>
          <input type="text" placeholder="Nome da cidade" value={nomeCidade} onChange={(e) => setNomeCidade(e.target.value)} />
          <br /><br />
          <button onClick={cadastrarCidade}>Cadastrar</button>
          <h3>Cidades cadastradas:</h3>
          {cidades.map((c) => <p key={c.id}>{c.nome}</p>)}
        </div>
      )}
      {pagina === "funcionarios" && (
        <div>
          <h2>Funcionários</h2>
          <input type="text" placeholder="Nome do funcionário" value={nomeFuncionario} onChange={(e) => setNomeFuncionario(e.target.value)} />
          <br /><br />
          <input type="text" placeholder="Cargo" value={cargoFuncionario} onChange={(e) => setCargoFuncionario(e.target.value)} />
          <br /><br />
          <button onClick={cadastrarFuncionario}>Cadastrar</button>
          <h3>Funcionários cadastrados:</h3>
          {funcionarios.map((f) => <p key={f.id}>{f.nome} - {f.cargo}</p>)}
        </div>
      )}
      {pagina === "servicos" && (
        <div>
          <h2>Serviços</h2>
          <input type="text" placeholder="Descrição do serviço" value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)} />
          <br /><br />
          <button onClick={cadastrarServico}>Cadastrar</button>
          <h3>Serviços cadastrados:</h3>
          {servicos.map((s) => <p key={s.id}>{s.descricao}</p>)}
        </div>
      )}
    </div>
  )
}

export default App