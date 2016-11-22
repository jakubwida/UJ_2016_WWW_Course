

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
	console.log(helper.getAverageForCourse(student_array,"2013","AlgorithmsI"));

	//helper.getStudentListForCourse(student_array,"2013","AlgorithmsI");
	//console.log(new_array[0].last_name);
    } 
); 


