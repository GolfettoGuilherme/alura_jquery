/*
	// text - recupera o que esta dentro de uma tag
	// val  - recupera o que esta dentro de um input
	$(".titulo").text("Meu primeiro blog"); //tag com classe
	$("#autor").val("Daniel"); //input com id
	$("textarea").attr("cols","40"); //atributos de todas as tags Comentários

	$("#botao-reiniciar").on("click",function(){
		ei, somos iguais
	})

	$("#botao-reiniciar").click(function(event) {
		verdade amigão
	});

	$(document).ready(); ou $() - função executada sempre apos o carregamento da pagina

	removeAttr("disabled") - para remover um atributo
	campo.css(); - mexe no css, nem sempre necessário

	campo.addClass('campo-desativado'); 
	campo.removeClass('campo-desativado');
	OU (da no mesmo )
	campo.toggleClass("campo-desativado");


	var cor = $("div").css("background-color");
	Também é possivel recuperar mais de um valor passando um array de propriedades, por exemplo:

	var valores = $("div").css(["background-color","width"]);
	O resultado é um objeto que possui todos os valoes. Por exemplo para acessar o width podemos escrever:

	valores.width
*/
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
		console.log("Pagina carregada");
		atualizaTamanhoFrase();
		inicializaContadores();
		inicializaCronometro();
		iniciaMarcadores();
		$("#botao-reiniciar").click(reiniciaJogo);
	}
);

function atualizaTamanhoFrase(){
	var frase = $(".frase").text(); //recuperei o texto do paragra
	var numPalavras = frase.split(" ").length; 
	var tamanhoFrase = $('#tamanhoFrase');
	tamanhoFrase.text(numPalavras); //atribui ao elemento selecionado	
}
//disse que quando eu coloco valor no campo, vai acontecer isso
function inicializaContadores(){
	campo.on("input", function(){
		var conteudo = campo.val(); //valor
		var qtdCaracteres = conteudo.length;
		var qtdPalavras = conteudo.split(/\S+/).length -1; //SÓ PARA ACERTAR A CONTAGEM
		$("#contador-palavras").text(qtdPalavras);
		$("#contador-caracteres").text(qtdCaracteres);
		$("#botao-reiniciar").attr("disabled", true);
	});	
}

function iniciaMarcadores(){
	var frase = $('.frase').text();
	campo.on("input", function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);
		//var estaCorreto = digitado == comparavel;  //depende da versão do Navegado e melhor usar essa ao inves da startsWith();
		var estaCorreto = frase.startsWith(digitado);
		if(estaCorreto){
			campo.removeClass('campo-errado');
			campo.addClass('campo-correto');
		} else{
			campo.removeClass('campo-certo');
			campo.addClass('campo-errado');
		}
	});
}

function inicializaCronometro(){
	var tempoRestante = $("#tempo-digitacao").text();
	//ela só vai ser executada uma vez, por caua do one (é o on() só que unica)
	campo.one("focus", function(){
		var id = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				//inclui o atributo no elemento
				campo.attr("disabled",true);
				$("#botao-reiniciar").attr("disabled", false);
				clearInterval(id); //para parar de funcionar a função
				campo.toggleClass('campo-desativado'); //add uma classe html para essa tag
			}
		},1000);
	})	
}

function reiniciaJogo(){
	console.log("teste");
	campo.attr("disabled",false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.toggleClass('campo-desativado');
	campo.removeClass('campo-errado');
	campo.removeClass('campo-certa');
}
