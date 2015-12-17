$("#durationbtn").bootstrapSwitch('state',false);
$(".durtime").prop('disabled',true);
$("#durationsetbtn").prop('disabled',true);
$('[data-toggle="tooltip"]').tooltip();
// $("#prioritysectionid").prop('disabled',false);

//set a threshold to test the function
var durationPlaylist = 600;

//Modal selected attibutes
var flowattr = [];
var flowname;
var durationSet;

$("#durationbtn").on('switchChange.bootstrapSwitch',function(event,state){
	console.log(state);
	if(state)
	{
		$(".durtime").prop('disabled',false);
		$("#durationsetbtn").prop('disabled',false);
	}
	if(!state){
		$(".durtime").prop('disabled',true);
		$("#durationsetbtn").prop('disabled',true);
		$('#prioritysectionid').find(".attr").prop('disabled',true);
		$('#prioritysectionid').find(".attr").prop('checked',false);
		$("#prioritysectionid h4").addClass('text-muted');
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

$('#attrpriorityid-modal input[type=checkbox]').change(function(){
	if($('#attrpriorityid-modal input[type=checkbox]:checked').length==3){
		$('#attrpriorityid-modal input[type=checkbox]:not(:checked)').prop('disabled',true);
	}
	else{
		$('#attrpriorityid-modal input[type=checkbox]:not(:checked)').prop('disabled',false);
	}
});

$('#durationsetbtn').on('click',function(e){
	e.preventDefault();

	durationSet = computeDuration();
	console.log(durationSet);

	if(durationSet >= durationPlaylist){
		var msg = confirm("The duration is beyond the scope of the current playlist. Do you want to prioritize the tracks?");
		if(msg){
			$('#prioritysectionid').find('.attr').prop('disabled',false);
			$('#prioritysectionid h4').removeClass('text-muted');
		}
	}
	else{
		//when the duration selected is lower than the total time of the collection, redirect the users to add more tracks.
		var addtracks = confirm("The duration set if lowever than the total time of the track collection. Do you want to add more tracks?");
		if(addtracks){
			//redirect the user to add tracks;
		}
		else{
			alert("Please reset your playlist duration!")
		}
	}
});




function chooseBactrian (){
	$('#cocktailflow').prop('disabled',true);
	$('#dromedaryflow').prop('disabled',true);
	$('#descendflow').prop('disabled',true);
	$('#ascendflow').prop('disabled',true);
	$('.cocktaillabel').addClass('text-muted');
	$('.label2').addClass('text-muted');
	$('#chooseagain').show();
	flowname = "Bactrian";
}

function chooseCocktail() {
	$('#bactrianflow').prop('disabled',true);
	$('#dromedaryflow').prop('disabled',true);
	$('#descendflow').prop('disabled',true);
	$('#ascendflow').prop('disabled',true);
	$('.bactrianlabel').addClass('text-muted');
	$('.label2').addClass('text-muted');
	$('#chooseagain').show();
	flowname = "Ambient";
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
	flowname = "Dromedary";
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
	flowname = "Descending";
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
	flowname = "Ascending";
}


function computeDuration(){
	if($("#hourid").prop('disabled',false)||$("#minuteid").prop('disabled',false)||$("#secondid").prop('disabled',false)){
		var hour = $('#hourid option:selected').val();
		var min = $('#minuteid option:selected').val();
		var second = $('#secondid option:selected').val();

		var duration = Number(hour)*3600 + Number(min)*60 + Number(second);
		return duration;
	}
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
	flowattr = [];
	// console.log(flowattr);

	$('#chooseagain').hide();
}

function attributesSelectFunc() {

	var flowattr_length = $('#attrpriorityid-modal input[type=checkbox]:checked').length;

	for(var i = 0; i< flowattr_length; i++){
		flowattr[i] = $('#attrpriorityid-modal input[type=checkbox]:checked')[i].value;
		console.log(flowattr[i]);
	}

	//close the modal after apply
	$("#modal-flow-attr").modal('hide');
	
}

function applyFlow(){
    $('#modal-edit-group-name').modal('hide');
    //showAlert('success', '<strong>Changes saved!</strong> "'+groupnameOld+'" has been renamed "'+groupnameNew+'".', 'Undo name change');
    refreshCurrentPlaylist();

    if (flowname == "Dromedary")  dromedary(currentPlaylistTracks, flowattr);
    if (flowname == "Descending") descendingIncline(currentPlaylistTracks, attributes);
    if (flowname == "Ascending")  ascendingIncline(currentPlaylistTracks, attributes);
    //if (flowname == )

    $('#gotospotify-modal').modal('show');
}







