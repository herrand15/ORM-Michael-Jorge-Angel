$(document).ready(function(){
	jQuery.get('/data', {}, function(data){
		var arrayAddr = jQuery.parseJSON(data);
		console.log(arrayAddr);

		var t = "";
		var dropDownMenu =
			'<div class="dropdown">' +
			'   <button class="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>' +
			'   <div class="dropdown-menu">' +
			'       <button class="dropdown-item deleteR">Delete</button>' +
			'       <button class="dropdown-item updateR">Update</button>' +
			'   </div>' +
			'</div>';

		$.each(arrayAddr, function(i, v) {
			t +=    '<tr><th>' + v.id +
					'</th><td>' + v.street +
					'</td><td>' + v.city +
					'</td><td>' + v.province +
					'</td><td>' + v.country +
					'</td><td>' + v.postcode +
					'</td><td>' + dropDownMenu + '</td></tr>';
		});
		$('#addressTable tbody').append(t);
	});

	$("#specialInput").hide();

	$(document).on("click", ".updateR", function() {
		console.log("perfecto");
		$.get("/delete", {id : $(this).parents("tr").children("th").html()});

		$('input[name=inputStreet]').val($(this).parents("tr").children("td").eq(0).html());
		$('input[name=inputCity]').val($(this).parents("tr").children("td").eq(1).html());
		$('input[name=inputProvince]').val($(this).parents("tr").children("td").eq(2).html());
		$('input[name=inputCountry]').val($(this).parents("tr").children("td").eq(3).html());
		$('input[name=inputPostCode]').val($(this).parents("tr").children("td").eq(4).html());
		$('#specialInput').val($(this).parents("tr").children("th").html());

		$('#submitButton').html('Edit');
		$("#submitButton").toggleClass('btn-success btn-primary');

	});

	$(document).on("click", ".deleteR", function() {
		$.get("/delete", {id : $(this).parents("tr").children("th").html()});
		location.reload();
	});

});

