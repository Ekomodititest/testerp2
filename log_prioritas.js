function cancelPrioritas(){
	document.getElementById('kode').value='';
	document.getElementById('nama').value='';
	document.getElementById('rate').value='';
	document.getElementById('minDuedate').value='';
	document.getElementById('minPQ').value='';	
	document.getElementById('met').value='insert';	
}

function fillField(prioritas_id,nama,minDuedate,minPQ,kode,rate){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';	
	document.getElementById('prioritas_id').value=prioritas_id;	
	document.getElementById('nama').value=nama;	
	document.getElementById('minDuedate').value=minDuedate;
	document.getElementById('minPQ').value=minPQ;	
	document.getElementById('kode').value=kode;	
	document.getElementById('rate').value=rate;	
	document.getElementById('met').value='update';
}

function simpanPrioritas(){
	prioritas_id = document.getElementById('prioritas_id').value;
	nama		 = document.getElementById('nama').value;
	minDuedate	 = document.getElementById('minDuedate').value;
	minPQ		 = document.getElementById('minPQ').value;	
	kode 		 = document.getElementById('kode').value;	
	rate		 = document.getElementById('rate').value;		
	met		     = document.getElementById('met').value;
    
	param='nama='+nama+'&minDuedate='+minDuedate+'&minPQ='+minPQ+'&prioritas_id='+prioritas_id+'&method='+met;
	param+='&kode='+kode+'&rate='+rate;
	tujuan='setup_slave_save_prioritas.php';
	
	if(kode==''){
		alert(document.getElementById('kode1').value + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(nama==''){
		alert(document.getElementById('nama1').value + ' ' + document.getElementById('alertrequired').value);
	} 	
	else if(rate==''){
		alert(document.getElementById('rate1').value + ' ' + document.getElementById('alertrequired').value);
	}
	else if(minDuedate==''){
		alert(document.getElementById('minhari1').value + ' ' + document.getElementById('alertrequired').value);
	}
	else if(minPQ==''){
		alert(document.getElementById('minpq1').value + ' ' + document.getElementById('alertrequired').value);
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

function loadData(){
        param='method=refresh_data';
        tujuan = 'setup_slave_save_prioritas.php';
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
		
		tujuan = 'setup_slave_save_prioritas.php';
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
}

function listdata(){
	document.getElementById('form').style.display = 'none';
	document.getElementById('listdata').style.display = '';
}