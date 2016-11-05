function inserePlacar(){
	//para encontrar um elemento dentro de outro
	var corpoTabela = $(".placar").find("tbody");
	var usuario = "Guilherme";
	var numPalavras = $("#contador-palavras").text();

	var linha = novaLinha(usuario,numPalavras);

	linha.find('.botao-remover').click(removeLinha); //atribui o evento de click 

	corpoTabela.prepend(linha);
}

function novaLinha(usuario,numPalavras){
	var linha = $("<tr>"); //criando um elemento html
	var colunaUsuario = $("<td>").text(usuario); //cria o elemento e da a ele o conteudo de texto
	var colunaPalavras = $("<td>").text(numPalavras);
	var colunaRemover = $("<td>");
	var link = $("<a>").addClass('botao-remover').attr("href", "#");
	var icone = $("<i>").addClass('small').addClass('material-icons').text('delete');

	link.append(icone); //a tag link passa a ter a tag i
	colunaRemover.append(link);

	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha
}

function removeLinha(){
	event.preventDefault();	//o event é o evento padrão que aconteceria se fosse clicado, usando isso, não acontece o redirecionamento da tag <a>
	$(this).parent().parent().remove(); //this = elemento clicado, agora ele tem os poderes jQuery, parent = o pai do elemento
}
