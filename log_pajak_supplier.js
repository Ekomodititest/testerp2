function cancelPajak(){
	document.getElementById('supplier').value='';
	document.getElementById('namapajak').value='';
	document.getElementById('deskripsi').value='';
	document.getElementById('met').value='insert';	
}

function fillField(idpjksup, supplier,namapajak,deskripsi){
document.getElementById('form').style.display = '';
document.getElementById('listdata').style.display = 'none';	
supplier1=document.getElementById('supplier');
for(x=0;x<supplier1.length;x++){
if(supplier1.options[x].value==supplier){
supplier1.options[x].selected=true;
}
}	

namapajak1=document.getElementById('namapajak');
for(x=0;x<namapajak1.length;x++){
if(namapajak1.options[x].value==namapajak){
namapajak1.options[x].selected=true;
}
}
document.getElementById('deskripsi').value=deskripsi;
document.getElementById('idpjksup').value=idpjksup;
document.getElementById('met').value='update';
}

function simpanPajak(){
	idpjksup = document.getElementById('idpjksup').value;
	supplier = document.getElementById('supplier').value;
	namapajak = document.getElementById('namapajak').value;
	deskripsi = document.getElementById('deskripsi').value;
	met = document.getElementById('met').value;	
    
	param='idpjksup='+idpjksup+'&supplier='+supplier+'&namapajak='+namapajak+'&deskripsi='+deskripsi+'&method='+met;
	tujuan='setup_slave_save_pajak_supplier.php';
	
	if(supplier==''){
		alert(document.getElementById('supplier1').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(namapajak==''){
		alert(document.getElementById('namapajak1').innerHTML + ' ' + document.getElementById('alertrequired').value);
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
        tujuan = 'setup_slave_save_pajak_supplier.php';
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
		
		tujuan = 'setup_slave_save_pajak_supplier.php';
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

function hapus(idpjksup){
    method = 'delete';
    param  = 'idpjksup='+idpjksup+'&method='+method;
    tujuan = 'setup_slave_save_pajak_supplier.php';
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
	tujuan = 'setup_slave_save_pajak_supplier.php';
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