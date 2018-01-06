// JavaScript Document
function loadData()
{
	param='proses=loadData';
	tujuan='kud_slave_daftarKepemilikan.php';
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
						//	alert(con.responseText);
							document.getElementById('result').innerHTML=con.responseText;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }  
	
}
