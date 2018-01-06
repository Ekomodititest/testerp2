function DisplayList(){
	Method = 'LoadData';
	tanggaldibuatsrch = trim(document.getElementById('tanggaldibuatsrch').value);
	tanggalsdsrch = trim(document.getElementById('tanggalsdsrch').value);
	noposrch = trim(document.getElementById('noposrch').value);
	notutuppaksa = trim(document.getElementById('notutuppaksa').value);
	
	param ='method='+Method+'&tanggaldibuatsrch='+tanggaldibuatsrch+'&tanggalsdsrch='+tanggalsdsrch;
	param+= '&noposrch='+noposrch+'&notutuppaksa='+notutuppaksa;
	tujuan='log_slave_get_daftar_tutup_paksa_po.php';
	
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					document.getElementById('ListContainer').innerHTML=con.responseText;
					document.getElementById('ViewListHeader').style.display='block';
					document.getElementById('ViewDetail').style.display='none';
					document.getElementById('ButtonKembali').style.display='none';
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}          
}

function CariNoPo(title,ev){
	content= "<div>";
	content+="<fieldset>No PO <input type=text id=nopopopup class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=CariNoPoGo()>Cari</button></fieldset>";
	content+="<div id=containerpopupsrch style=\"height:400px;width:600px;overflow:scroll;\">";
	content+="</div></div>";
	title=title;
	width='600';
	height='440';
	showDialog1('Cari No PO',content,width,height,ev);
}

function CariNoPoGo(){
	Method 	= 'CariNoPo';
	nopopopup = document.getElementById('nopopopup').value;
	
	param  = 'method='+Method+'&nopopopup='+nopopopup;
	tujuan = 'log_slave_get_daftar_tutup_paksa_po.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('containerpopupsrch').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function CariNoPoPick(nopo){
	NoPO = document.getElementById('list_'+nopo).value;
	document.getElementById('noposrch').value = NoPO;
	closeDialog();
}

function Cari(Type,Id,ev){
	content= "<div>";
	content+="<fieldset>No "+Type+" <input type=text id="+Type+"popup class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25>";
	content+="<button class=mybutton onclick=CariGo('"+Type+"','"+Id+"')>Cari</button></fieldset>";
	content+="<div id=container"+Type+"popupsrch style=\"height:400px;width:600px;overflow:scroll;\">";
	content+="</div></div>";
	width='600';
	height='440';
	showDialog1('Cari '+Type,content,width,height,ev);
}

function CariGo(Type,Id){
	Method 	= 'Cari'+Type;
	ItemSearch = document.getElementById(Type+'popup').value;
	
	param  = 'method='+Method+'&itemsearch='+ItemSearch+'&idcari='+Id;
	tujuan = 'log_slave_get_daftar_tutup_paksa_po.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('container'+Type+'popupsrch').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function CariPick(no,Id){
	ItemPick = document.getElementById('list_item_'+no).value;
	document.getElementById(Id).value = ItemPick;
}

function DownloadExcel(){
	Method 	= 'DownloadExcel';
	ListData = document.getElementById('ListContainer').innerHTML;
	
	param  = 'method='+Method+'&listdata='+ListData+'&judul=Laporan';
	tujuan = 'log_slave_get_daftar_tutup_paksa_po.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('container'+Type+'popupsrch').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}

// GET FUNCTION //
function ShowDetail(NoTutupPaksa){
	Method = 'ShowDetail';
	
	param ='method='+Method+'&notutuppaksa='+NoTutupPaksa;
	tujuan='log_slave_get_daftar_tutup_paksa_po.php';
	
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					document.getElementById('ViewListHeader').style.display='none';
					document.getElementById('ViewDetail').style.display='block';
					document.getElementById('ButtonKembali').style.display='block';
					document.getElementById('ListDetail').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}
}

// VIEW FUNCTION //
function PopUpSearchItem(title, method, ev){
	content= "<div>";
	content+="<fieldset>"+title+" <input type=text id=textsearch class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=CariPopUpSearchItem('"+method+"')>Cari</button></fieldset>";
	content+="<div id=containeritem style=\"height:400px;width:600px;overflow:scroll;\">";
	content+="</div></div>";
	title=title;
	width='600';
	height='440';
	showDialog1(title,content,width,height,ev);
}
function CariPopUpSearchItem(method){
	textsearch = document.getElementById('textsearch').value;
	
	param  = 'method='+method+'&textsearch='+textsearch;
	tujuan = 'log_slave_get_daftar_tutup_paksa_po.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('containeritem').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}
function SetNoTutupPaksaPO(No){
	notutuppaksa = document.getElementById('notutuppaksa_'+No).value;
	document.getElementById('notutuppaksa').value = notutuppaksa;
	closeDialog();
}