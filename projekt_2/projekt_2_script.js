

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


function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}



function basic_intersect(a,b)
	{
	var out = [];
	$.each(a,function(index,value)
		{
		if($.inArray(value,b)!=(-1))
			{
			out.push(value);
			}
		});
		return out;	
	}




function getObjectFromJSON(filename)
	{
	var output;
	$.ajaxSetup({async: false});

	$.getJSON(filename,function(data)
		{
		output=data;
		});
	$.ajaxSetup({async: true});	
	return output;
	}



function Helper()
	{
	this._sortByName =function(a,b)
		{
		var aVal = a.last_name.toLowerCase();
		var bVal = b.last_name.toLowerCase();

		return ((aVal < bVal) ? -1 : ((aVal > bVal) ? 1 : 0));
		};
	//returns a list of course year names
	this._getCourseYearList= function(student_obj)
		{
		year_array =[];
		$.each(student_obj.courses,function(key,val)
			{
			year_array.push(key);
			});
		return year_array;
		};
	//returns a list of courses given their year
	this._getCourseList= function(student_obj,year)
		{
		var course;
		$.each(student_obj.courses,function(key,val)
			{
			if(key==year)
				{course=val;}
			});
		return course;
		};

	this._createSimplifiedStudentObj = function(student_obj)
	{
	var new_student=new Object();
	new_student.first_name=student_obj.first_name;
	new_student.last_name=student_obj.last_name;
	new_student.index=student_obj.index;
	return new_student;
	};
	this.getStudentList = function(student_array)
		{
		return student_array.sort(this._sortByName);
		};
	
	this.getSimplifiedStudentListForCourse = function(student_array,year,CourseName)
		{
		var output_array=[]
		var self=this;
		$.each(student_array,function(index,value)
			{
			var year_list =self._getCourseYearList(value);
			if($.inArray(year,year_list) != -1)
				{
				Courses=self._getCourseList(value,year);
				if(CourseName in Courses)
					{
					output_array.push(self._createSimplifiedStudentObj(value));
					}
				}
			//console.log(value.last_name);
			});

		return output_array.sort(this._sortByName);
		};
	this.getStudentListForCourse = function(student_array,year,CourseName)
		{
		var output_array=[]
		var self=this;
		$.each(student_array,function(index,value)
			{
			var year_list =self._getCourseYearList(value);
			if($.inArray(year,year_list) != -1)
				{
				Courses=self._getCourseList(value,year);
				if(CourseName in Courses)
					{
					output_array.push(value);
					}
				}
			//console.log(value.last_name);
			});

		return output_array.sort(this._sortByName);
		};
	this.getAverageForStudentInYear = function(student_obj,year)
		{
		var courses = this._getCourseList(student_obj,year);
		var grades =[]
		$.each(courses,function(key,value)
			{
				$.each(value.grades,function(key,value)
				{
					$.each(value,function(key,value)
					{//console.log(key,value);
					grades.push(value);
					});
				});
			});
		var total=0;
		$.each(grades,function(index,value)
			{
			total+=value;
			});
		return total/grades.length;
		};
	this.getAllGradesForStudentInYear = function(student_obj,year)
		{
		var courses = this._getCourseList(student_obj,year);
		var grades =[]
		$.each(courses,function(key,value)
			{
				$.each(value.grades,function(key,value)
				{
					$.each(value,function(key,value)
					{//console.log(key,value);
					grades.push(value);
					});
				});
			});

		return grades;
		};
	this.getAverageForStudentAllYears= function(student_obj)
		{
		var self=this;
		var grades =[];
		var years = this._getCourseYearList(student_obj);
		$.each(years,function(index,value)
			{
			grades=grades.concat(self.getAllGradesForStudentInYear(student_obj,value));	
			});
		//console.log(grades);
		var total=0;
		$.each(grades,function(index,value)
			{
			total+=value;
			});
		return total/grades.length;
		
		};
	this.getAverageForCourse= function(student_array,year,CourseName)
		{
		var self=this;
		var proper_array =this.getStudentListForCourse(student_array,year,CourseName);
		var proper_courses=[];
		$.each(proper_array,function(key,value)
			{
			var courses = self._getCourseList(value,year);
			
			$.each(courses,function(key,value)
				{
				if(key==CourseName)
					{
					$.each(value,function(key,value)
						{
						$.each(value,function(key,value)
							{
							proper_courses=proper_courses.concat(value);
							});
						});				
					}	
				});
			});
		console.log(proper_courses);
		var total=0;
		$.each(proper_courses,function(index,value)
			{
			total+=value;
			});
		return total/proper_courses.length;
		};
	this.createSubjectRow = function(subject)
		{
		var row =""
			$.each(subject,function(key,value)
				{
				row = row+"<td>"+key+value+"</td>"
				}
			);
		return row;
		};
	this.createYearRow = function(year)
		{
		var self=this;
		var row =""
			$.each(year,function(key,value)
				{
				row = row+"<td>"+key+self.createSubjectRow(value)+"</td>"
				}
			);
		return row;
		};

	this.createCourseRow = function(course_obj)
		{
		var self=this;
		var row =""
		$.each(course_obj,function(key,value)
			{
			row = row+"<td>"+key+self.createYearRow(value)+"</td>"
			}
		);
		return row;	
		};
	

	
	this.createHTMLTableRow = function(student_obj)
		{
		var self=this;
		var row ="<tr>"
		$.each(student_obj,function(key,value)
			{
			if(value !="[object Object]")
				{
				row = row+"<td>"+value+"</td>"
				}
			else
				{
				row = row+"<td>"+self.createCourseRow(value)+"</td>"
				}
			});
		row = row+"</tr>"
		return row
		};
	

	this.createHTMLTable = function(student_array)
		{
		var self=this;
		var out ="<table>";
		var firstEntry= student_array[0];
		var row ="<tr>"

		$.each(firstEntry,function(key,value)
			{
			//if(value !="[object Object]")
				{
				row = row+"<th>"+key+"</th>"
				}
			});
		row = row+"</tr>"
		out = out+row;

		$.each(student_array,function(key,value)
			{
			out=out + self.createHTMLTableRow(value);
			});

		
		

		return out+"</table>";

		};
		
	}


	//co trzeba zrobic: proste menu ktore bedzie decydowac co bedzie wypisane
	//bedzie ono wypluwalo prosta tabelke w zaleznosci od zadanych warunkow
	//typu: wyswietl srednia dla roku
	//wyswietl studentow majacych algorytmy
	//takie cos, co uzywa tych wcesniejszych funkcji
	



