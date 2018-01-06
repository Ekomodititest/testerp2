function getCodeNumber(tipe){
	param='tipe='+tipe;
	tujuan='log_slave_get_klsupplier_number.php';
	post_response_text(tujuan, param, respog);
	function respog(){
	  if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
				}
				else {
					document.getElementById('kodespl').value=trim(con.responseText);
				}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
	}	
	}  	
}

function saveKelSup(){
	tipe	 = trim(document.getElementById('tipe').options[document.getElementById('tipe').selectedIndex].value);
	kodespl	 = trim(document.getElementById('kodespl').value);
	kelompok = trim(document.getElementById('kelompok').value);
	noakun	 = trim(document.getElementById('akun').options[document.getElementById('akun').selectedIndex].value);
	noakun1	 = trim(document.getElementById('akun1').options[document.getElementById('akun1').selectedIndex].value);
	noakun2	 = trim(document.getElementById('akun2').options[document.getElementById('akun2').selectedIndex].value);	
	method	 = document.getElementById('method').value;

	param='tipe='+tipe+'&kode='+kodespl+'&kelompok='+kelompok+'&noakun='+noakun+'&noakun1='+noakun1+'&noakun2='+noakun2+'&method='+method;
	tujuan='log_slave_save_klsupplier.php';

	if(tipe=='') {
		alert(document.getElementById('type').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}				
	else if(kelompok==''){
		alert(document.getElementById('namakelompok').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}
	else if(noakun==''){
		alert(document.getElementById('akunhutangsupp').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}
	else if(noakun1==''){
		alert(document.getElementById('akunaccrued').innerHTML + ' ' + document.getElementById('alertrequired').value);	
	}
	else if(noakun2==''){
		alert(document.getElementById('akunum').innerHTML + ' ' + document.getElementById('alertrequired').value);	
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

function getList(tipe){
	param='tipe='+tipe;
	tujuan='log_slave_save_klsupplier.php';
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

function cancelKelSup(){
	location.reload(true);
}

function delKlSupplier(kode){
	param='kode='+kode+'&method=delete';
	tujuan='log_slave_save_klsupplier.php';
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

function editKlSupplier(kode,kelompok,tipe,noakun,noakun1,noakun2){
		document.getElementById('form').style.display = '';
		document.getElementById('listdata').style.display = 'none';		
        document.getElementById('method').value='update';
        optTipe=document.getElementById('tipe');
        for(x=0;x<optTipe.length;x++){
                if(optTipe.options[x].value==tipe)
                   optTipe.options[x].selected=true;
        }
		optTipe.disabled = true;
        document.getElementById('kodespl').value=kode;
        document.getElementById('kelompok').value=kelompok;
        optAkun=document.getElementById('akun');
        for(x=0;x<optAkun.length;x++){
                if(optAkun.options[x].value==noakun)
                   optAkun.options[x].selected=true;		
        }
		
        optAkun1=document.getElementById('akun1');
        for(x=0;x<optAkun1.length;x++){
                if(optAkun1.options[x].value==noakun1)
                   optAkun1.options[x].selected=true;		
        }

        optAkun2=document.getElementById('akun2');
        for(x=0;x<optAkun2.length;x++){
                if(optAkun2.options[x].value==noakun2)
                   optAkun2.options[x].selected=true;		
        }		
}

function loadData(){
        param='method=refresh_data';
        tujuan = 'log_slave_save_klsupplier.php';
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
		
		tujuan = 'log_slave_save_klsupplier.php';
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
	document.getElementById('kelompok').value='';
	document.getElementById('akun').value='';
	document.getElementById('akun1').value='';
	document.getElementById('akun2').value='';
	document.getElementById('kodespl').value='';
	document.getElementById('tipe').options[0].selected=true;
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
	tujuan = 'log_slave_save_klsupplier.php';
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