function save(){
	organisasi = trim(document.getElementById('organisasi').options[document.getElementById('organisasi').selectedIndex].value);
	gudang	   = trim(document.getElementById('gudang').options[document.getElementById('gudang').selectedIndex].value);
	norak	   = trim(document.getElementById('norak').value);
	id	   = trim(document.getElementById('id').value);
	method	   = document.getElementById('method').value;

	param='organisasi='+organisasi+'&gudang='+gudang+'&norak='+norak+'&method='+method+'&id='+id;
	tujuan='log_slave_save_rak.php';

	if(organisasi=='') {
		alert(document.getElementById('lbl_organisasi').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}				
	else if(gudang==''){
		alert(document.getElementById('lbl_gudang').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}
	else if(norak==''){
		alert(document.getElementById('lbl_norak').innerHTML + ' ' + document.getElementById('alertrequired').value);	
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

function cancel(){
	location.reload(true);
}

function deleted(id){
	param='id='+id+'&method=delete';
	tujuan='log_slave_save_rak.php';
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

function edit(id,organisasi,gudang,norak){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';		
	document.getElementById('method').value='update';
	document.getElementById('id').value=id;
	document.getElementById('organisasi').value=organisasi;
	document.getElementById('gudang').value=gudang;
	document.getElementById('norak').value=norak;	
}

function loadData(){
        param='method=refresh_data';
        tujuan = 'log_slave_save_rak.php';
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
		
		tujuan = 'log_slave_save_rak.php';
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
	tujuan = 'log_slave_save_rak.php';
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

function getInduk(kodeorg){
		gudang = document.getElementById('gudang').value;
        param='gudang='+gudang+'&kodeorg='+kodeorg+'&method=filterinduk';
        tujuan='log_slave_save_rak.php';
        post_response_text(tujuan, param, respog);
        function respog(){
		  if(con.readyState==4){
					if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
						}
						else {
							document.getElementById('gudang').innerHTML=trim(con.responseText);
							document.getElementById('gudang').disabled = false;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		  }
        }
}