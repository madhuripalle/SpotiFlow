$("#durationbtn").bootstrapSwitch('state',false);
$(".durtime").prop('disabled',true);
$('[data-toggle="tooltip"]').tooltip();
// $("#prioritysectionid").prop('disabled',false);

//set a threshold to test the function
var duration_thresh = 600;
//The weight for the priority attributes.
var weight_1 = [1];
var weight_2 = [0.5, 0.5];
var weight_3 = [0.5, 0.3, 0.2];

$("#durationbtn").on('switchChange.bootstrapSwitch',function(event,state){
	console.log(state);
	if(state)
	{
		$(".durtime").prop('disabled',false);
	}
	if(!state){
		$(".durtime").prop('disabled',true);
	}
});

$('#attrpriorityid input[type=checkbox]').change(function(){
	if($('#attrpriorityid input[type=checkbox]:checked').length==3){
		$('#attrpriorityid input[type=checkbox]:not(:checked)').prop('disabled',true);
	}
	else{
		$('#attrpriorityid input[type=checkbox]:not(:checked)').prop('disabled',false);
	}
});

//Compute the duration the user select, furthermore find out whether the time is beyond the total time in 
//collection. I assume that the total time in the collection is duration_thresh = 100;
$('#nextpage').on('click',function(e){
	e.preventDefault();

	var duration_time;
	if($('#durationbtn').bootstrapSwitch('state')){
		if($('#hourid option:selected').val()==0 && $('#minuteid option:selected').val()==0 && $('#secondid option:selected').val()==0){
			alert("Please select the playlist duration!");
		}
		else{
			duration_time = computeDuration();
			// console.log(total_time);
			if(duration_time>duration_thresh){
				var msg=confirm("Your duration is beyond the total time in your collection. Select Yes to add more tracks/playlists. Select No to reset your duration.");
				if(msg){
					//jump to the browser to let the users select more in their collection.
				}else{
					//let user to reset his duration.
					return;
				}
			}
		}
	}
	else{
		//No requirement for the duration. 
	}

	if($('#attrpriorityid input[type=checkbox]:checked').length>0){
		//The users have select the priority.
		var attr_item=[];
		var attr_num = $('#attrpriorityid input[type=checkbox]:checked').length;
		var $this = $('#attrpriorityid input[type=checkbox]:checked');
		for(var i=0; i<attr_num; i++){
			attr_item[i]=$this[i].value;
			// console.log(attr_item[i]);
		}
		if(!$('#dromedaryflow').prop('disabled')){
			//Dromedary flow
			priorityDromedary(attr_item);
		}
		else if(!$('#descendflow').prop('disabled')){
			//Descending incline flow
			priorityDescend(attr_item);
		}
		else if(!$('#ascendflow').prop('disabled')){
			//Ascending incline flow
			priorityAscend(attr_item);
		}
		else{
			//Something else.
		}

	}

});

// $('#bactrianflow').on('click',function(e){
// 	e.preventDefault();

// 	$('#cocktailflow').prop('disabled',true);
// 	$('.drome').prop('disabled',true);
// 	$('.descend').prop('disabled',true);
// 	$('.ascend').prop('disabled',true);
// 	$('#chooseagain').show();

// });

// $('#cocktailflow').on('click',function(e){
// 	e.preventDefault();

// 	$('#bactrianflow').prop('disabled',true);
// 	$('.drome').prop('disabled',true);
// 	$('.descend').prop('disabled',true);
// 	$('.ascend').prop('disabled',true);
// 	$('#chooseagain').show();
// });

// $('#dromedaryflow').on('click',function(e){
// 	e.preventDefault();

// 	$('.descend').prop('disabled',true);
// 	$('.ascend').prop('disabled',true);
// 	$('.flowbtn1').prop('disabled',true);
// 	$('#chooseagain').show();
// });

// $('#descendflow').on('click',function(e){
// 	e.preventDefault();

// 	$('.drome').prop('disabled',true);
// 	$('.ascend').prop('disabled',true);
// 	$('.flowbtn1').prop('disabled',true);
// 	$('#chooseagain').show();
// });

// $('#ascendflow').on('click',function(e){
// 	e.preventDefault();

// 	$('.descend').prop('disabled',true);
// 	$('.drome').prop('disabled',true);
// 	$('.flowbtn1').prop('disabled',true);
// 	$('#chooseagain').show();
// });

// $('.flowbtn2').on('click',function(e){
// 	e.preventDefault();
// 	$('.attr').prop('disabled',false);
// 	$('#prioritysectionid h4').removeClass('text-muted');
// 	$('#prioritysectionid h4').addClass('text-default');
// 	// $('.priorder').prop('disabled',false);
// });

