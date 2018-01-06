function saveAkunSupplier(){
	idbanksupplier = document.getElementById('idbanksupplier').value;
	kodesupplier = document.getElementById('kodesupplier').options[document.getElementById('kodesupplier').selectedIndex].value;
	kodebank 	 = document.getElementById('kodebank').options[document.getElementById('kodebank').selectedIndex].value;
	atasnama	 = document.getElementById('atasnama').value;
	norekening	 = document.getElementById('norekening').value;
	method		 = document.getElementById('method').value;
	cabang		 = document.getElementById('cabang').value;

	param='kodesupplier='+kodesupplier+'&kodebank='+kodebank+'&atasnama='+atasnama+'&norekening='+norekening+'&idbanksupplier='+idbanksupplier;
	param+='&method='+method+'&cabang='+cabang;
	tujuan='log_slave_save_supplier.php';
	
	if(kodesupplier==''){
		alert(document.getElementById('a1').innerHTML  + ' ' + document.getElementById('alertrequired').value);
	} 
	else if(kodebank==''){
		alert(document.getElementById('a2').innerHTML  + ' ' + document.getElementById('alertrequired').value);
	}
	else if(cabang==''){
		alert(document.getElementById('a5').innerHTML  + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(atasnama==''){
		alert(document.getElementById('a3').innerHTML  + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(norekening==''){
		alert(document.getElementById('a4').innerHTML  + ' ' + document.getElementById('alertrequired').value);
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

function cancelAkunSupplier(){
	document.getElementById('kodesupplier').value = '';
	document.getElementById('kodebank').value = '';
	document.getElementById('atasnama').value = '';
	document.getElementById('norekening').value = '';
	document.getElementById('cabang').value = '';
	document.getElementById('method').value = 'insertbank';
	document.getElementById('idbanksupplier').value =0;
}

function editSuppBank(idbanksupplier,kodesupplier,kodebank,atasnama,norekening,cabang){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';	
	document.getElementById('idbanksupplier').value =idbanksupplier;
	document.getElementById('kodesupplier').value = kodesupplier;
	document.getElementById('kodebank').value = kodebank;
	document.getElementById('atasnama').value = atasnama;
	document.getElementById('norekening').value = norekening;
	document.getElementById('cabang').value = cabang;
	document.getElementById('method').value = 'updatebank';	
}

function delBankSup(idbanksupplier){
    method = 'deletebank';
    param  = 'idbanksupplier='+idbanksupplier+'&method='+method;
    tujuan ='log_slave_save_supplier.php';
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

function loadData(){
        param='method=loadSupplier';
        tujuan = 'log_slave_save_supplier.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
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

function cariBast(num){
		filter  = document.getElementById('filter').value;
		keyword = document.getElementById('keyword').value;
	
		param='method=refresh_data';
		param+='&page='+num;
		param+='&filter='+filter+'&keyword='+keyword;
		
		tujuan = 'log_slave_save_supplier.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
				if (con.readyState == 4) {
					if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									alert('ERROR\n' + con.responseText);
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

function cariBastxxx(num){
		filter  = document.getElementById('filter').value;
		keyword = document.getElementById('keyword').value;
	
		param='method=loadSupplier';
		param+='&page='+num;
		param+='&filter='+filter+'&keyword='+keyword;
		
		tujuan = 'log_slave_save_supplier.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
				if (con.readyState == 4) {
					if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									alert('ERROR\n' + con.responseText);
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

function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	cancelAkunSupplier();
}

function listdata(){
	location.reload(true);
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

	param='filter='+filter+'&keyword='+keyword+'&method=loadSupplier';
	tujuan = 'log_slave_save_supplier.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		  if(con.readyState==4){
					if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
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

