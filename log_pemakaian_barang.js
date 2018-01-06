// GET FUNCTION //
function GetGudang(){
	Method = 'GetGudang';
	Lokasi = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value;
	
	param ='method='+Method+'&lokasi='+Lokasi;
	tujuan='log_slave_get_pemakaian_barang.php';
	
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					document.getElementById('gudang').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}
}
function DisplayList(){
	Method = 'LoadData';
	lokasi = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value;
	gudang = document.getElementById('gudang').options[document.getElementById('gudang').selectedIndex].value;
	tanggalawal	 = trim(document.getElementById('tanggalawal').value);
	tanggalakhir = trim(document.getElementById('tanggalakhir').value);
	jenisitem = document.getElementById('jenisitem').options[document.getElementById('jenisitem').selectedIndex].value;
	nospb  = trim(document.getElementById('nospb').value);
	
	if(lokasi == '' || lokasi == null){
		alert('Lokasi harus diisi.');
		return
	}
	if(gudang == '' || gudang == null){
		alert('Gudang harus diisi.');
		return
	}
	if(tanggalawal == '' || tanggalawal == null){
		alert('Tanggal Awal harus diisi.');
		return
	}
	if(tanggalakhir == '' || tanggalakhir == null){
		alert('Tanggal Akhir harus diisi.');
		return
	}
	if(jenisitem == '' || jenisitem == null){
		alert('Jenis Item harus diisi.');
		return
	}
	
	param ='method='+Method+'&lokasi='+lokasi+'&gudang='+gudang+'&tanggalawal='+tanggalawal+'&tanggalakhir='+tanggalakhir;
	param+='&jenisitem='+jenisitem+'&nospb='+nospb;
	
	tujuan='log_slave_get_pemakaian_barang.php';
	
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					document.getElementById('ListContainer').innerHTML=con.responseText;
					document.getElementById('ViewListHeader').style.display='block';
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

