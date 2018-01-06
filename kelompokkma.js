

function saveKegiatan(){
	tipekegiatan = trim(document.getElementById('plihkegiatankma').value);
	kode = trim(document.getElementById('kode').value);
	nama = trim(document.getElementById('nama').value);
	method	 = document.getElementById('method').value;

	
	if(tipekegiatan=='') {
		alert(document.getElementById('plihkegiatankma').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}				
	else if(kode==''){
		alert(document.getElementById('kode').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}
	else if(nama==''){
		alert(document.getElementById('nama').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}	
	else {
		if(confirm(document.getElementById('alertqinsert').value)){
		   param='tipe='+tipekegiatan+'&kode='+kode+'&nama='+nama+'&method='+method;
		   tujuan='traksi_slave_5kegiatanKMA.php';
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

function getList(tipe){
	param='tipe='+tipe;
	tujuan='traksi_slave_5kegiatanKMA.php';
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

function cancelKegiatan(){
	location.reload(true);
}

function resetKegiatan(){
	document.getElementById('kode').value='';
	document.getElementById('nama').value='';
	document.getElementById(kegiatankma).options[0].selected=true;
}

function delkegiatan(tipe,kode){
	param='kode='+kode+'&tipe='+tipe+'&method=delete';
	tujuan='traksi_slave_5kegiatanKMA.php';
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

function editkegiatan(tipe,kode,nama){
		document.getElementById('form').style.display = '';
		document.getElementById('listdata').style.display = 'none';		
        document.getElementById('method').value='update';
        optTipe=document.getElementById('plihkegiatankma');
        for(x=0;x<optTipe.length;x++){
                if(optTipe.options[x].value==tipe)
                   optTipe.options[x].selected=true;
        }
		optTipe.disabled = true;
        document.getElementById('kode').value=kode;
        document.getElementById('nama').value=nama;
       	
}

function loadData(){
        param='method=refresh_data';
        tujuan = 'traksi_slave_5kegiatanKMA.php';
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
		
		tujuan = 'traksi_slave_5kegiatanKMA.php';
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
	document.getElementById('kode').value='';
	document.getElementById('nama').value='';
	document.getElementById(kegiatankma).options[0].selected=true;
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
	tujuan = 'traksi_slave_5kegiatanKMA.php';
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