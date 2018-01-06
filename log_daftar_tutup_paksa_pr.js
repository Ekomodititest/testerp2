function DisplayList(){
	Method = 'LoadData';
	tanggaldibuatsrch = trim(document.getElementById('tanggaldibuatsrch').value);
	tanggalsdsrch = trim(document.getElementById('tanggalsdsrch').value);
	noprsrch = trim(document.getElementById('noprsrch').value);
	notutuppaksa = trim(document.getElementById('notutuppaksa').value);
	
	param ='method='+Method+'&tanggaldibuatsrch='+tanggaldibuatsrch+'&tanggalsdsrch='+tanggalsdsrch;
	param+= '&noprsrch='+noprsrch+'&notutuppaksa='+notutuppaksa;
	tujuan='log_slave_get_daftar_tutup_paksa_pr.php';
	
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

function CariNoPr(title,ev){
	content= "<div>";
	content+="<fieldset>No PR <input type=text id=noprpopup class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=CariNoPrGo()>Cari</button></fieldset>";
	content+="<div id=containerpopupsrch style=\"height:400px;width:600px;overflow:scroll;\">";
	content+="</div></div>";
	title=title;
	width='600';
	height='440';
	showDialog1('Cari No PR',content,width,height,ev);
}

function CariNoPrGo(){
	Method 	= 'CariNoPr';
	noprpopup = document.getElementById('noprpopup').value;
	
	param  = 'method='+Method+'&noprpopup='+noprpopup;
	tujuan = 'log_slave_get_daftar_tutup_paksa_pr.php';
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

function CariNoPrPick(nopr){
	NoPR = document.getElementById('list_'+nopr).value;
	document.getElementById('noprsrch').value = NoPR;
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
	tujuan = 'log_slave_get_daftar_tutup_paksa_pr.php';
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
	tujuan = 'log_slave_get_daftar_tutup_paksa_pr.php';
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
	tujuan='log_slave_get_daftar_tutup_paksa_pr.php';
	
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
	tujuan = 'log_slave_get_daftar_tutup_paksa_pr.php';
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
function SetNoTutupPaksaPR(No){
	notutuppaksa = document.getElementById('notutuppaksa_'+No).value;
	document.getElementById('notutuppaksa').value = notutuppaksa;
	closeDialog();
}