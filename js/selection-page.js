$("#durationbtn").bootstrapSwitch('state',false);
$("#durationinput").prop('disabled',true);
$('[data-toggle="tooltip"]').tooltip();
// $("#prioritysectionid").prop('disabled',false);

//set a threshold to test the funtion
var duration_thresh = 600;

$("#durationbtn").on('switchChange.bootstrapSwitch',function(event,state){
	console.log(state);
	if(state)
	{
		$("#durationinput").prop('disabled',false);
	}
	if(!state){
		$("#durationinput").prop('disabled',true);
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
	var hour = $('#hourid option:selected').val();
	var min = $('#minuteid option:selected').val();
	var second = $('#secondid option:selected').val();

	var total_time = hour*6000+min*60+second;
	if(total_time==0){
		alert("Please select a valid duration!");
	}

	if(total_time>duration_thresh){
		var msg=confirm("Your duration is beyond the total time in your collection. Select Yes to add more tracks/playlists. Select No to reset your duration.");
		if(msg){
			//jump to the browser to let the users select more in their collection.
		}else{
			//let user to reset his duration.
		}
	}

})





