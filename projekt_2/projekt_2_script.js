

function button_1()
	{
	window.alert("Oto Alert");
	console.log("hello");
	}

function button_red()
	{
	document.getElementById("przyklad_2").style.backgroundColor="red";
	
	}
function button_green()
	{
document.getElementById("przyklad_2").style.backgroundColor="green";
	}
function button_blue()
	{
document.getElementById("przyklad_2").style.backgroundColor="blue";
	}


$(document).ready(function() 
    { 
        $("#myTable").tablesorter(); 

	$.getJSON("dane.json",function(data)
		{
		console.log("succeded reading jsonery",data.first_name);
		//var items = [];
		//$.each(data,function(key,val)
		//	{
		//	console.log(key,val)
		//	});

		});
    } 
); 


function Helper()
{
this.data_Array=[]
this.add_data_object = function( object ) {this.dataArray.push(object)  }

}





//jquery json database

