$(document).ready(function(){    

	            // var initialscript = $("#starter").html();
	            // $("#script").html(initialscript);

    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
          lineNumbers: true,
          mode: "javascript",
          matchBrackets: true,
          tabMode: 'indent'
        });

    // // editor.on("change", function(cm, co ){
    // //     console.log(co);
    // // });
	
	$("#change-code").click(function()
	{
	    var newscript = editor.getValue();
	    // $("#code").html(newscript);

		load_page_from_txt("fiddle.txt", newscript);
	});


});

function load_page_from_txt(filename, user_input)
{	
	$.get(filename, function(data){
			play_fiddle(data, user_input);
		}
	);
}

function play_fiddle(page_str, user_input)
{
	// alert(page_str);
	// var iframe = $("#fiddle");
	var result = insert_string_from_codemirror(page_str, user_input);

	var iframe = document.getElementById('fiddle');

	if(iframe.contentDocument) doc = iframe.contentDocument;
	else if(iframe.contentWindow) doc = iframe.contentWindow.document;
	else doc = iframe.document;

	doc.open();
	doc.writeln(result);
	doc.close();
}

function insert_string_from_codemirror(page_str, user_input)
{
	var halves = page_str.split("@@@");
	// alert(user_input);
	// console.log(halves);
	return halves[0].concat(user_input, halves[1]);
}


// var result = "string";
// var iframe = document.getElementById('iframe');
         
// if(iframe.contentDocument) doc = iframe.contentDocument;
// else if(iframe.contentWindow) doc = iframe.contentWindow.document;
// else doc = iframe.document;
 
// doc.open();
// doc.writeln(result);
// doc.close();


