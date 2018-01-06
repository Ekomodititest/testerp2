/**
 * @author Developer
 */
function simpanPlafon()
{
	kodegolongan=document.getElementById('kodegolongan').value;
	persen=document.getElementById('prsn').value;
	pagu=document.getElementById('pagu').value;
	jangkawaktu=document.getElementById('jangkawaktu').value;
	met=document.getElementById('method').value;
	datatdklkp=document.getElementById('datatdklkp').value;
	jenisbiaya=document.getElementById('jenisbiaya');
	jenisbiaya=jenisbiaya.options[jenisbiaya.selectedIndex].value;
	if(trim(kodegolongan)==''|| trim(jenisbiaya)==''|| trim(persen)==''|| trim(pagu)==''|| trim(jangkawaktu)=='')
	{
		alert(datatdklkp);
		//document.getElementById('kodegolongan').focus();
	}
	
	

	else
	{
		kodegolongan=trim(kodegolongan);
		persen=trim(persen);
		param='kodegolongan='+kodegolongan+'&persen='+persen+'&method='+met+'&jenisbiaya='+jenisbiaya+'&pagu='+pagu+'&jangkawaktu='+jangkawaktu;
		tujuan='sdm_slave_save_setup_plafond.php';
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
							document.getElementById('container').innerHTML=con.responseText;
							cancelPlafon();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }
		
}

function delPlafon(kode,jenisbiaya){
	alertdel = document.getElementById('alertdel').value;
	kode=trim(kode);
	param='kodegolongan='+kode+'&method=delete'+'&jenisbiaya='+jenisbiaya;
	tujuan='sdm_slave_save_setup_plafond.php';
	if (confirm(alertdel)) 
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
							cancelPlafon();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
				}	
	 }
	
}

function fillField(kode,persen,jenisbiaya,pagu,jangkawaktu)
{
	x=document.getElementById('kodegolongan');
	for(z=0;z<x.length;z++)
	{
		if(x.options[z].value==kode)
		x.options[z].selected=true;
	}
    document.getElementById('kodegolongan').disabled=true;
	x=document.getElementById('jenisbiaya');
	for(z=0;z<x.length;z++)
	{
		if(x.options[z].value==jenisbiaya)
		x.options[z].selected=true;
	}
    document.getElementById('jenisbiaya').disabled=true;	
	document.getElementById('prsn').value=persen;
	document.getElementById('pagu').value=pagu;
	document.getElementById('jangkawaktu').value=jangkawaktu;
	document.getElementById('method').value='update';
}

function cancelPlafon()
{
    document.getElementById('kodegolongan').disabled=false;
	document.getElementById('kodegolongan').value='';
    document.getElementById('jenisbiaya').disabled=false;
	document.getElementById('jenisbiaya').value='';	
	document.getElementById('prsn').value='';
	document.getElementById('pagu').value='';
	document.getElementById('jangkawaktu').value='';
	document.getElementById('method').value='insert';		
}
