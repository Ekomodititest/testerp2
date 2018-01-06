function saveKelSup(){
	kodeorg	 = trim(document.getElementById('kodeorg').value);	
	kodeklp	 = trim(document.getElementById('kodeklp').value);	
	namakelompok	 = trim(document.getElementById('namakelompok').value);	
	//noakun	 = trim(document.getElementById('noakun').options[document.getElementById('noakun').selectedIndex].value);	
	method	 = document.getElementById('method').value;
	id	 = document.getElementById('id').value;
	act	 = document.getElementById('act').value;
	noakun = document.getElementById('noakun').value;
	param='kodeorg='+kodeorg+'&kodeklp='+kodeklp+'&namakelompok='+namakelompok+'&noakun='+noakun+'&method='+method+'&id='+id+'&act='+act;
	tujuan='log_slave_save_klkegiatan.php';

	if(kodeorg=='') {
		alert(document.getElementById('label_kodeorg').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}				
	else if(kodeklp==''){
		alert(document.getElementById('label_kodeklp').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}
	else if(namakelompok==''){
		alert(document.getElementById('label_namakelompok').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}
	
	else if(act==''){
		alert(document.getElementById('label_act').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}	
	else {
		if(confirm(document.getElementById('alertqinsert').value)){
		   post_response_text(tujuan, param, respog);
		}
	}
	
function respog(){
if(con.readyState==4){
		if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
						}
						else {
							alert(con.responseText);
							location.reload(true);
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
}	
}    
}

function cancelKelSup(){
	location.reload(true);
}

function delKlSupplier(id){
	param='id='+id+'&method=delete';
	tujuan='log_slave_save_klkegiatan.php';
	if(confirm(document.getElementById('alertqdelete').value)){
		post_response_text(tujuan, param, respog);	
	}
				
	function respog(){
	if(con.readyState==4){
	if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						alert(con.responseText);
						window.location.reload();	
					}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
	}	
	} 	
}

function editKlSupplier(id,kodeorg,kodeklp,namakelompok,noakun,act){	
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';		
	document.getElementById('method').value='update';
	document.getElementById('kodeorg').value=kodeorg;
	document.getElementById('kodeorg').disabled=true;	
	document.getElementById('kodeklp').value=kodeklp;	
	document.getElementById('kodeklp').disabled=true;	
	document.getElementById('namakelompok').value=namakelompok;			
	document.getElementById('noakun').value=noakun;	
	document.getElementById('id').value=id;	
	document.getElementById('act').value=act;	
}

function loadData(){
        param='method=refresh_data';
        tujuan = 'log_slave_save_klkegiatan.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
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

function cariBast(num){
		filter  = document.getElementById('filter').value;
		keyword = document.getElementById('keyword').value;
	
		param='method=refresh_data';
		param+='&page='+num;
		param+='&filter='+filter+'&keyword='+keyword;
		
		tujuan = 'log_slave_save_klkegiatan.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
				if (con.readyState == 4) {
					if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									alert('ERROR\n' + con.responseText);
							}
							else {
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

function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	document.getElementById('kodeorg').disabled=false;	
	document.getElementById('kodeklp').disabled=false;
}

function listdata(){
	document.getElementById('form').style.display = 'none';
	document.getElementById('listdata').style.display = '';
}

function search(){	
	filter  = document.getElementById('filter').value;
	keyword = document.getElementById('keyword').value;
	if(filter==''){
		document.getElementById('keyword').value='';
	} 
	else {
		if(keyword=='') {
			alert(document.getElementById('findword').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
	}

	param='filter='+filter+'&keyword='+keyword+'&method=refresh_data';
	tujuan = 'log_slave_save_klkegiatan.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		  if(con.readyState==4){
					if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
						}
						else {
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