function change_view(object)
{

if(object.parentNode.className=="order1")
	{object.parentNode.className="order1_open";}
else
	{object.parentNode.className="order1";}
}


function Database(student_array)
	{
	var self=this;
	this.student_array=student_array;
	this.get_attributes=function(attr_name)
		{
		output=[];
		$.each(student_array,function(index,value)
			{
			output.push(value[attr_name]);
			});
		return output;
		};
	this.get_years=function()
		{
		output=[];
		var helper = new Helper()
		$.each(student_array,function(index,value)
			{
			var yearlist = helper._getCourseYearList(value);
			$.each(yearlist, function(i, element)
				{
    				if($.inArray(element, output) === -1) output.push(element);
				});	
			});
		return output;
		};
	this.get_course_names=function()
		{
		output=[];
		var helper = new Helper()
		$.each(student_array,function(index,value)
			{
			
			$.each(value["courses"],function(key,value2)
				{
					$.each(value2, function(i, element)
						{
    						if($.inArray(i, output) === -1) output.push(i);
						});
				});
	
			});
		return output;
		};
	this.get_course_names=function()
		{
		output=[];
		var helper = new Helper()
		$.each(student_array,function(index,value)
			{
			
			$.each(value["courses"],function(key,value2)
				{
					$.each(value2, function(i, element)
						{
    						if($.inArray(i, output) === -1) output.push(i);
						});
				});
	
			});
		return output;
		};
	//tworzy htmlowy obiekt z checkboxami na lata studentow itp
	this.create_asker_object = function()
		{
		var out ="<ul>";

	
		var year_list = self.get_years();
		var year="<li class='order1' ><p onclick='change_view(this)'>lata </p><ul>";
		$.each(year_list,function(index,value)
			{
			year=year+"<li><label class='year'><input type='checkbox' checked>"+value+"</label></li>";
			});
		year=year+"</ul></li>"
		out= out+year;
	
		var course_list = self.get_course_names();
		var courses="<li class='order1' ><p onclick='change_view(this)'>kursy</p> <ul>";
		$.each(course_list,function(index,value)
			{
			courses=courses+"<li><label class='course'><input type='checkbox' checked>"+value+"</label></li>";
			});
		courses=courses+"</ul></li>"
		out= out+courses;

		var grades="<li class='order1' ><p onclick='change_view(this)'>oceny</p> <ul>";
		grades=grades+"<li><label class='grade'><input type='checkbox' checked>cwiczenia</label></li>";
		grades=grades+"<li><label class='grade'><input type='checkbox' checked>wyklad</label></li>";
		
		grades=grades+"</ul></li>"
		out= out+grades;		
		out = out + "<li class='order1' id='regbutton'><p onclick='make_table()'>utworz tabele</p></li>"
		out=out+"</ul>"
		return out;
		};


	this.get_all_courses_in_year = function(student_list, year)
		{
		var course_list=[];
		$.each(student_list,function(key,value)
			{
			students_courses=value.courses[year];
			$.each(students_courses, function(i, element)
						{
    						if($.inArray(i, course_list) === -1) course_list.push(i);
						});
			});
		return course_list;
		};
	
	this.students_grades_to_table_row= function(student,year,course,do_exercises,do_lectures,do_average)
		{
		//console.log("ayayay:"+student.last_name,year,course );
		var mini_help=function(argument)
			{
			if (argument==null)
				{return "<td></td>"}
			else if(argument.length==2)
				{return "<td>"+argument[0]+","+argument[1]+"</td>";}
			else
				{return"<td>"+argument+"</td>";}
			};
		out ="";
		if(typeof student.courses[year][course] === 'undefined')
			{grades.exercises =null; grades.lecture=null;}
		else
		grades = student.courses[year][course].grades;
		if(do_exercises)
			{
			out = out+mini_help(grades.exercices);
			}
		if(do_lectures)
			{
			out = out+mini_help(grades.lecture);
			}

		return out;	
		};
	this.grades_header = function(exercises,lectures)
	{
		var out ="";
		if(exercises)
			{
			out =out+"<th>exc:</th>"
			}
		if(lectures)
			{
			out =out+"<th>lec:</th>"
			}
		return out;
	};
	//zjada (po id) stworzony wczesniej obiekt, tworzy tabelke z danymi
	


this.reap_polling_object_2 = function(object_id)
		{

		console.log("table creation");


		year_list = $.makeArray($("#"+object_id+" .year").map(function()
			{
			if(this.childNodes[0].checked)
				{return this.textContent;}
			}));
		

		console.log("reaped: years: "+year_list);



		course_list = $.makeArray($("#"+object_id+" .course").map(function()
			{
			if(this.childNodes[0].checked)
				{return this.textContent;}
			}));
		console.log("reaped: courses: "+course_list);
		grade_list = $.makeArray($("#"+object_id+" .grade").map(function()
			{
			if(this.childNodes[0].checked)
				{return this.textContent;}
			}));
		console.log("reaped: grades: "+grade_list);	
		
		number_of_final_cols=2;
		
		

		var initial_table="";
		var latter_tables=[];


		//tabelka wstepna
		initial_table="<table><thead></thead> <tbody>"
		initial_table=initial_table+"<tr><th>nr.</th><th>imie</th><th>nazwisko</th><th>indeks</th><th>data urodzenia</th><th>rok studiow</th></tr>";
		$.each(self.student_array,function(index,value)
			{
			initial_table=initial_table+"<tr><td>"+index+"</td><td>"+value.first_name+"</td>"+"<td>"+value.last_name+"</td>"+"<td>"+value.index+"</td>"+"<td>"+value.birth_date+"</td>"+"<td>"+value.year_of_study+"</td>";
					
			});
		initial_table=initial_table+"</tbody></table>"
		//koniec tabelki wstepnej

		//tabelki kolejne
		var do_exc=0;
		var do_lec=0;
		if($.inArray("cwiczenia",grade_list)!=(-1))
			{do_exc=1;}
		if($.inArray("wyklad",grade_list)!=(-1))
			{do_lec=1;}
		number_of_final_cols=do_exc+do_lec;
			//kolumny ost rzedu
		console.log("do exc, do lec:"+do_exc+" "+do_lec);


		
		var output="";
		var year_row="";
		var course_row="";
		var lec_ex_row="";
		var student_grade_rows=[];

		

		$.each(year_list,function(index,value)
			{
			console.log("single table: "+value)
			output="";
			year_row="";
			course_row="";
			lec_ex_row="";
			student_grade_rows=[];
			$.each(self.student_array,function(index,value)
				{
				student_grade_rows.push("<tr><td>"+index+"</td>");
				});



			output ="<table><thead></thead> <tbody>";
	
			year_course_list = self.get_all_courses_in_year(self.student_array,value);
			result_course_list=basic_intersect(year_course_list,course_list);

			year_row="<tr><th rowspan='3'>nr.</th><th colspan = '"+ result_course_list.length * number_of_final_cols + "'>"+value+"</th></tr>";
			console.log("initial_course_list:"+year_course_list);
			console.log("result_course_list:"+result_course_list);

			course_row="<tr>";
			$.each(result_course_list,function(index_2,value_2)
				{
				course_row= course_row+"<th colspan='"+number_of_final_cols+"'>"+value_2+"</th>"
				lec_ex_row=lec_ex_row + self.grades_header(do_exc,do_lec);
				$.each(self.student_array,function(index_3,value_3)
					{
					student_grade_rows[index_3]=student_grade_rows[index_3]+self.students_grades_to_table_row(value_3,value,value_2,do_exc,do_lec,0);
					});
				});
			course_row=course_row+"</tr>";

			output =output+year_row+course_row+lec_ex_row;
			$.each(student_grade_rows,function(index,value)
				{
				output=output+value;
				});
			output = output+"</tbody></table>";
			latter_tables.push(output);
			});
		var returned="<ul>";
		returned= returned+"<li>"+initial_table+"</li>";
		$.each(latter_tables,function(index,value)
			{
			returned =returned+"<li>"+value+"</li>";
			});
		returned = returned+"</ul>";
		return returned;



		
		};	
	}


