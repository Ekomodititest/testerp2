function cancelPajak(){
	document.getElementById('tipe').value='';
	document.getElementById('kode').value='';
	document.getElementById('nama').value='';
	document.getElementById('desc').value='';
	document.getElementById('rate').value='';	
	document.getElementById('akunmasuk').value='';	
	document.getElementById('akunbiaya').value='';	
	document.getElementById('met').value='insert';	
}

function fillField(tipe,kode,nama,desc,rate,akunmasuk,akunbiaya){
tipe1=document.getElementById('tipe');
for(x=0;x<tipe1.length;x++){
if(tipe1.options[x].value==tipe){
tipe1.options[x].selected=true;
}
}	
	document.getElementById('kode').value=kode;
	document.getElementById('nama').value=nama;
	document.getElementById('desc').value=desc;
	document.getElementById('rate').value=rate;	
	document.getElementById('akunmasuk').value=akunmasuk;	
	document.getElementById('akunbiaya').value=akunbiaya;	
	document.getElementById('met').value='update';
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';	
}

function simpanPajak(){
	tipe = document.getElementById('tipe').value;
	kode = document.getElementById('kode').value;
	nama = document.getElementById('nama').value;
	desc = document.getElementById('desc').value;
	rate = document.getElementById('rate').value;	
	akunmasuk = document.getElementById('akunmasuk').value;	
	akunbiaya = document.getElementById('akunbiaya').value;	
	met = document.getElementById('met').value;	
    
	param='tipe='+tipe+'&kode='+kode+'&nama='+nama+'&desc='+desc+'&rate='+rate+'&akunmasuk='+akunmasuk+'&akunbiaya='+akunbiaya+'&method='+met;
	tujuan='setup_slave_save_pajak.php';
	
	if(tipe==''){
		alert(document.getElementById('tipe1').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(kode==''){
		alert(document.getElementById('kode1').innerHTML + ' ' + document.getElementById('alertrequired').value);
	} 	
	else if(nama==''){
		alert(document.getElementById('nama1').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}
	else if(rate==''){
		alert(document.getElementById('rate1').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}
	else if(akunmasuk==''){
		alert(document.getElementById('akunmasuk1').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}
	else if(akunbiaya==''){
		alert(document.getElementById('akunbiaya1').innerHTML + ' ' + document.getElementById('alertrequired').value);
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
        tujuan = 'setup_slave_save_pajak.php';
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
		param='method=refresh_data';
		param+='&page='+num;
		tujuan = 'setup_slave_save_pajak.php';
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

function hapus(kode){
    method = 'delete';
    param  = 'kode='+kode+'&method='+method;
    tujuan ='setup_slave_save_pajak.php';
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