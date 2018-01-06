function getKelompokSupplier(tipe){
	kdkelompok = document.getElementById('kdkelompok').value;
	param='tipe='+tipe+'&kdkelompok='+kdkelompok;
	tujuan='log_slave_get_klsupplier.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		  if(con.readyState==4){
					if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
											alert('ERROR\n' + con.responseText);
									}
									else {
										document.getElementById("kdkelompok").disabled = false;
										document.getElementById('kdkelompok').innerHTML=trim(con.responseText);	
									}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
		  }	
	 }  	
}

function getSupplierNumber(kdkelompok,namakelompok){
	param='kelompok='+kdkelompok;
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
							document.getElementById('idsupplier').value=trim(con.responseText);
							getSupplierList(kdkelompok);
						}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
				}	
	 }  	
}

function getSupplierList(kdkelompok){
	param='kelompok='+kdkelompok;
	tujuan='log_slave_save_supplier.php';
	post_response_text(tujuan, param, respog);

    function respog(){
		  if(con.readyState==4){
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
					}
					else {
						
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
		  }	
	} 	
}

function cancelSupplier(){
   document.getElementById('tipe').options[0].selected=true;
   document.getElementById('telp').value='';
   document.getElementById('kdkelompok').options[0].selected=true;
   document.getElementById('fax').value='';
   document.getElementById('idsupplier').value='';
   document.getElementById('email').value='';
   document.getElementById('namasupplier').value='';
   document.getElementById('npwp').value='';
   document.getElementById('alamat').value='';
   document.getElementById('cperson').value='';
   document.getElementById('kota').value='';
   document.getElementById('plafon').value='0';
   document.getElementById('method').value='insert';
   document.getElementById('tipe').disabled=false;
   document.getElementById('kdkelompok').disabled=false;
   document.getElementById('linkdoc').value='';
}

