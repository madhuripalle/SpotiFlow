$('#modal-flow-attr').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var flowName = button.data('flow'); 
    var modal = $(this);
    modal.find('.modal-title').text('Select track attributes for "'+flowName+'"');
    modal.find('.modal-footer .btn-primary').attr('data-flow', flowName);
});

/*$('.flow-attr-btn').click(function (e) {
    e.preventDefault();

    var button  = $(this);
    var checkboxDiv   = $(button.data('target'));
    var attributes = checkboxDiv.find(); // get checked values
});*/

