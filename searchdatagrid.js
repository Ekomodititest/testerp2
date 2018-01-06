/* Can't remember where I saw this but it's quite handy/cool for tables to do filtering without posts */
$(document).ready(function(){
//add index column with all content.
    $("#filterable tr:has(td)").each(function(){
        var t = $(this).text().toLowerCase(); //all row text
        $("<td class='indexColumn'></td>")
            .hide().text(t).appendTo(this);
    });//each tr
    $("#FilterTextBox").keyup(function(){
    var s = $(this).val().toLowerCase().split(" ");
        //show all rows.
        $("#filterable tr:hidden").show();
        $.each(s, function(){
            $("#filterable tr:visible .indexColumn:not(:contains('"
                + this + "'))").parent().hide();
        });//each
    });//key up.
});//document.ready
