// JavaScript Document
function displayList()
{
	document.getElementById('txtsearch').value='';
	document.getElementById('tgl_cari').value='';
	loadData();
}
function loadData()
{
	param='proses=loadNewData';
	tujuan='kebun_3postingSPB_slave_save.php';
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
							//return;
							
							document.getElementById('contain').innerHTML=con.responseText;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 } 	
	
}
function cariSpb()
{
	txtSearch=document.getElementById('txtsearch').value;
	txtTgl=document.getElementById('tgl_cari').value;
	
	param='txtSearch='+txtSearch+'&txtTgl='+txtTgl+'&proses=cariNospb';
	//alert(param);
	tujuan = 'kebun_3postingSPB_slave_save.php';
	post_response_text(tujuan, param, respog);			
	function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('contain').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}
function cariBast(num)
{
		param='proses=loadNewData';
		param+='&page='+num;
		tujuan = 'kebun_3postingSPB_slave_save.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('contain').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}
function postingData(nospb)
{
	//alert("masuk Trip");
	noSpb=nospb;
	param='noSpb='+noSpb+'&proses=postingData';
	//alert(param);
	tujuan='kebun_3postingSPB_slave_save.php';
		if(confirm("Are You Sure Want Posting This Data!!"))
		{
			post_response_text(tujuan, param, respog);	
		}
		else
		{
			return;
		}
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						//document.getElementById('contain').innerHTML=con.responseText;		
						displayList();
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	

}