var database="";
function make_table()
{
document.getElementById("proper_output_table").innerHTML =database.reap_polling_object_2("asker");

}


$(document).ready(function() 
    { 
        

	var obj1=getObjectFromJSON("JSON_Dane/Jan_Kowalski.json");
	var obj2=getObjectFromJSON("JSON_Dane/Andrzej_Nowak.json");
	var obj3=getObjectFromJSON("JSON_Dane/Zbigniew_Arbuz.json");

	var student_array=[obj1,obj2,obj3];
	var helper = new Helper();
	var new_array= helper.getStudentList(student_array);
	//console.log(helper._getCourseYearList(obj1));
	//console.log(helper._getCourseList(obj1,"2013"));
	//console.log(helper.getStudentListForCourse(student_array,"2013","AlgorithmsI")[0]);
	//console.log(helper.getAverageForStudentInYear(obj1,"2013"));
	//console.log(helper.getAverageForStudentAllYears(obj1));
	//console.log(helper.getAverageForCourse(student_array,"2013","AlgorithmsI"));


	
	//console.log(helper.createHTMLTable(student_array));
	//document.getElementById("table_print").innerHTML =helper.createHTMLTable(student_array)
	
	database = new Database(student_array);
	//console.log(database.get_attributes("first_name"));
	//console.log(database.get_years());
	//console.log(database.get_course_names());
	//console.log(database.create_asker_object());

	//console.log(database.students_grades_to_table_row(obj1,"2013","BasicPhysicsI",1,0,0));


	document.getElementById("asker").innerHTML =database.create_asker_object();
	//console.log(database.reap_polling_object("outputable"));

	

	
	//database.see_if_student_has_course_in_year(obj1,"2013","b");
	//console.log(database.get_all_courses_in_year(student_array,"2013"));
	//helper.getStudentListForCourse(student_array,"2013","AlgorithmsI");
	//console.log(new_array[0].last_name);
    } 
); 






