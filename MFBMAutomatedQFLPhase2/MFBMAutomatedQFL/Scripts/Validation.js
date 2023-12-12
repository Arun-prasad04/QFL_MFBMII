
function validatefield(id) {
    if ($(id).val() == '') {
        $(id).addClass('error');
        return false;
    }
    else {
        $(id).removeClass('error');
        return true;
    }
}function validatespaceValue(id) {
    if ($.trim($(id).val()) == '') {
        $(id).addClass('error');
        return false;
    }
    else {
        $(id).removeClass('error');
        return true;
    }
}

function ProgressMonitorVINDeleteValidation() {

	if ($('#resoanComment').val() == null || $('#resoanComment').val() == '') {
		$('#resoanComment').css('border', '1px solid red');
		return false;
	}
	else {
		$('#resoanComment').css('border', '1px solid #ccc');
		return true;
	}
}

function validatefile(id) {
    if ($(id).val() == '') {
        //$(id).addClass('error');
        $('#FileError').show();
        return false;
    }
    else {
        $(id).removeClass('error');
        return true;
    }
}
function validatedropdown(id) {
    if ($(id).val() == 'Select' || $(id).val() == '0') {
        $(id).addClass("error");
        $("#drpVechiletype").next().find('button').addClass('error');
        $("#drpLinemaster").next().find('button').addClass('error');
        return false;
    }
    else {
        $(id).removeClass("error");
        return true;
    }
}
function validatenumeric(id) {
    var valid = Number.isInteger(Number($(id).val()));
    if (valid) {
        $(id).removeClass('error');
        return true;
    }
    else {
        $(id).addClass('error');
        return false;
    }
}
function validatenumericwithempty(id) {
    if ($(id).val() == '') {
        $(id).addClass('error');
        return false;
    }
    else {
        var valid = Number.isInteger(Number($(id).val()));
        if (valid) {
            if ($(id).val() >= 0) {
                $(id).removeClass('error');
                return true;
            }
            else {
                $(id).addClass('error');
                return false;
            }
        }
        else {
            $(id).addClass('error');
            return false;
        }
    }

}