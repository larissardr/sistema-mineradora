function Menu(props){
    return(
        <div className="menu">

        <button onClick={() => props.mudarPagina("inicio")}>Início</button>
        <button onClick={() => props.mudarPagina("cadastro")}>Cadastro</button>
        <button onClick={() => props.mudarPagina("relatorio")}>Relatório</button>
        <button onClick={() => props.mudarPagina("cidades")}>Cidades</button>
        <button onClick={() => props.mudarPagina("funcionarios")}>Funcionários</button>
        <button onClick={() => props.mudarPagina("servicos")}>Serviços</button>

        </div>
    )
}
export default Menu