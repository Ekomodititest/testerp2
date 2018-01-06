function save(){
	satuan	 = trim(document.getElementById('satuan').value);
	method	 = document.getElementById('method').value;

	param='satuan='+satuan+'&method='+method;
	tujuan='log_slave_get_satuan.php';

	if(satuan=='') {
		alert(document.getElementById('label_satuan').innerHTML + ' ' + document.getElementById('alertrequired').value);
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
	tujuan='log_slave_get_satuan.php';
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

function editKlSupplier(id,satuan){
		document.getElementById('form').style.display = '';
		document.getElementById('listdata').style.display = 'none';		
        document.getElementById('satuan').value=satuan;
        document.getElementById('id').value=id;
		
}

function loadData(){
        param='method=refresh_data';
        tujuan = 'log_slave_get_satuan.php';
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
		
		tujuan = 'log_slave_get_satuan.php';
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
	tujuan = 'log_slave_get_satuan.php';
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