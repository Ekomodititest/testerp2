/**
 * @author Developer
 */
function simpanJ()
{
	jumlahhk=remove_comma(document.getElementById('jumlahhk'));
	sandibank=document.getElementById('sandibank').value;
	grup=document.getElementById('grup');
	grup=grup.options[grup.selectedIndex].value;	
	met=document.getElementById('method').value;
	if(jumlahhk=='' || grup=='')
	{
		alert('Each Field are obligatory');
	}
	else
	{
		param='method='+met;
		param+='&jumlahhk='+jumlahhk+'&grup='+grup+'&sandibank='+sandibank;
		tujuan='keu_slave_save_5akunbank.php';
        post_response_text(tujuan, param, respog);		
	}
	
	function respog()
	{
		      if(con.readyState==4)
		      {
			        if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR TRANSACTION,\n' + con.responseText);
						}
						else {
							//alert(con.responseText);
                                                        cancelJ();
							loadData();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }
		
}

function fillField(kelompok,nilai,sandibank)
{
	document.getElementById('jumlahhk').value=nilai;
	document.getElementById('sandibank').value=sandibank;
	grup=document.getElementById('grup');
	for(x=0;x<grup.length;x++)
	{
		if(grup.options[x].value==kelompok)
		{
			grup.options[x].selected=true;
		}
	}
	document.getElementById('method').value='update';
}

function cancelJ()
{
    
	document.getElementById('jumlahhk').value='';
	document.getElementById('sandibank').value='';
	grup=document.getElementById('grup');
	grup=grup.options[0].selected=true;
	document.getElementById('method').value='insert';		
}
function loadData()
{
        param='method=loadData'
        tujuan='keu_slave_save_5akunbank.php';
        post_response_text(tujuan, param, respog);
	

	function respog()
	{
		      if(con.readyState==4)
		      {
			        if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR TRANSACTION,\n' + con.responseText);
						}
						else {
							//alert(con.responseText);
							document.getElementById('container').innerHTML=con.responseText;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }
	 }
}

