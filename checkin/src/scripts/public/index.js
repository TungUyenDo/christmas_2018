
$(document).ready(function () {
    var time = 100;

    fn_listCheckin();

    fn_Checkin();
    setInterval(() => {
        fn_Checkin();
    }, time);


});


function fn_listCheckin(params) {
    $.ajax(' https://appscyclone.com/xmas/index.php/api/list-members',
        {
            dataType: 'json', // type of response data
            success: function (data, status, xhr) {   // success callback function

                localStorage.setItem('members', JSON.stringify(data.data));

                // var members = JSON.parse(localStorage.getItem('members'));
                // console.log(members)

                var temp = 0;
                $(".ball").each(function (index) {
                    $(this).attr('data-item', temp++);

                });

                $(".ball img").each(function (index) {
                    $(this).addClass('avatar');
                });

                for (var i = 0; i < data.data.length; i++) {
                    $(".ball").each(function (index) {
                        // console.log(i, parseInt($(".ball").attr('data-item')))
                        if (i == $(this).attr('data-item')) {

                            // set data-id for item
                            $(this).attr('data-id', data.data[i].id);

                            // set img src for data-id tuong ung
                            $(this).find('.avatar').attr('src', data.data[i].image);

                            // set alt src for data-id tuong ung
                            $(this).find('.avatar').attr('alt', data.data[i].name);

                            // set department src for data-id tuong ung
                            $(this).find('.avatar').attr('data-department', data.data[i].department);
                        }
                    });
                }

            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                console.log(errorMessage)
            }
        });
}




function fn_Checkin() {
    $.ajax(' https://appscyclone.com/xmas/index.php/api/list-checkin',
        {
            dataType: 'json', // type of response data
            success: function (data, status, xhr) {   // success callback function
                var data_checkin = data.data;
                var members = JSON.parse(localStorage.getItem('members'));

                data_checkin.forEach(e1 => {
                    members.forEach(e2 => {
                        if (e1.id == e2.id) {

                            $(".ball").each(function (index) {
                                if (e1.id == $(this).attr('data-id')) {
                                    // addClass active for item has data-id
                                    $(this).addClass('active');
                                }
                            });
                        }
                    });
                });

            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                console.log(errorMessage)
            }
        });

}

function fn_resetAll() {
    $.ajax('https://appscyclone.com/xmas/index.php/api/reset',
        {
            success: function (data, status, xhr) {   // success callback function
                console.log(data);

            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                console.log(errorMessage)
            }
        });
}

$('.checkin').click(function () {
    fn_Checkin()
})
$('.reset').click(function () {
    fn_resetAll()
})

$("#idForm").submit(function (e) {
    var form = $(this);
    var url = form.attr('action');
    console.log(form)

    $.ajax({
        type: "POST",
        url: 'https://appscyclone.com/xmas/index.php/api/checkin',
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            console.log(data); // show response from the php script.
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});


// $('.ball img').click(function(){
//     if ($(this).closest('.ball').hasClass('active')){
//         $(this).closest('.ball').removeClass('active')
//     }else{
//         $(this).closest('.ball').addClass('active')
//     }
// })




