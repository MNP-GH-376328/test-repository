$(window).on('load', function () {
    $(".loaderColor").show();

   // accessibility_Checkuser();
    loadsts();

    usr = $("[id*=hdUserId]").val('');



});
function accessibility_Checkuser(usr) {

    usr = $("[id*=hdUserId]").val();



    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "BRDstsdashbrd.aspx/getaccess",
        data: "{pageVal:'Baaccess', pageval1:'" + usr + "',pageval2:''}",
        dataType: "json",
        async: false,
        success: function (Result) {
            Result = Result.d;

            if (Result == '1') { accessility = 1; $("#showContents").show(); $("#rmkShow").hide(); $("#developerShow").hide(); $("#attachments").hide(); }//ba
            else if (Result == '222') {
                alert("You are not authorized to view this page!");

                window.open('index.aspx', '_self');
                return false;
            }
        }

    });

}

function loadsts() {

    usr = $("[id*=hdUserId]").val();

    $("#tbl_Task_List").empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "BRDstsdashbrd.aspx/getcrfsts",
        data: "{pageVal:'bacrfdata', pageval1 :'" + usr + "', pageval2 :''}",

        dataType: "json",
        success: function (Result) {
            Result = Result.d;


            if ($("#tbl_Task_List tr").length == 0) {

                $("#tbl_Task_List").empty();
                $('#tbl_Task_List').append('<tr class="bg-primary text-" style="text-align:center;background-color:white;">' +
                    '<th style="width:40px;text-align:center;color:white;"> Project Stage </th>' +
                    '<th style="width:40px;text-align:center;color:white;"> No.of Project </th>' +
                    '<th style="width:40px;text-align:center;color:white;"> Delay </th>' +
                    '<th style="width:40px;text-align:center;color:white;"> 1 to 5 Days Delay </th>' +
                    '<th style="width:40px;text-align:center;color:white;"> 6 to 10 days Delay </th>' +
                    '<th style="width:40px;text-align:center;color:white;"> Above 10 days </th>');





            }
            var valData;
            valData = Result.split('~');


            for (i = 0; i < valData.length - 1; i++) {

                valData1 = valData[i].split('^');


                $('#tbl_Task_List').append(`
                            <tbody>
                             <tr>

                               
                                <td class="text-center"> ${valData1[0]}</td>
                                <td class="text-center"><a href="#"> ${valData1[1]}  </td>
                                <td class="text-center"><a href="#">  ${valData1[2]}  </td>
                                <td class="text-center"><a href="#">  ${valData1[3]}  </td>
                                <td class="text-center"><a href="#">  ${valData1[4]}  </td>
                                <td class="text-center"><a href="#">  ${valData1[5]}  </td>
                             </tr>
                            </tbody>
                        `);


            }



        }

    });
}



function report() {
    
    var row;
    var column_num;
    $('#tbl_Task_List').find('tr').click(function () {
        row = $(this).find('td:eq(0)').text();
        if (row != "") datass = row;
    });
    $('#tbl_Task_List tbody').on('click', 'td', function () {
        column_num = parseInt($(this).index());
        if (column_num != "") datass = datass + "~" + column_num;
        else datass = datass + "~0";
    });
    if (datass == "1" || datass.includes("~0")) {
        return false;
    }
    else if (datass.includes("LIVE & CLOSED")) {
        to_SearchWindow(datass.replace('&', 'AND'));
    }
    else to_SearchWindow(datass);
}


function to_SearchWindow(dtls) {

    window.open("brdsts_report.aspx?mnuId=" + dtls + "", '_self');
}