function saveSupplier(){
	tipe = document.getElementById('tipe').value;
	kelompok = document.getElementById('kdkelompok').options[document.getElementById('kdkelompok').selectedIndex].value;
	stat 	 = 1; 	
	namasupplier = document.getElementById('namasupplier').value;		
	alamat=document.getElementById('alamat').value;
	kota=document.getElementById('kota').value;
	telp=document.getElementById('telp').value;		
	cperson=document.getElementById('cperson').value;
	noakun = '';
	plafon= 0;//remove_comma(document.getElementById('plafon'));		
	nilaihutang = 0;
	npwp=document.getElementById('npwp').value;	
	noseripajak = '';		
	idsupplier=trim(document.getElementById('idsupplier').value);
	kodetimbangan = '';
	akunpajak = '';
	bank = '';
	rekening = '';
	an = '';		
	fax=document.getElementById('fax').value;           
	email=document.getElementById('email').value;           	   
	pkp=document.getElementById('pkp').options[document.getElementById('pkp').selectedIndex].value;	     	   
	method=document.getElementById('method').value;
	linkdoc=document.getElementById('linkdoc').value;
	
	param='kelompok='+kelompok+'&stat='+stat+'&namasupplier='+namasupplier;
	param+='&alamat='+alamat+'&kota='+kota+'&telp='+telp;
	param+='&cperson='+cperson+'&noakun='+noakun+'&plafon='+plafon;
	param+='&nilaihutang='+nilaihutang+'&npwp='+npwp+'&noseripajak='+noseripajak;
	param+='&idsupplier='+idsupplier+'&kodetimbangan='+kodetimbangan+'&akunpajak='+akunpajak;
	param+='&bank='+bank+'&rekening='+rekening+'&an='+an;
	param+='&fax='+fax+'&email='+email+'&pkp='+pkp+'&method='+method;
	param+='&linkdoc='+linkdoc;
	tujuan='log_slave_save_supplier.php';
	
	if(document.getElementById('tipe').value ==''){
		alert(document.getElementById('atype').innerHTML  + ' ' + document.getElementById('alertrequired').value);
	}                
	else if(kelompok=='') {
		alert(document.getElementById('akodekelompok').innerHTML  + ' ' + document.getElementById('alertrequired').value);						
	}     
	else if(namasupplier=='') {
		alert(document.getElementById('anamasupplier').innerHTML  + ' ' + document.getElementById('alertrequired').value);		
	}                
	else if(alamat=='') {
		alert(document.getElementById('aalamat').innerHTML  + ' ' + document.getElementById('alertrequired').value);		
	}                
	else if(kota=='') {
		alert(document.getElementById('akota').innerHTML  + ' ' + document.getElementById('alertrequired').value);		
	}       
	else if(telp=='') {
		alert(document.getElementById('atelp').innerHTML  + ' ' + document.getElementById('alertrequired').value);		
	}      
	else if(pkp=='') {
		alert('PKP ' + document.getElementById('alertrequired').value);		
	}                       
	else if(npwp=='' && pkp==1) {
		alert(document.getElementById('anpwp').innerHTML  + ' ' + document.getElementById('alertrequired').value);							
	}		
	else if(cperson=='') {
		alert(document.getElementById('acperson').innerHTML  + ' ' + document.getElementById('alertrequired').value);		
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

function editSupplier(idsupplier,namasupplier,alamat,kontakperson,kota,telp,fax,email,npwp,plafon,kdkelompok,pkp,linkdoc){		   	
     	   document.getElementById('form').style.display = '';
		   document.getElementById('listdata').style.display = 'none';		
           objtipe=document.getElementById('tipe');
           tipe=idsupplier.substring(0,1);
           if(tipe=='S')
             tipe='SUPPLIER';
           else
             tipe='KONTRAKTOR';
           for(x=0;x<objtipe.length;x++)
           {
                 if(objtipe.options[x].value==tipe)
                 {
                        objtipe.options[x].selected=true;
                 }
           }
           objtipe.disabled=true;
		   
		   //getKelompokSupplier(objtipe.value);	
           objkelompok=document.getElementById('kdkelompok');	
           for(x=0;x<objkelompok.length;x++){
			  if(objkelompok.options[x].value==kdkelompok){
					objkelompok.options[x].selected=true;
			  }
           }   
		   objkelompok.disabled=true;	
		   	
           objpkp=document.getElementById('pkp');	
           for(x=0;x<objpkp.length;x++){
			  if(objpkp.options[x].value==pkp){
					objpkp.options[x].selected=true;
			  }
           }   		   
		   
	if(document.getElementById('pkp').value==1) {
		document.getElementById("obl").style.display = "";
	} 
	else {
		document.getElementById("obl").style.display = "none";
	}		   
	   document.getElementById('telp').value=telp;
	   document.getElementById('fax').value=fax;
	   document.getElementById('email').value=email;
	   document.getElementById('namasupplier').value=namasupplier;
	   document.getElementById('npwp').value=npwp;
	   document.getElementById('alamat').value=alamat;
	   document.getElementById('cperson').value=kontakperson;
	   document.getElementById('kota').value=kota;
	   document.getElementById('plafon').value=plafon;
	   document.getElementById('method').value='update';
	   document.getElementById('idsupplier').value=idsupplier;
	   document.getElementById('linkdoc').value=linkdoc;
	   change_number(document.getElementById('plafon'));	   		   
}

function delSupplier(id,nama){
tujuan='log_slave_save_supplier.php';
param='idsupplier='+id+'&method=delete';
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
//========================================================sisi akunting

function findSupplier(){
	txt=trim(document.getElementById('cari').value);
	param='method=loaddata&txt='+txt;
	tujuan = 'log_slave_save_akun_supplier.php';
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

function editAkunSupplier(supplierid,namasupplier,noakun,nilaihutang,noseripajak,akunpajak,bank,rekening,an){	
          document.getElementById('idsupplier').value	=supplierid;
          document.getElementById('bank').value			=bank;
          obj=document.getElementById('noakun');
          for(x=0;x<obj.length;x++){
            if(obj.options[x].value==noakun)
                   obj.options[x].selected=true;
          }
          document.getElementById('rek').value			=rekening;
          document.getElementById('namasupplier').value	=namasupplier;
          document.getElementById('an').value			=an;

          obj1=document.getElementById('akunpajak');
          for(x=0;x<obj1.length;x++){
            if(obj1.options[x].value==akunpajak)
                   obj1.options[x].selected=true;
          }

          document.getElementById('noseripajak').value	=noseripajak;
          document.getElementById('nilaihutang').value	=nilaihutang;
		  document.getElementById("formedit").style.display = "block";
}

function cancelAkunSupplier(){
	  document.getElementById('idsupplier').value	='';
	  document.getElementById('bank').value			='';
	  obj=document.getElementById('noakun');
	  obj.options[0].selected=true;
	  document.getElementById('rek').value			='';
	  document.getElementById('namasupplier').value	='';
	  document.getElementById('an').value			='';
	  obj1=document.getElementById('akunpajak');
	  obj1.options[0].selected=true;
	  document.getElementById('noseripajak').value	='';
	  document.getElementById('nilaihutang').value	='0';		
}

function saveAkunSupplier(){
	 obj1		=document.getElementById('akunpajak');
	 akunpajak	=obj1.options[obj1.selectedIndex].value;
	 obj	=document.getElementById('noakun');	
	 noakun=obj.value;//obj.options[obj.selectedIndex].value;  
	 idsupplier=trim(document.getElementById('idsupplier').value);
	 bank		=trim(document.getElementById('bank').value);
	 rek		=trim(document.getElementById('rek').value);
	 namasupplier	=trim(document.getElementById('namasupplier').value);
	 an			=trim(document.getElementById('an').value);
	 noseripajak	=trim(document.getElementById('noseripajak').value);
	 nilaihutang	=remove_comma(document.getElementById('nilaihutang'));	
	 param='noakun='+noakun+'&akunpajak='+akunpajak;
	 param+='&idsupplier='+idsupplier+'&an='+an+'&bank='+bank;
	 param+='&rek='+rek+'&namasupplier='+namasupplier;
	 param+='&noseripajak='+noseripajak+'&nilaihutang='+nilaihutang;
	 param+='&method=update';
	 if(idsupplier==''){
		  alert(document.getElementById('supplierid').value + ' ' + document.getElementById('alertrequired').value);
	 } 
	 else if(noakun==''){
		  alert(document.getElementById('anoakun').value + ' ' + document.getElementById('alertrequired').value);
	 } 
	 else if(bank==''){
		  alert(document.getElementById('abang').value + ' ' + document.getElementById('alertrequired').value);
	 }		 
	 else if(rek==''){
		  alert(document.getElementById('arek').value + ' ' + document.getElementById('alertrequired').value);
	 }		 
	 else{
			tujuan='log_slave_save_akun_supplier.php';
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

function updateStatus(notrans,stat){
param='method=updStatus'+'&supplierid='+notrans+'&status='+stat;	
tujuan='log_slave_save_supplier.php';
if(stat==1){
	dert= document.getElementById('tidakaktif').value + ' ?';
}
else{
	dert= document.getElementById('aktif').value + ' ? ';
}

if(confirm(dert)){
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
		   kdkelompok=notrans.substring(0,4);
		   getSupplierList(kdkelompok);
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

function cekemail(){
	var email=document.getElementById('email').value;
	if(email!=''){
		if ((email.indexOf('@',0)==-1) || (email.indexOf('.',0)==-1)){ 
			alert("invalid email");  
		} 
		else {
			document.getElementById('save').disabled = false;
		}		
	} 
	else {
		document.getElementById('save').disabled = false;
	}
}

function pilihpkp(){
	if(document.getElementById('pkp').value==1) {
		document.getElementById("obl").style.display = "";
	} 
	else {
		document.getElementById("obl").style.display = "none";
	}	
}

function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	cancelSupplier();
}

function listdata(){
	document.getElementById('form').style.display = 'none';
	document.getElementById('listdata').style.display = '';
}

function loadData(){
        param='method=refresh_data';
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