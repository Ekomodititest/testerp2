// JavaScript Document
function save_pil()
{
	document.getElementById('company_id').disabled=true;
	document.getElementById('period').disabled=true;
	document.getElementById('thp').disabled=true;
	
	cmpId=document.getElementById('company_id').value;
	period=document.getElementById('period').value;
	tahap=document.getElementById('thp').value;
	param='cmpId='+cmpId+'&period='+period+'&proses=GetData'+'&tahap='+tahap;
	//alert(param);
	tujuan='kud_slave_laporanPembayaranKomisi.php';
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
function ganti_pil()
{
	document.getElementById('company_id').disabled=false;
	document.getElementById('period').disabled=false;
	document.getElementById('contain').innerHTML='';
	document.getElementById('thp').disabled=false;
}
function dataKeExcel(ev,tujuan)
{
	cmpId=document.getElementById('company_id').value;
	period=document.getElementById('period').value;
	tahap=document.getElementById('thp').value;
	param='cmpId='+cmpId+'&period='+period+'&tahap='+tahap;
	judul='Report Ms.Excel';	
	alert(param);
	printFile(param,tujuan,judul,ev)	
}
function dataKePDF(ev)
{
	cmpId=document.getElementById('company_id').value;
	period=document.getElementById('period').value;
	tahap=document.getElementById('thp').value;
	param='cmpId='+cmpId+'&period='+period+'&proses=pdf'+'&tahap='+tahap;
	//alert(param);
	tujuan='kud_slavelaporanPembayaranKomisiPdf.php';
	judul='Report PDF';		
	
	//alert(param);
	printFile(param,tujuan,judul,ev)		
}
function printFile(param,tujuan,title,ev)
{
   tujuan=tujuan+"?"+param;  
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev); 	
}
function getThp()
{
	cmpId=document.getElementById('company_id').value;
	param='cmpId='+cmpId+'&proses=getTahap';
	tujuan='kud_slave_laporanPembayaranKomisi.php';
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
						document.getElementById('thp').innerHTML=con.responseText;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }  

	
}
