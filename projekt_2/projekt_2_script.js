

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
		var year="<li>lata <ul>";
		$.each(year_list,function(index,value)
			{
			year=year+"<li><label class='year'><input type='checkbox' checked>"+value+"</label></li>";
			});
		year=year+"</ul></li>"
		out= out+year;
	
		var course_list = self.get_course_names();
		var courses="<li>kursy <ul>";
		$.each(course_list,function(index,value)
			{
			courses=courses+"<li><label class='course'><input type='checkbox' checked>"+value+"</label></li>";
			});
		courses=courses+"</ul></li>"
		out= out+courses;

		var grades="<li>oceny <ul>";
		grades=grades+"<li><label class='grade'><input type='checkbox' checked>cwiczenia</label></li>";
		grades=grades+"<li><label class='grade'><input type='checkbox' checked>wyklad</label></li>";
		grades=grades+"<li><label class='grade'><input type='checkbox' checked>srednia</label></li>";
		grades=grades+"</ul></li>"
		out= out+grades;		

		
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
			out =out+"<td>exc:</td>"
			}
		if(lectures)
			{
			out =out+"<td>lec:</td>"
			}
		return out;
	};
	//zjada (po id) stworzony wczesniej obiekt, tworzy tabelke z danymi
	this.reap_polling_object = function(object_id)
		{
		year_list = $.makeArray($("#"+object_id+" .year").map(function()
			{
			if(this.childNodes[0].checked)
				{return this.textContent;}
			}));
		

		console.log(year_list);



		course_list = $.makeArray($("#"+object_id+" .course").map(function()
			{
			if(this.childNodes[0].checked)
				{return this.textContent;}
			}));
		console.log(course_list);
		grade_list = $.makeArray($("#"+object_id+" .grade").map(function()
			{
			if(this.childNodes[0].checked)
				{return this.textContent;}
			}));
		console.log(grade_list);	
		
		number_of_final_cols=2;
		
		

		
		
		//todo- poczatek
		var out="<table><thead></thead> <tbody>"
		var year_row="<tr><td rowspan='3'>first_name</td><td rowspan='3'>last_name</td><td rowspan='3'>index</td><td rowspan='3'>birth_date</td>";
		var course_row="<tr>";
		var course_header="<tr>"
		var student_rows=[];
		var do_exc =0;
		var do_lec=0;
		if($.inArray("cwiczenia",grade_list)!=(-1))
			{do_exc=1;}
		if($.inArray("wyklad",grade_list)!=(-1))
			{do_lec=1;}
		number_of_final_cols=do_exc+do_lec;
		$.each(self.student_array,function(index,value)
					{
					student_rows.push("<tr><td>"+value.first_name+"</td>"+"<td>"+value.last_name+"</td>"+"<td>"+value.index+"</td>"+"<td>"+value.birth_date+"</td>");
					//console.log("what"+value.last_name);
					});
		
		$.each(year_list,function(index,value)
			{
			console.log("pre course list:"+course_list);
			year_course_list = self.get_all_courses_in_year(self.student_array,value);



			result_course_list=intersect_safe(year_course_list,course_list);


			console.log("course list:"+result_course_list);

			year_row = year_row+"<td colspan='"+result_course_list.length*number_of_final_cols+"'>"+value+"</td>";
			$.each(result_course_list,function(index_2,value_2)
				{
					//students_grades_to_table_row -> tworz abele ktora tutaj wpada
				course_row= course_row+"<td colspan='"+number_of_final_cols+"'>"+value_2+"</td>"
				course_header=course_header + self.grades_header(do_exc,do_lec);
				$.each(self.student_array,function(index_3,value_3)
					{
					student_rows[index_3]=student_rows[index_3]+self.students_grades_to_table_row(value_3,value,value_2,do_exc,do_lec,0);
					//console.log(student_rows[index_3]);
					});
				});			
			});
		
		//console.log(student_rows);
		year_row=year_row+"</tr>";
		course_row=course_row+"</tr>";
		course_header =course_header+"</tr>"

		out = out + year_row;
		out = out + course_row;
		out = out + course_header;
		$.each(student_rows,function(index,value)
			{
			console.log("watu fuko "+value);
			out=out+value+"</tr>";
			});


		out =out+"</tbody></table>"
		return out;
		//todo- koniec

		//todo: to jest bliskie dzialania. jedyny problem ktory nie jest ozwiazany:
		//nie wiadomo jak dokladnie zorganizowac przyciski tak zeby przynajmniej 
		//jeden byl wcisniety (te co do wybierania czy to lecture excercise czy srednia)
		//no i podpisy jeszcze, ale to prawie bangla
		
	
		//almost works
		};
	
	}


var database="";
function make_table()
{
document.getElementById("proper_output_table").innerHTML =database.reap_polling_object("asker");

}


$(document).ready(function() 
    { 
        $("#myTable").tablesorter();

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






