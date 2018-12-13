

$(".checkin_submit").click(function () {
    var input = $('#idForm input').val();
    var select = $('#idForm select').val();
    if(input && select){
        $('#error').html('')
        $('.checkin_submit').attr('disabled', true);
        $('#idForm input').attr('disabled', true);
        $('#idForm select').attr('disabled', true);


        $('.loading-checkin').show();
        $('.text-checkin').hide();

        
        $('#idForm').submit();
    }else{
        console.log('error');
        $('#error').html('Vui Lòng Nhập Đầy Đủ')
    }

    
});


$('#idForm').submit(function(e){
    
    var url = 'https://appscyclone.com/xmas/index.php/api/do-checkin';
    var formData = new FormData();
    formData.append('id', $("#all-people").val() );
    formData.append('photo', $(".updload_img")[0].files[0]  );
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.status) {
                console.log(data)
                number = data.data.lucky_number;

                $('.lucky_number').html(number)
                $('.lucky_text').html('Your Lucky Number')

                if (number) {
                    $('#idForm .form-group').hide();
                    $('.checkin_submit').hide();
                }
            }

        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback 
            console.log(errorMessage)
        }

    });
    e.preventDefault();
    
    
});

$(document).ready(function () {
    fn_listCheckin();
});

function fn_listCheckin(params) {

    $('#all-people').attr('disabled',true);
    $.ajax('https://appscyclone.com/xmas/index.php/api/list-not-checkin',
        {
            dataType: 'json', // type of response data
            success: function (data, status, xhr) {   // success callback function
                $('#all-people').removeAttr('disabled');
                $.each(data.data, function (i, item) {
                    $('#all-people').append($('<option>', {
                        value: item.id,
                        text: item.name
                    }));
                });


            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                console.log(errorMessage)
            }
        });
}
