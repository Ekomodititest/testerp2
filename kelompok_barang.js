/**
 * @author Developer
 */
function fillField(kode,kelompok,kelompokbiaya,noakun,noakunbiaya){
		document.getElementById('form').style.display = '';
		document.getElementById('listdata').style.display = 'none';	
		
        kelnumber		= document.getElementById('kelnumber');
        kelnumber.value	= kode;
        kelname			= document.getElementById('kelname');
        kelname.value	= kelompok;        
        kelbiaya		= document.getElementById('kelompokbiaya');
        kelnumber.disabled = true;
        cat=0;
        for(x=0;x<kelbiaya.length;x++){
                if(kelbiaya.options[x].value==kelompokbiaya){
                        cat=x;
                }
        }
        kelbiaya.options[cat].selected = true;
        akun						   = document.getElementById('noakun');
        akun.value					   = noakun;
		
        akunbiaya					   = document.getElementById('noakunbiaya');
        akunbiaya.value			   = noakunbiaya;
        document.getElementById('method').value='update';
}

function cancelKelompokBarang(){
        document.getElementById('method').value='insert';
        document.getElementById('kelnumber').disabled=false;	
        document.getElementById('kelnumber').value='';	
        document.getElementById('kelname').value=''; 
		document.getElementById('kelompokbiaya').value=''; 	
        document.getElementById('noakun').value='';
}

function saveKelompokBarang(){
        tujuan	='log_slave_get_kelompok_barang.php';
        kode	= trim(document.getElementById('kelnumber').value);	
        nama	= trim(document.getElementById('kelname').value);      
        noakun  = trim(document.getElementById('noakun').value);
		noakunbiaya  = trim(document.getElementById('noakunbiaya').value);
        method	= document.getElementById('method').value;
        kelbiaya=document.getElementById('kelompokbiaya');
        kelbiaya=kelbiaya.options[kelbiaya.selectedIndex].value;        
		param='kode='+kode+'&nama='+nama+'&noakun='+noakun+'&noakunbiaya='+noakunbiaya;
        param+='&method='+method+'&kelbiaya='+kelbiaya;
		
        if(kode=='') {
			alert(document.getElementById('akode').value + " " + document.getElementById('alertrequired').value);			 
		} 
		else if(nama=='') {
			alert(document.getElementById('anamakelompok').value);
		}
		else if(kelbiaya== ''){
			alert(document.getElementById('akelompokbiaya').value);
		}		
		else {
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
							//document.getElementById('container').innerHTML=con.responseText;
							alert(document.getElementById('alertinsert').value);
							location.reload(true);
							//cancelKelompokBarang();
                        }
                }
                else {
					busy_off();
					error_catch(con.status);
				}
                }	
         }  	

}

function delKelompok(kode,nama){
  tujuan='log_slave_get_kelompok_barang.php';
  param='kode='+kode+'&nama='+nama+'&method=delete';
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
						alert(document.getElementById('alertdelete').value);
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
	tujuan = 'log_slave_get_kelompok_barang.php';
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

function loadData(){
        param='method=refresh_data';
        tujuan = 'log_slave_get_kelompok_barang.php';
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
		tujuan = 'log_slave_get_kelompok_barang.php';
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