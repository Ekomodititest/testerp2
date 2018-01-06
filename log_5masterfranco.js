function saveFranco() {
nmFranco   = document.getElementById('nmFranco').value; 
almtFranco = document.getElementById('almtFranco').value; 
cntcPerson = document.getElementById('cntcPerson').value; 
hdnPhn	   = document.getElementById('hdnPhn').value; 
email	   = document.getElementById('email').value; 
statFr	   = document.getElementById('statFr').value; 
method	   = document.getElementById('method').value; 
idFranco   = document.getElementById('idFranco').value; 

param = 'nmFranco='+nmFranco+'&almtFranco='+almtFranco+'&cntcPerson='+cntcPerson+'&hdnPhn='+hdnPhn;
param += '&email='+email+'&statFr='+statFr+'&method='+method+'&idFranco='+idFranco;
tujuan='log_slave_5masterfranco.php';

	if(nmFranco=='') {
		alert(document.getElementById('a1').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}
	else if(almtFranco==''){
		alert(document.getElementById('a2').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}
	else if(cntcPerson==''){
		alert(document.getElementById('a3').innerHTML + ' ' + document.getElementById('alertrequired').value);
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
	param='method=loadData';
	tujuan='log_slave_5masterfranco';
    post_response_text(tujuan+'.php', param, respon);
	function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR\n' + con.responseText);
                } else {
					  document.getElementById('container').innerHTML=con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }	
}

function fillField(id_franco,franco_name,alamat,contact,handphone,email,stat){	
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	param='method=getData'+'&idFranco='+id_franco;
	tujuan='log_slave_5masterfranco';
    post_response_text(tujuan+'.php', param, respon);
	function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR\n' + con.responseText);
                } else {
					ar=con.responseText.split("###");
					document.getElementById('idFranco').value=id_franco;
					document.getElementById('nmFranco').value=franco_name;
					document.getElementById('almtFranco').value=alamat;
					document.getElementById('cntcPerson').value=contact;
					document.getElementById('hdnPhn').value=handphone;
					document.getElementById('method').value="update";
					document.getElementById('email').value=email;
					document.getElementById('statFr').value=stat;
					document.getElementById('nmFranco').disabled=true;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }

}

function cancelIsi(){
	location.reload(true);
}

function delData(idFr){
	param='method=delData'+'&idFranco='+idFr;
	tujuan='log_slave_5masterfranco';
	if(confirm(document.getElementById('alertqdelete').value)){
		post_response_text(tujuan+'.php', param, respon);
	}
	function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR\n' + con.responseText);
                } else {
					location.reload(true);
                }
            } else {
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

function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	document.getElementById('nmFranco').value='';
	document.getElementById('almtFranco').value='';
	document.getElementById('cntcPerson').value='';
	document.getElementById('hdnPhn').value='';
	document.getElementById('email').value='';
	document.getElementById('statFr').value='';	
	document.getElementById('method').value='insert';	
	document.getElementById('nmFranco').disabled = false;
}

function listdata(){
	location.reload(true);
}

function cariBast(num){
		filter  = document.getElementById('filter').value;
		keyword = document.getElementById('keyword').value;
	
		param='method=loadData';
		param+='&page='+num;
		param+='&filter='+filter+'&keyword='+keyword;
		
		tujuan = 'log_slave_5masterfranco.php';
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

	param='filter='+filter+'&keyword='+keyword+'&method=loadData';
	tujuan = 'log_slave_5masterfranco.php';
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