//A way we can priorize the order of the three attributes.
// $('.priorder').on('click',function(e){
// 	e.preventDefault();

// 	if($('#priorityresult').children().length >=3){
// 		alert("You can only choose at most three attributes!");
// 		$('#attrpriorityid input[type=checkbox]:checked').prop('checked',false);
// 		return;
// 	}
// 	if(!$('.priorder').prop('disabled')){
// 		$('#prioritysectionid input[type=checkbox]').each(function(){
// 			if($(this).prop('checked')){
// 				console.log(2);
// 				console.log($(this).val());

// 				var item = "<div><li>" + 
// 					$(this).val() +
// 					"</li></div>";
// 				console.log(item);
// 				$('#priorityresult').append(item);
// 				$(this).prop('checked',false);
// 			}
// 		});
// 	}
// })

function chooseBactrian (){
	$('#cocktailflow').prop('disabled',true);
	$('#dromedaryflow').prop('disabled',true);
	$('#descendflow').prop('disabled',true);
	$('#ascendflow').prop('disabled',true);
	$('.cocktaillabel').addClass('text-muted');
	$('.label2').addClass('text-muted');
	$('#chooseagain').show();
}

function chooseCocktail() {
	$('#bactrianflow').prop('disabled',true);
	$('#dromedaryflow').prop('disabled',true);
	$('#descendflow').prop('disabled',true);
	$('#ascendflow').prop('disabled',true);
	$('.bactrianlabel').addClass('text-muted');
	$('.label2').addClass('text-muted');
	$('#chooseagain').show();
}

function chooseDromedary() {
	$('#descendflow').prop('disabled',true);
	$('#ascendflow').prop('disabled',true);
	$('#bactrianflow').prop('disabled',true);
	$('#cocktailflow').prop('disabled',true);
	$('.label1').addClass('text-muted');
	$('.descendlabel').addClass('text-muted');
	$('.ascendlabel').addClass('text-muted');
	$('#chooseagain').show();

}

function chooseDescend() {
	$('#dromedaryflow').prop('disabled',true);
	$('#ascendflow').prop('disabled',true);
	$('#bactrianflow').prop('disabled',true);
	$('#cocktailflow').prop('disabled',true);
	$('.label1').addClass('text-muted');
	$('.dromelabel').addClass('text-muted');
	$('.ascendlabel').addClass('text-muted');
	$('#chooseagain').show();

}

function chooseAscend() {
	$('#descendflow').prop('disabled',true);
	$('#dromedaryflow').prop('disabled',true);
	$('#bactrianflow').prop('disabled',true);
	$('#cocktailflow').prop('disabled',true);
	$('.label1').addClass('text-muted');
	$('.descendlabel').addClass('text-muted');
	$('.dromelabel').addClass('text-muted');
	$('#chooseagain').show();

}


function computeDuration(){
	var hour = $('#hourid option:selected').val();
	var min = $('#minuteid option:selected').val();
	var second = $('#secondid option:selected').val();

	var duration = Number(hour)*3600 + Number(min)*60 + Number(second);
	return duration;


}

function enableAll() {
	// if(!$('#drome').prop('disabled')){
	// 	console.log(1);
	// }
	$(".label1").removeClass('text-muted');
	$(".label2").removeClass('text-muted');
	$(".flowimg").prop('disabled',false);

	if(!$('.drome').prop('disabled')||!$('.descend').prop('disabled')||!$('.ascend').prop('disabled')){
		$("#prioritysectionid h4").removeClass('text-default');
		$("#prioritysectionid h4").addClass('text-muted');
		// $('.priorder').prop('disabled',true);
	}
	$('#chooseagain').hide();
}

function priorityDromedary(attr_array) {
	//Use the selected attributes to compute the dromedary flow.
	var length = attr_array.length;
	if(length==1){
		//sort() the data.attr.
	}
	if(length==2){
		//sort() data.attr[0]*weight_2[0]+data.attr[1]*weight_2[1]
	}
	if(length==3){
		//sort() data.attr[0]*weight_3[0]+data.attr[1]*weight_3[1]+data.attr[2]*weight_3[2]
	}

}

function priorityDescend(attr_array) {
	//Use the selected attributes to compute the descending flow.
	//Sort the data and reverse. sort() & reverse()
}

function priorityAscend(attr_array){
	//Use the selected attributes to compute the ascending flow.
	//Sort the data
}







