// JavaScript Document



function bersih()
{
	
	/*document.getElementById('kdparam').value='';
	document.getElementById('nmparam').value='';
	document.getElementById('noakun').value='';
	document.getElementById('nmakun').value='';
	document.getElementById('kdparam').disabled=false;*/
}
function cancelSave()
{
	bersih();
	loadData();
}
function loadData()
{
	param='proses=LoadData';
	tujuan='setup_slave_5parameterinvoicein.php';
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
		param='proses=LoadData';
		param+='&page='+num;
		tujuan = 'setup_slave_5parameterinvoicein.php';
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

function saveData(passParam)
{
  var passP =  passParam.split('##');
    var param = "";
    for(i=1;i<passP.length;i++) {
        var tmp = document.getElementById(passP[i]);
        if(i==1) {
            param += passP[i]+"="+getValue(passP[i]);
        } else {
            param += "&"+passP[i]+"="+getValue(passP[i]);
        }
    }	
	//alert(param);
	pros=document.getElementById('proses').value;
	param+='&proses='+pros;
	tujuan='setup_slave_5parameterinvoicein.php';
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
							loadData();
							bersih();
							
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }  
}
function fillField(kdparam)
{
	kdparam=kdparam;
	param='kdparam='+kdparam+'&proses=showData';
	tujuan='setup_slave_5parameterinvoicein.php';
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
							//loadData();
							ar=con.responseText.split("###");
							document.getElementById('kdparam').value=ar[0];
							document.getElementById('nmparam').value=ar[1];
							document.getElementById('noakun').value=ar[2];
							document.getElementById('nmakun').value=ar[3];
							document.getElementById('proses').value='update';
							document.getElementById('kdparam').disabled=true;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }  

	
}
function deldata(kdparam)
{
	kdparam=kdparam;
	param='kdparam='+kdparam+'&proses=delData';
	//alert(param);
	tujuan='setup_slave_5parameterinvoicein.php';
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
							loadData();
							bersih();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }  
	 if(confirm("Are You Sure Want Delete This Data"))
	 	post_response_text(tujuan, param, respog);
}
function printPDF(kdorg,tgl,ev) {
    // Prep Param
	kdORg=kdorg;
	daTtgl=tgl;
	param='kdOrg='+kdORg+'&daTtgl='+daTtgl;
    param += "&proses=pdf";
    
    showDialog1('Print PDF',"<iframe frameborder=0 style='width:795px;height:400px'"+
        " src='kebun_curahHujanPdf.php?"+param+"'></iframe>",'800','400',ev);
    var dialog = document.getElementById('dynamic1');
    dialog.style.top = '50px';
    dialog.style.left = '15%';
}
